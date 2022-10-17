import React from "react";
import { TitleBar, TitleBarButton } from "../../components/TitleBar";
import { getPassphrase, setPassphrase } from "../../data/identities";
import * as modal from "../ModalContainer";

export async function showUpdatePassphrase() {
    const oldPassphrase = await getPassphrase();
    modal.showModal(
        <PassphraseModal
            oldPassphrase={oldPassphrase}
            passphraseUpdated={(passphrase: string) => {
                setPassphrase(passphrase);
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

class PassphraseModal extends React.Component<
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
        const passphrase1 = this.passphraseRef1_.current?.value;
        const passphrase2 = this.passphraseRef2_.current?.value;
        if (passphrase1 === undefined || passphrase1 === "") {
            // Invalid passphrase
            this.setState({ errorMessage: "No new passphrase specified." });
            return;
        }
        if (passphrase1 !== passphrase2) {
            // Passphrases do not match
            this.setState({ errorMessage: "Passphrases do not match." });
            return;
        }
        if (passphrase1 === this.props.oldPassphrase) {
            // Passphrase did not change
            this.setState({
                errorMessage:
                    "Passphrase cannot be the same as the old passphrase.",
            });
            return;
        }
        if (passphrase1!.length < 8) {
            // Passphrase is not long enough
            this.setState({
                errorMessage: "Passphrase must be at least 8 characters long.",
            });
            return;
        }
        this.setState({ errorMessage: undefined });
        if (this.props.passphraseUpdated) {
            this.props.passphraseUpdated(passphrase1!);
        }
    };

    onCancel_ = () => {
        modal.hideModal();
    };
}
