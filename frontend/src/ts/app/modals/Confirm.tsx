import React from "react";
import { Modal } from "../../components/Modal";
import { TitleBar } from "../../components/TitleBar";
import { Center } from "../../components/Util";
import { hideModal, showModal } from "../ModalStack";

export async function promptUser(
    prompt: string,
    title?: string
): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        showModal(
            <ConfirmModal
                title={title || "Confirm"}
                prompt={prompt}
                onResponse={(approved) => {
                    hideModal();
                    resolve(approved);
                }}
            />
        );
    });
}

type ConfirmModalProps = {
    title: string;
    prompt: string;
    onResponse: (approved: boolean) => void;
};

export class ConfirmModal extends React.Component<ConfirmModalProps> {
    render() {
        return (
            <Modal title={<TitleBar title={this.props.title} />} center={true}>
                <div className="p-4 bg-gray-400 rounded-lg font-bold">
                    {this.props.prompt}
                </div>
                <div className="mt-4 flex">
                    <div
                        className="daisy-btn daisy-btn-success grow basis-0 mx-2"
                        onClick={() => {
                            this.props.onResponse(true);
                        }}
                    >
                        Yes
                    </div>
                    <div
                        className="daisy-btn daisy-btn-error grow basis-0 mx-2"
                        onClick={() => {
                            this.props.onResponse(false);
                        }}
                    >
                        No
                    </div>
                </div>
            </Modal>
        );
    }
}
