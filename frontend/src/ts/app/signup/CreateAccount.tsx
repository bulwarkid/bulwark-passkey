import React, { FormEvent } from "react";
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
import { Input } from "../../components/Input";

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

type CreateAccountState = {
    errorMessage?: string;
};

export class CreateAccount extends React.Component<
    CreateAccountProps,
    CreateAccountState
> {
    private emailRef_ = React.createRef<HTMLInputElement>();
    private passwordRef1_ = React.createRef<HTMLInputElement>();
    private passwordRef2_ = React.createRef<HTMLInputElement>();
    state: CreateAccountState = {};
    render() {
        let errorMessage;
        if (this.state.errorMessage) {
            errorMessage = (
                <div className="text-red-500 font-bold text-center mb-4">
                    {this.state.errorMessage}
                </div>
            );
        }
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
                <Input
                    label="Email"
                    inputRef={this.emailRef_}
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                />
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Passphrase
                    </label>
                    <div className="-space-y-px rounded-md shadow-sm mt-1">
                        <Input
                            inputRef={this.passwordRef1_}
                            type="password"
                            autoComplete="password"
                            required
                            placeholder="Master Passphrase"
                            label="Master Passphrase"
                            srLabel={true}
                            className="appearance-none rounded-none rounded-t-md"
                        />
                        <Input
                            inputRef={this.passwordRef2_}
                            type="password"
                            autoComplete="password"
                            required
                            placeholder="Confirm Passphrase"
                            label="Confirm Passphrase"
                            srLabel={true}
                            className="appearance-none rounded-none rounded-b-md"
                        />
                    </div>
                </div>

                <div>
                    <Button
                        type="submit"
                        icon={
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockClosedIcon
                                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                    aria-hidden="true"
                                />
                            </span>
                        }
                        text="Sign Up"
                        className="group relative w-full justify-center"
                    />
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
                    {errorMessage}
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
        if (!email) {
            this.setState({ errorMessage: "No email provided." });
            return;
        }
        const passphrase1 = this.passwordRef1_.current?.value;
        const passphrase2 = this.passwordRef2_.current?.value;
        let errorMessage = validatePassphrases(passphrase1, passphrase2);
        if (errorMessage) {
            // TODO: Validate email locally
            this.setState({ errorMessage });
            return;
        }
        errorMessage = await signUp(email, passphrase1!);
        if (errorMessage) {
            this.setState({ errorMessage });
            return;
        }
        this.props.onCreated(ACCOUNT_VAULT_TYPE);
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
