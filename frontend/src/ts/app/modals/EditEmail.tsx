import React, { FormEvent } from "react";
import { Input, InputLabel, VerticalInputGroup } from "../../components/Input";
import { Modal } from "../../components/Modal";
import { TitleBar, TitleBarButton } from "../../components/TitleBar";
import { hideModal } from "../ModalStack";

type EditEmailModalProps = {
    currentEmail: string;
    emailUpdated: (email: string) => void;
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
        const title = (
            <TitleBar
                title="Update Email"
                leftButton={
                    <TitleBarButton
                        text="Cancel"
                        onClick={this.props.onCancel}
                    />
                }
                rightButton={
                    <TitleBarButton text="Save" onClick={this.onSubmit_} />
                }
            />
        );
        let errorMessage;
        if (this.state.errorMessage) {
            errorMessage = (
                <div className="text-red-500 text-center">
                    {this.state.errorMessage}
                </div>
            );
        }
        return (
            <Modal title={title}>
                <div className="daisy-form-control">
                    <InputLabel>Current Email</InputLabel>
                    <Input
                        type="email"
                        value={this.props.currentEmail}
                        disabled
                    />
                </div>
                {errorMessage}
                <div className="daisy-form-control">
                    <InputLabel>New Email</InputLabel>
                    <VerticalInputGroup>
                        <Input
                            inputRef={this.emailRef1_}
                            type="email"
                            placeholder="New Email"
                        />
                        <Input
                            inputRef={this.emailRef2_}
                            type="email"
                            placeholder="Confirm Email"
                        />
                    </VerticalInputGroup>
                </div>
            </Modal>
        );
    }

    onSubmit_ = () => {
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
        this.props.emailUpdated(email1!);
    };
}
