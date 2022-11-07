import React, { FormEvent } from "react";
import { Modal } from "../../components/Modal";
import { TitleBar } from "../../components/TitleBar";
import { callRPC } from "../../core/rpc";
import { setPassphrase } from "../../data/passphrase";
import { hideModal, showModal } from "../ModalStack";
import { promptUser } from "../modals/Confirm";

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
        const title = <TitleBar title="Unlock Vault" />;
        return (
            <Modal title={title}>
                <form
                    className="grow flex flex-col items-center justify-center"
                    onSubmit={this.onSubmit_}
                >
                    {errorMessageDiv}
                    <input
                        ref={this.inputRef_}
                        type="password"
                        placeholder="Passphrase"
                        className="daisy-input daisy-input-bordered w-full max-w-xs mx-4"
                    />
                    <input
                        type="submit"
                        value="Unlock"
                        className="daisy-btn mt-2"
                    />
                </form>
                <div className="flex flex-col items-center mb-4">
                    <div
                        className="daisy-btn daisy-btn-ghost daisy-btn-sm"
                        onClick={this.onDeleteVault_}
                    >
                        Delete Vault
                    </div>
                </div>
            </Modal>
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
        if (await promptUser("Delete local vault data?")) {
            this.props.onDeleteVault();
        }
    };
}
