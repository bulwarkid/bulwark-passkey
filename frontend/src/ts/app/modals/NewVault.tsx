import React, { FormEvent } from "react";
import { VerticalInputGroup, Input } from "../../components/Input";
import { TitleBar, TitleBarButton } from "../../components/TitleBar";
import { setPassphrase, validatePassphrases } from "../../data/passphrase";
import { hideModal, showModal } from "../ModalStack";

export async function createLocalVault(): Promise<boolean> {
    return new Promise((resolve) => {
        showModal(
            <NewVaultModal
                onSubmit={(passphrase: string) => {
                    setPassphrase(passphrase);
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
                <TitleBarButton text="Cancel" onClick={this.props.onCancel} />
            );
        }
        return (
            <div className="w-screen h-screen flex flex-col">
                <TitleBar title="New Vault" leftButton={cancelButton} />
                <form
                    onSubmit={this.onSubmit_}
                    className="flex flex-col justify-center items-center grow mx-8"
                >
                    {errorMessageDiv}
                    <VerticalInputGroup>
                        <Input
                            inputRef={this.inputRef1_}
                            type="password"
                            placeholder="New Passphrase"
                        />
                        <Input
                            inputRef={this.inputRef2_}
                            type="password"
                            placeholder="Confirm Passprhase"
                        />
                    </VerticalInputGroup>
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
