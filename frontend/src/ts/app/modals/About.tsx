import React from "react";
import { Button, ButtonColor, ButtonSize } from "../../components/Buttons";
import { CardModal, CardModalTitle, Modal } from "../../components/Modal";
import { TitleBar, TitleBarButton } from "../../components/TitleBar";

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
                <p className="text-sm">
                    Made by BulwarkID, Inc. in Oakland, CA
                </p>
                <p className="text-sm">Copyright 2022</p>
                <a className="underline text-sm" href="mailto:corp@bulwark.id">
                    Contact Us
                </a>
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
