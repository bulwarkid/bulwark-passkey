import React from "react";
import { FormDisplay, FormItem } from "../../components/FormDisplay";
import { TitleBar, TitleBarButton } from "../../components/TitleBar";
import { XIcon } from "../../icons/x";
import { hideModal } from "../ModalContainer";

export class IdentityInfoModal extends React.Component {
    render() {
        return (
            <div className="flex flex-col">
                <TitleBar
                    title="Identity"
                    leftButton={
                        <div
                            className="daisy-btn daisy-btn-ghost daisy-btn-square daisy-btn-sm m-2"
                            onClick={this.onCancel_}
                        >
                            <XIcon />
                        </div>
                    }
                />

                <div className="m-4">
                    <FormDisplay>
                        <FormItem left="Website" right="apple.com" />
                        <FormItem left="User Name" right="Chris" />
                        <FormItem left="Public Key" right="abcd1234" />
                        <FormItem left="Hash" right="e4f2a3" />
                        <FormItem left="Signature Counter" right="13" />
                    </FormDisplay>
                </div>

                {/* <div className="rounded-lg bg-gray-300 m-4">
                    <div className="border-b border-gray-400 p-3">Website</div>
                    <div className="border-b border-gray-400 p-3">
                        User Name
                    </div>
                    <div className="border-b border-gray-400 p-3">
                        Public Key
                    </div>
                    <div className="border-b border-gray-400 p-3">Hash</div>
                    <div className="p-3">Signature Counter</div>
                </div> */}
                <div className="daisy-btn daisy-btn-error mx-4">Delete</div>
            </div>
        );
    }

    onCancel_ = () => {
        hideModal();
    };
}
