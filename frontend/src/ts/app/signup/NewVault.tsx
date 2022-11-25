import { LockClosedIcon } from "@heroicons/react/20/solid";
import React, { FormEvent } from "react";
import { Button, ButtonColor, ButtonSize } from "../../components/Buttons";
import { Input } from "../../components/Input";
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

        const infoForm = (
            <form className="space-y-2" onSubmit={this.onSubmit_}>
                {errorMessageDiv}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Passphrase
                    </label>
                    <div className="-space-y-px rounded-md shadow-sm mt-1">
                        <Input
                            label="Master Passphrase"
                            srLabel={true}
                            type="password"
                            autoComplete="password"
                            required
                            placeholder="Master Passphrase"
                            className="appearance-none rounded-none rounded-t-md"
                        />
                        <Input
                            label="Confirm Passphrase"
                            srLabel={true}
                            type="password"
                            autoComplete="password"
                            required
                            placeholder="Confirm Passphrase"
                            className="appearance-none rounded-none rounded-b-md"
                        />
                    </div>
                </div>

                <div>
                    <Button
                        type="submit"
                        text="Create Local Vault"
                        className="group relative w-full justify-center"
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
        );
        const createVault = (
            <div className="grow flex items-center justify-center py-6 px-4">
                <div className="w-full space-y-4">
                    <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-gray-900">
                        Create New Local Vault
                    </h2>
                    {infoForm}
                </div>
            </div>
        );
        let cancelButton;
        if (this.props.onCancel) {
            cancelButton = (
                <div className="flex flex-col items-center mb-4">
                    <Button
                        text="Cancel"
                        onClick={this.props.onCancel}
                        size={ButtonSize.SM}
                        color={ButtonColor.CLEAR}
                    />
                </div>
            );
        }
        return (
            <div className="min-h-full flex flex-col justify-center bg-gray-200">
                {createVault}
                {cancelButton}
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
