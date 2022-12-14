import React from "react";
import { Button, ButtonColor, ButtonSize } from "../../components/Buttons";
import { CardModal, CardModalTitle } from "../../components/Modal";

type AboutModalProps = {
    onCancel: () => void;
};

export class AboutModal extends React.Component<AboutModalProps> {
    render() {
        const title = (
            <CardModalTitle
                title="About"
                button={
                    <Button
                        text="Close"
                        onClick={this.props.onCancel}
                        color={ButtonColor.CLEAR}
                        size={ButtonSize.SM}
                    />
                }
            />
        );
        const content = (
            <div className="grow flex flex-col items-center justify-center p-4">
                <img src="/img/logo.png" width={100} />
                <p className="font-bold text-2xl">Bulwark Passkey</p>
                <p className="text-sm">Version 0.0.1</p>
                <p className="text-sm">
                    Made by BulwarkID, Inc. in Oakland, CA
                </p>
                <p className="text-sm">Copyright 2022</p>
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
