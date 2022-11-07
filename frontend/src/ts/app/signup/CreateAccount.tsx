import React, { FormEvent } from "react";
import { Input, InputLabel, VerticalInputGroup } from "../../components/Input";
import { TitleBar } from "../../components/TitleBar";
import { signUp } from "../../data/supabase";
import {
    ACCOUNT_VAULT_TYPE,
    LOCAL_VAULT_TYPE,
    validatePassphrases,
} from "../../data/passphrase";
import { createLocalVault } from "./NewVault";
import { hideModal, showModal } from "../ModalStack";
import { logInToRemote } from "./LogIn";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Button, ButtonColor, ButtonSize } from "../../components/Buttons";

export async function createNewVault(): Promise<[string, boolean]> {
    return new Promise((resolve) => {
        showModal(
            <CreateAccount
                onCreated={(type: string) => {
                    hideModal();
                    resolve([type, false]);
                }}
                onLogIn={() => {
                    hideModal();
                    resolve(["", true]);
                }}
            />
        );
    });
}

type CreateAccountProps = {
    onCreated: (type: string) => void;
    onLogIn: () => void;
};

export class CreateAccount extends React.Component<CreateAccountProps> {
    private emailRef_ = React.createRef<HTMLInputElement>();
    private passwordRef1_ = React.createRef<HTMLInputElement>();
    private passwordRef2_ = React.createRef<HTMLInputElement>();
    render() {
        const bottomButtons = (
            <div className="flex flex-col items-center mb-4 space-y-1">
                <Button
                    text="Log in"
                    onClick={this.onLogin_}
                    size={ButtonSize.SM}
                    color={ButtonColor.CLEAR}
                />
                <Button
                    text="Use Local-Only Vault"
                    onClick={this.onUseLocal_}
                    size={ButtonSize.SM}
                    color={ButtonColor.CLEAR}
                />
            </div>
        );
        const infoForm = (
            <form className="space-y-2" onSubmit={this.onSubmit_}>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <div className="mt-1">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Passphrase
                    </label>
                    <div className="-space-y-px rounded-md shadow-sm mt-1">
                        <div>
                            <label htmlFor="new-passphrase" className="sr-only">
                                Master Passphrase
                            </label>
                            <input
                                ref={this.passwordRef1_}
                                id="new-passphrase"
                                name="new-passphrase"
                                type="password"
                                autoComplete="password"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Master Passphrase"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="confirm-passphrase"
                                className="sr-only"
                            >
                                Confirm Passphrase
                            </label>
                            <input
                                ref={this.passwordRef2_}
                                id="confirm-passphrase"
                                name="confirm-passphrase"
                                type="password"
                                autoComplete="password"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Confirm Passphrase"
                            />
                        </div>
                    </div>
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
                        Sign Up
                    </button>
                </div>
            </form>
        );
        const signUp = (
            <div className="grow flex min-h-full items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-4">
                    <div>
                        <img
                            className="mx-auto h-24 w-auto"
                            src="/img/logo.png"
                            alt="Bulwark Passkey"
                        />
                        <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-gray-900">
                            Sign up for Bulwark Passkey
                        </h2>
                    </div>
                    {infoForm}
                </div>
            </div>
        );
        return (
            <div className="flex flex-col bg-gray-200 min-h-full">
                {signUp}
                {bottomButtons}
            </div>
        );
    }

    onSubmit_ = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = this.emailRef_.current?.value;
        const passphrase1 = this.passwordRef1_.current?.value;
        const passphrase2 = this.passwordRef2_.current?.value;
        const errorMessage = validatePassphrases(passphrase1, passphrase2);
        if (errorMessage || !email) {
            // TODO: Handle error message
            // TODO: Validate email locally
            return;
        }
        if (await signUp(email, passphrase1!)) {
            this.props.onCreated(ACCOUNT_VAULT_TYPE);
        }
    };

    onLogin_ = async () => {
        if (await logInToRemote()) {
            this.props.onLogIn();
        }
    };

    onUseLocal_ = async () => {
        if (await createLocalVault()) {
            this.props.onCreated(LOCAL_VAULT_TYPE);
        }
    };
}
