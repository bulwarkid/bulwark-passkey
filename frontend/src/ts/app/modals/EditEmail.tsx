import { EnvelopeIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Button, ButtonColor, ButtonSize } from "../../components/Buttons";
import { Input } from "../../components/Input";
import { CardModal, CardModalTitle } from "../../components/Modal";
import { updateEmail } from "../../data/supabase";

type EditEmailModalProps = {
    currentEmail: string;
    emailUpdated: () => void;
    onCancel: () => void;
};

type EditEmailModalState = {
    errorMessage?: string;
};

export class EditEmailModal extends React.Component<
    EditEmailModalProps,
    EditEmailModalState
> {
    private emailRef1_ = React.createRef<HTMLInputElement>();
    private emailRef2_ = React.createRef<HTMLInputElement>();
    constructor(props: EditEmailModalProps) {
        super(props);
        this.state = {};
    }
    render() {
        let errorMessage;
        if (this.state.errorMessage) {
            errorMessage = (
                <div className="text-red-500 text-center">
                    {this.state.errorMessage}
                </div>
            );
        }
        let buttons = (
            <div className="flex w-full justify-center px-4 py-4">
                <Button
                    text="Confirm Email"
                    onClick={this.onSubmit_}
                    icon={
                        <EnvelopeIcon
                            className="-ml-1 mr-3 h-5 w-5"
                            aria-hidden="true"
                        />
                    }
                />
            </div>
        );
        let content = (
            <div className="flex flex-col w-full justify-center items-center px-4 py-5">
                <div className="w-full">
                    <Input
                        label="Current Email"
                        type="email"
                        defaultValue={this.props.currentEmail}
                        disabled
                    />
                </div>
                <div className="mt-4 w-full flex flex-col max-h-full min-h-0">
                    {errorMessage}
                    <div className="block text-sm font-medium text-gray-700 p-0 m-0">
                        New Email
                    </div>
                    <div className="mt-1 -space-y-px rounded-md shadow-sm bg-white">
                        <div>
                            <label htmlFor="new-email" className="sr-only">
                                New Email
                            </label>
                            <input
                                ref={this.emailRef1_}
                                type="text"
                                name="new-email"
                                id="new-email"
                                autoComplete="new-email"
                                className="relative block w-full rounded-none rounded-t-md border-gray-300 bg-transparent focus:z-10 focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="New Email"
                            />
                        </div>
                        <div>
                            <label htmlFor="new-email" className="sr-only">
                                Confirm Email
                            </label>
                            <input
                                ref={this.emailRef2_}
                                type="text"
                                name="new-email"
                                id="new-email"
                                autoComplete="new-email"
                                className="relative block w-full rounded-none rounded-b-md border-gray-300 bg-transparent focus:z-10 focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Confirm Email"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
        let title = (
            <CardModalTitle
                title="Change Email"
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
        return (
            <CardModal>
                {title}
                {content}
                {buttons}
            </CardModal>
        );
    }

    onSubmit_ = async () => {
        const email1 = this.emailRef1_.current?.value;
        const email2 = this.emailRef2_.current?.value;
        // TODO: Do more sophisticated email verfication
        if (email1 !== email2) {
            this.setState({ errorMessage: "Emails do not match" });
            return;
        }
        if (email1 === undefined || email1 === "") {
            this.setState({ errorMessage: "Invalid email format" });
            return;
        }
        const errorMessage = await updateEmail(email1!);
        if (errorMessage) {
            this.setState({ errorMessage });
        } else {
            this.props.emailUpdated();
        }
    };
}
