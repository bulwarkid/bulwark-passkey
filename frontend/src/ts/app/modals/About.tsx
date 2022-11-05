import React from "react";
import { Modal } from "../../components/Modal";
import { TitleBar, TitleBarButton } from "../../components/TitleBar";

type AboutModalProps = {
    onCancel: () => void;
};

export class AboutModal extends React.Component<AboutModalProps> {
    render() {
        const title = (
            <TitleBar
                title="About"
                rightButton={
                    <TitleBarButton
                        onClick={this.props.onCancel}
                        text="Close"
                    />
                }
            />
        );
        return (
            <Modal title={title}>
                <div className="grow flex flex-col items-center justify-center">
                    <img src="/img/logo.png" width={150} />
                    <p className="font-bold text-2xl">Bulwark Passkey</p>
                    <p className="text-sm">
                        Made by BulwarkID, Inc. in Oakland
                    </p>
                    <p className="text-sm">Copyright 2022</p>
                    <a
                        className="underline text-sm"
                        href="mailto:corp@bulwark.id"
                    >
                        Contact Us
                    </a>
                </div>
            </Modal>
        );
    }
}
