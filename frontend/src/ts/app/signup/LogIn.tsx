import React, { FormEvent } from "react";
import { hideModal, showModal } from "../ModalStack";
import * as supabase from "../../data/supabase";
import { promptUser } from "../modals/Confirm";
import { ACCOUNT_VAULT_TYPE, LOCAL_VAULT_TYPE } from "../../data/passphrase";
import { unlockLocalVault } from "./Unlock";
import { LogError } from "../../wailsjs/runtime/runtime";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Button, ButtonColor, ButtonSize } from "../../components/Buttons";

export async function logInToExistingVault(
    vaultType: string,
    vaultData: string,
    email: string
): Promise<boolean> {
    if (vaultType === LOCAL_VAULT_TYPE) {
        return await unlockLocalVault(vaultData);
    } else if (vaultType === ACCOUNT_VAULT_TYPE) {
        return new Promise<boolean>((resolve) => {
            showModal(
                <LogInModal
                    email={email}
                    onLoggedIn={() => {
                        hideModal();
                        resolve(false);
                    }}
                    onLogOut={() => {
                        hideModal();
                        resolve(true);
                    }}
                />
            );
        });
    } else {
        LogError(
            "Invalid vault type: '" +
                vaultType +
                "'" +
                (ACCOUNT_VAULT_TYPE === vaultType) +
                vaultType.localeCompare(ACCOUNT_VAULT_TYPE)
        );
        return false;
    }
}

export async function logInToRemote(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        showModal(
            <LogInModal
                onLoggedIn={() => {
                    hideModal();
                    resolve(true);
                }}
                onCancel={() => {
                    hideModal();
                    resolve(false);
                }}
            />
        );
    });
}

type LogInModalProps = {
    email?: string;
    onLoggedIn: () => void;
    onLogOut?: () => void;
    onCancel?: () => void;
};

type LogInModalState = {
    errorMessage?: string;
};

class LogInModal extends React.Component<LogInModalProps, LogInModalState> {
    private emailRef_ = React.createRef<HTMLInputElement>();
    private passphraseRef_ = React.createRef<HTMLInputElement>();
    constructor(props: LogInModalProps) {
        super(props);
        this.state = {};
    }
    render() {
        let errorMessage;
        if (this.state.errorMessage) {
            errorMessage = (
                <div className="text-red-500 font-bold text-center mb-4">
                    {this.state.errorMessage}
                </div>
            );
        }
        let logOutButton;
        if (this.props.onLogOut) {
            logOutButton = (
                <div className="flex flex-col items-center mb-4">
                    <Button
                        text="Log Out"
                        onClick={this.onLogOut_}
                        color={ButtonColor.CLEAR}
                        size={ButtonSize.SM}
                    />
                </div>
            );
        }
        if (this.props.onCancel) {
            logOutButton = (
                <div className="flex flex-col items-center mb-4">
                    <Button
                        text="Cancel"
                        onClick={this.props.onCancel}
                        color={ButtonColor.CLEAR}
                        size={ButtonSize.SM}
                    />
                </div>
            );
        }
        const emailInput = (
            <div>
                <label htmlFor="email-address" className="sr-only">
                    Email address
                </label>
                <input
                    ref={this.emailRef_}
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-600"
                    placeholder="Email address"
                    disabled={!!this.props.email}
                    value={this.props.email}
                />
            </div>
        );
        const passphraseInput = (
            <div>
                <label htmlFor="password" className="sr-only">
                    Master Passphrase
                </label>
                <input
                    ref={this.passphraseRef_}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Master Passphrase"
                />
            </div>
        );
        return (
            <div className="flex flex-col bg-gray-200 min-h-full">
                <div className="grow flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <img
                                className="mx-auto h-24 w-auto"
                                src="/img/logo.png"
                                alt="Bulwark Passkey"
                            />
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                Log in to your account
                            </h2>
                        </div>
                        {errorMessage}
                        <form
                            className="mt-8 space-y-6"
                            onSubmit={this.onSubmit_}
                        >
                            <div className="-space-y-px rounded-md shadow-sm">
                                {emailInput}
                                {passphraseInput}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <LockClosedIcon
                                            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                    Log In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {logOutButton}
            </div>
        );
    }

    onSubmit_ = async (event: FormEvent) => {
        event.preventDefault();
        const email = this.emailRef_.current?.value;
        const passphrase = this.passphraseRef_.current?.value;
        if (!email || !passphrase) {
            // TODO: Better Validation
            this.setState({ errorMessage: "Invalid email/passphrase" });
            return;
        }
        const errorMessage = await supabase.signIn(email, passphrase);
        if (errorMessage) {
            this.setState({ errorMessage });
        } else {
            this.props.onLoggedIn();
        }
    };

    onLogOut_ = async () => {
        if (await promptUser("Log out and delete local cache?", "Log Out")) {
            this.props.onLogOut!();
        }
    };
}
