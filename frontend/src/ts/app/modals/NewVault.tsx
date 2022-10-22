import React, { FormEvent } from "react";
import { TitleBar } from "../../components/TitleBar";
import { validatePassphrases } from "../../data/identities";
import { LogDebug } from "../../wailsjs/runtime/runtime";
import { hideModal, showModal } from "../ModalStack";

export async function requestNewPassphrase(): Promise<string> {
    return new Promise((resolve) => {
        showModal(
            <NewVaultModal
                onSubmit={(passphrase: string) => {
                    hideModal();
                    resolve(passphrase);
                }}
            />
        );
    });
}

type NewVaultModalProps = {
    onCancel?: () => void;
    onSubmit: (passphrase: string) => void;
};

type NewVaultModalState = {
    errorMessage?: string;
};

export class NewVaultModal extends React.Component<
    NewVaultModalProps,
    NewVaultModalState
> {
    private inputRef1_ = React.createRef<HTMLInputElement>();
    private inputRef2_ = React.createRef<HTMLInputElement>();

    constructor(props: NewVaultModalProps) {
        super(props);
        this.state = {};
    }

    render() {
        let errorMessageDiv;
        if (this.state.errorMessage) {
            errorMessageDiv = (
                <div className="text-red-500 font-bold text-center mb-4">
                    {this.state.errorMessage}
                </div>
            );
        }
        let cancelButton;
        if (this.props.onCancel) {
            cancelButton = (
                <div
                    className="daisy-btn daisy-btn-sm daisy-btn-ghost"
                    onClick={this.props.onCancel}
                >
                    Cancel
                </div>
            );
        }
        return (
            <div className="w-screen h-screen flex flex-col">
                <TitleBar title="New Vault" leftButton={cancelButton} />
                <form
                    onSubmit={this.onSubmit_}
                    className="flex flex-col justify-center items-center grow"
                >
                    {errorMessageDiv}
                    <div className="daisy-input-group daisy-input-group-vertical flex justify-center items-center">
                        <input
                            ref={this.inputRef1_}
                            type="password"
                            placeholder="New Passphrase"
                            className="daisy-input daisy-input-bordered w-full max-w-xs"
                        />
                        <input
                            ref={this.inputRef2_}
                            type="password"
                            placeholder="Confirm Passphrase"
                            className="daisy-input daisy-input-bordered w-full max-w-xs"
                        />
                    </div>
                    <input
                        type="submit"
                        value="Create New Vault"
                        className="daisy-btn mt-2"
                    />
                </form>
            </div>
        );
    }

    onSubmit_ = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const passphrase1 = this.inputRef1_.current?.value;
        const passphrase2 = this.inputRef2_.current?.value;
        const errorMessage = validatePassphrases(
            passphrase1,
            passphrase2,
            undefined
        );
        this.setState({ errorMessage });
        if (!errorMessage) {
            this.props.onSubmit(passphrase1!);
        }
    };
}
