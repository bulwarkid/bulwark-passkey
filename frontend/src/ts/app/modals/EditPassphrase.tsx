import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Button, ButtonColor, ButtonSize } from "../../components/Buttons";
import { CardModal, CardModalTitle, Modal } from "../../components/Modal";
import { validatePassphrases } from "../../data/passphrase";

type PassphraseModalProps = {
    oldPassphrase: string;
    passphraseUpdated?: (passphrase: string) => void;
    onCancel: () => void;
};

type PassphraseModalState = {
    showPassphrase: boolean;
    errorMessage?: string;
};

export class EditPassphraseModal extends React.Component<
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
        let title = (
            <CardModalTitle
                title="Edit Passphrase"
                button={
                    <Button
                        text="Cancel"
                        onClick={this.props.onCancel}
                        size={ButtonSize.SM}
                        color={ButtonColor.CLEAR}
                    />
                }
            />
        );

        let content = (
            <div className="flex flex-col w-full justify-center items-center px-4 py-5 sm:p-6">
                <div className="w-full">
                    <label
                        htmlFor="passphrase"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Current Passphrase
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            type={
                                this.state.showPassphrase ? "text" : "password"
                            }
                            name="passphrase"
                            id="passphrase"
                            defaultValue={this.props.oldPassphrase}
                            disabled
                            className="block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
                            placeholder={this.props.oldPassphrase}
                        />
                        <button
                            type="button"
                            className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onClick={this.toggleShowPassphrase_}
                        >
                            {this.state.showPassphrase ? (
                                <LockOpenIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            ) : (
                                <LockClosedIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            )}
                            <span>
                                {this.state.showPassphrase ? "Hide" : "Show"}
                            </span>
                        </button>
                    </div>
                </div>
                {errorMessageDiv}
                <div className="mt-4 w-full">
                    <div className="block text-sm font-medium text-gray-700">
                        New Passphrase
                    </div>
                    <div className="mt-1 -space-y-px rounded-md shadow-sm bg-white">
                        <div>
                            <label htmlFor="new-passphrase" className="sr-only">
                                New Passphrase
                            </label>
                            <input
                                ref={this.passphraseRef1_}
                                type="password"
                                name="new-passphrase"
                                id="new-passphrase"
                                autoComplete="new-passphrase"
                                className="relative block w-full rounded-none rounded-t-md border-gray-300 bg-transparent focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="New Passphrase"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="confirm-passphrase"
                                className="sr-only"
                            >
                                Confirm Passphrase
                            </label>
                            <input
                                ref={this.passphraseRef2_}
                                type="password"
                                name="confirm-passphrase"
                                id="confirm-passphrase"
                                autoComplete="confirm-passphrase"
                                className="relative block w-full rounded-none rounded-b-md border-gray-300 bg-transparent focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Confirm Passphrase"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
        let buttons = (
            <div className="flex w-full justify-center px-4 py-4 sm:px-6">
                <Button text="Update" onClick={this.onSubmit_} />
            </div>
        );
        return (
            <CardModal>
                {title}
                {content}
                {buttons}
            </CardModal>
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
        }
    };
}
