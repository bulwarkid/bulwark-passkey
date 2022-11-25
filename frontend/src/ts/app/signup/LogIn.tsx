import React, { FormEvent } from "react";
import { hideModal, showModal } from "../ModalStack";
import * as supabase from "../../data/supabase";
import { promptUser } from "../modals/Confirm";
import { ACCOUNT_VAULT_TYPE, LOCAL_VAULT_TYPE } from "../../data/passphrase";
import { unlockLocalVault } from "./Unlock";
import { LogError } from "../../wailsjs/runtime/runtime";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Button, ButtonColor, ButtonSize } from "../../components/Buttons";
import { Input } from "../../components/Input";

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
            <Input
                label="Email Address"
                srLabel={true}
                inputRef={this.emailRef_}
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none rounded-t-md"
                placeholder="Email address"
                disabled={!!this.props.email}
                value={this.props.email}
            />
        );
        const passphraseInput = (
            <Input
                inputRef={this.passphraseRef_}
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none rounded-b-md"
                placeholder="Master Passphrase"
                label="Master Passphrase"
                srLabel={true}
            />
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
                                <Button
                                    className="group relative w-full justify-center"
                                    text="Log In"
                                    type="submit"
                                    icon={
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <LockClosedIcon
                                                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    }
                                />
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
