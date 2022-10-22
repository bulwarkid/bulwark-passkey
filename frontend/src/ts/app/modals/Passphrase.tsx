import React from "react";
import { TitleBar, TitleBarButton } from "../../components/TitleBar";
import {
    getPassphrase,
    changePassphrase,
    validatePassphrases,
} from "../../data/identities";
import * as modal from "../ModalStack";

export async function showUpdatePassphrase() {
    const oldPassphrase = await getPassphrase();
    modal.showModal(
        <EditPassphraseModal
            oldPassphrase={oldPassphrase}
            passphraseUpdated={(passphrase: string) => {
                changePassphrase(passphrase);
            }}
        />
    );
}

type PassphraseModalProps = {
    oldPassphrase: string;
    passphraseUpdated?: (passphrase: string) => void;
};

type PassphraseModalState = {
    showPassphrase: boolean;
    errorMessage?: string;
};

class EditPassphraseModal extends React.Component<
    PassphraseModalProps,
    PassphraseModalState
> {
    private passphraseRef1_ = React.createRef<HTMLInputElement>();
    private passphraseRef2_ = React.createRef<HTMLInputElement>();
    constructor(props: PassphraseModalProps) {
        super(props);
        this.state = {
            showPassphrase: false,
        };
    }
    render() {
        let errorMessageDiv;
        if (this.state.errorMessage) {
            errorMessageDiv = (
                <div className="text-red-500 text-center">
                    {this.state.errorMessage}
                </div>
            );
        }
        return (
            <div>
                <TitleBar
                    title="Passphrase"
                    leftButton={
                        <TitleBarButton
                            text="Cancel"
                            onClick={this.onCancel_}
                        />
                    }
                    rightButton={
                        <TitleBarButton text="Save" onClick={this.onSubmit_} />
                    }
                />
                <div className="mt-8 w-full px-4 flex flex-col">
                    {errorMessageDiv}
                    <div className="daisy-form-control">
                        <label className="daisy-label">
                            <span className="daisy-label-text">
                                Current Passphrase
                            </span>
                        </label>
                        <div className="daisy-input-group">
                            <input
                                type={
                                    this.state.showPassphrase
                                        ? "text"
                                        : "password"
                                }
                                className="daisy-input daisy-input-bordered daisy-input-md w-full"
                                value={this.props.oldPassphrase}
                                disabled
                            ></input>
                            <div
                                className="daisy-btn"
                                onClick={this.toggleShowPassphrase_}
                            >
                                {this.state.showPassphrase ? "Hide" : "Show"}
                            </div>
                        </div>
                    </div>
                    <div className="daisy-form-control">
                        <label className="daisy-label">
                            <span className="daisy-label-text">
                                New Passphrase
                            </span>
                        </label>
                        <div className="daisy-input-group daisy-input-group-vertical">
                            <input
                                ref={this.passphraseRef1_}
                                type="password"
                                placeholder="New Passphrase"
                                className="daisy-input daisy-input-bordered daisy-input-md"
                            ></input>
                            <input
                                ref={this.passphraseRef2_}
                                type="password"
                                placeholder="Confirm Passphrase"
                                className="daisy-input daisy-input-bordered daisy-input-md"
                            ></input>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    toggleShowPassphrase_ = () => {
        this.setState({ showPassphrase: !this.state.showPassphrase });
    };

    onSubmit_ = () => {
        const errorMessage = validatePassphrases(
            this.passphraseRef1_.current?.value,
            this.passphraseRef2_.current?.value,
            this.props.oldPassphrase
        );
        this.setState({ errorMessage });
        if (!errorMessage && this.props.passphraseUpdated) {
            this.props.passphraseUpdated(this.passphraseRef1_.current!.value);
            modal.hideModal();
        }
    };

    onCancel_ = () => {
        modal.hideModal();
    };
}
