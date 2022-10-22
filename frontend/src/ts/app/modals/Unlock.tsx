import React from "react";
import { TitleBar } from "../../components/TitleBar";
import { callRPC } from "../../core/rpc";
import { LogDebug } from "../../wailsjs/runtime/runtime";
import { hideModal, showModal } from "../ModalStack";
import { NewVaultModal } from "./NewVault";

async function tryPassphrase(passphrase: string): Promise<boolean> {
    return await callRPC("tryPassphrase", passphrase);
}

export async function requestExistingPassphrase(): Promise<[string, string]> {
    return new Promise<[string, string]>((resolve) => {
        showModal(
            <UnlockModal
                onUnlock={(passphrase) => {
                    hideModal();
                    resolve([passphrase, ""]);
                }}
                onClearVault={(newPasphrase) => {
                    hideModal();
                    resolve(["", newPasphrase]);
                }}
            />
        );
    });
}

type UnlockModalProps = {
    onUnlock: (passphrase: string) => void;
    onClearVault: (newPassphrase: string) => void;
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

        return (
            <div className="w-screen h-screen flex flex-col">
                <TitleBar title="Unlock Vault" />
                <div className="grow flex flex-col items-center justify-center">
                    {errorMessageDiv}
                    <input
                        ref={this.inputRef_}
                        onKeyUp={this.onKeyUp_}
                        type="password"
                        placeholder="Passphrase"
                        className="daisy-input daisy-input-bordered w-full max-w-xs mx-4"
                    />
                    <div className="daisy-btn mt-2" onClick={this.onSubmit_}>
                        Unlock
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div onClick={this.onDeleteVault_} className="daisy-btn daisy-btn-ghost daisy-btn-sm my-4 text-base-400">Delete Existing Vault</div>
                </div>
            </div>
        );
    }

    onKeyUp_ = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            this.onSubmit_();
        }
    };

    onSubmit_ = async () => {
        const passphrase = this.inputRef_.current!.value;
        const success = await tryPassphrase(passphrase);
        if (!success) {
            this.setState({ error: true });
        } else {
            this.props.onUnlock(passphrase);
        }
    };

    onDeleteVault_ = () => {
        showModal(
            <NewVaultModal
                onSubmit={(passphrase: string) => {
                    hideModal();
                    this.props.onClearVault(passphrase);
                }}
                onCancel={() => {
                    hideModal();
                }}
            />
        );
    };
}
