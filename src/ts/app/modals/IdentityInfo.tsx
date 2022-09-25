import React from "react";
import { TitleBar, TitleBarButton } from "../../components/TitleBar";
import { hideModal } from "../ModalContainer";

export class IdentityInfoModal extends React.Component {
    render() {
        return (
            <div>
                <TitleBar
                    title="Identity"
                    leftButton={
                        <TitleBarButton
                            text="Cancel"
                            onClick={this.onCancel_}
                        />
                    }
                />
                <div className="daisy-rounded-box">
                    <li>Website</li>
                    <li>User Name</li>
                    <li>Public Key</li>
                    <li>Identity Hash</li>
                    <li>Signature Counter</li>
                    <li>Delete?</li>
                </div>
            </div>
        );
    }

    onCancel_ = () => {
        hideModal();
    };
}
