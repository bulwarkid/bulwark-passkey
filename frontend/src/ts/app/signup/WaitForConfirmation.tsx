import React from "react";
import { Button, ButtonColor, ButtonSize } from "../../components/Buttons";
import { CardModal, CardModalTitle } from "../../components/Modal";
import { TitleBar, TitleBarButton } from "../../components/TitleBar";

type WaitForConfirmationModalProps = {
    onCancel: () => void;
};

export class WaitForConfirmationModal extends React.Component<WaitForConfirmationModalProps> {
    render() {
        const title = (
            <CardModalTitle
                title="Waiting for Confirmation..."
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
        const content = (
            <div className="grow p-4 text-center">
                Please check your email for confirmation. This window will
                automatically close when confirmation is received.
            </div>
        );
        return (
            <CardModal>
                {title}
                {content}
            </CardModal>
        );
    }
}
