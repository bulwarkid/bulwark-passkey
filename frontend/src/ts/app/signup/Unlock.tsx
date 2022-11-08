import React, { FormEvent } from "react";
import { Modal } from "../../components/Modal";
import { TitleBar } from "../../components/TitleBar";
import { callRPC } from "../../core/rpc";
import { setPassphrase } from "../../data/passphrase";
import { hideModal, showModal } from "../ModalStack";
import { promptUser } from "../modals/Confirm";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Button, ButtonColor, ButtonSize } from "../../components/Buttons";

async function tryPassphrase(
    passphrase: string,
    vaultData: string
): Promise<boolean> {
    return await callRPC("tryPassphrase", passphrase, vaultData);
}

export async function unlockLocalVault(vaultData: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        showModal(
            <UnlockModal
                vaultData={vaultData}
                onUnlock={(passphrase: string) => {
                    setPassphrase(passphrase);
                    hideModal();
                    resolve(false);
                }}
                onDeleteVault={() => {
                    hideModal();
                    resolve(true);
                }}
            />
        );
    });
}

type UnlockModalProps = {
    vaultData: string;
    onUnlock: (passphrase: string) => void;
    onDeleteVault: () => void;
};

type UnlockModalState = {
    error?: boolean;
};

export class UnlockModal extends React.Component<
    UnlockModalProps,
    UnlockModalState
> {
    private inputRef_ = React.createRef<HTMLInputElement>();

    constructor(props: UnlockModalProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.inputRef_.current?.focus();
    }

    render() {
        let errorMessageDiv;
        if (this.state.error) {
            errorMessageDiv = (
                <div className="text-red-500 font-bold text-center mb-4">
                    Invalid Passphrase
                </div>
            );
        }

        const infoForm = (
            <form className="space-y-2" onSubmit={this.onSubmit_}>
                {errorMessageDiv}

                <div>
                    <label
                        htmlFor="passphrase"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Master Passphrase
                    </label>
                    <div className="mt-1">
                        <input
                            ref={this.inputRef_}
                            type="password"
                            name="passphrase"
                            id="passphrase"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Master Passphrase"
                        />
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
                        Unlock Vault
                    </button>
                </div>
            </form>
        );
        const unlock = (
            <div className="grow flex items-center justify-center py-6 px-4">
                <div className="w-full space-y-4">
                    <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-gray-900">
                        Unlock Local Vault
                    </h2>
                    {infoForm}
                </div>
            </div>
        );
        const deleteVault = (
            <div className="flex flex-col items-center mb-4">
                <Button
                    text="Delete Local Vault"
                    onClick={this.onDeleteVault_}
                    size={ButtonSize.SM}
                    color={ButtonColor.CLEAR}
                />
            </div>
        );
        return (
            <div className="min-h-full flex flex-col justify-center bg-gray-200">
                {unlock}
                {deleteVault}
            </div>
        );
    }

    onSubmit_ = async (event: FormEvent) => {
        event.preventDefault();
        const passphrase = this.inputRef_.current!.value;
        const success = await tryPassphrase(passphrase, this.props.vaultData);
        if (!success) {
            this.setState({ error: true });
        } else {
            this.props.onUnlock(passphrase);
        }
    };

    onDeleteVault_ = async () => {
        if (await promptUser("Delete local vault data forever?")) {
            this.props.onDeleteVault();
        }
    };
}
