import React from "react";
import { TitleBar } from "../../components/TitleBar";
import { callRPC } from "../../core/rpc";
import { hideModal, showModal } from "../ModalStack";
import { NewVaultModal } from "./NewVault";

async function tryPassphrase(passphrase: string): Promise<boolean> {
    return await callRPC("tryPassphrase", passphrase);
}

export async function unlockLocalVault() {
    return new Promise<void>((resolve) => {
        showModal(
            <UnlockModal
                onUnlock={() => {
                    hideModal();
                    resolve();
                }}
            />
        );
    });
}

type UnlockModalProps = {
    onUnlock: (passphrase: string) => void;
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
}
