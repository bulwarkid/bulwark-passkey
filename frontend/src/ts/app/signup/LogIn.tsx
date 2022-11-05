import React, { FormEvent } from "react";
import { Input, VerticalInputGroup } from "../../components/Input";
import { TitleBar, TitleBarButton } from "../../components/TitleBar";
import { hideModal, showModal } from "../ModalStack";
import * as supabase from "../../data/supabase";
import { promptUser } from "../modals/Confirm";
import { ACCOUNT_VAULT_TYPE, LOCAL_VAULT_TYPE } from "../../data/passphrase";
import { unlockLocalVault } from "../modals/Unlock";
import { LogError } from "../../wailsjs/runtime/runtime";

export async function logInToExistingVault(
    vaultType: string,
    vaultData: string
): Promise<boolean> {
    if (vaultType === LOCAL_VAULT_TYPE) {
        return await unlockLocalVault(vaultData);
    } else if (vaultType === ACCOUNT_VAULT_TYPE) {
        return new Promise<boolean>((resolve) => {
            showModal(
                <LogInModal
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
        let cancelButton;
        if (this.props.onCancel) {
            cancelButton = (
                <TitleBarButton text="Cancel" onClick={this.props.onCancel} />
            );
        }
        let logOutButton;
        if (this.props.onLogOut) {
            logOutButton = (
                <div className="flex flex-col items-center">
                    <div
                        className="daisy-btn daisy-btn-ghost daisy-btn-sm mb-4"
                        onClick={this.onLogOut_}
                    >
                        Log Out
                    </div>
                </div>
            );
        }
        return (
            <div className="w-screen h-screen flex flex-col bg-gray-200">
                <TitleBar title="Log In" leftButton={cancelButton} />
                <div className="grow flex flex-col m-8 justify-center items-center">
                    <form className="self-stretch" onSubmit={this.onSubmit_}>
                        <div className="mb-4 text-2xl font-bold text-center">
                            Log In
                        </div>
                        {errorMessage}
                        <VerticalInputGroup>
                            <Input
                                inputRef={this.emailRef_}
                                type="email"
                                placeholder="Email"
                            />
                            <Input
                                inputRef={this.passphraseRef_}
                                type="password"
                                placeholder="Master Passphrase"
                            />
                        </VerticalInputGroup>
                        <div className="flex flex-col items-center mt-4">
                            <input
                                type="submit"
                                value="Log In"
                                className="daisy-btn daisy-btn-wide"
                            />
                        </div>
                    </form>
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
