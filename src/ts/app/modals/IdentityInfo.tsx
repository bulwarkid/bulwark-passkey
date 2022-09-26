import React from "react";
import { FormDisplay, FormItem } from "../../components/FormDisplay";
import { TitleBar } from "../../components/TitleBar";
import { bytesToBase64 } from "../../core/util";
import { Identity } from "../../data/Identity";
import { XIcon } from "../../icons/x";
import { hideModal } from "../ModalContainer";

type IdentityInfoModalProps = {
    identity: Identity;
};

export class IdentityInfoModal extends React.Component<IdentityInfoModalProps> {
    render() {
        const id = this.props.identity;
        const publicKey = id.publicKey ? bytesToBase64(id.publicKey) : "";
        const hash = id.hash ? bytesToBase64(id.hash) : "";
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
                        <FormItem left="Website" right={id.website} />
                        <FormItem left="User Name" right={id.userName} />
                        <FormItem left="Public Key" right={publicKey} />
                        <FormItem left="Hash" right={hash} />
                        <FormItem
                            left="Signature Counter"
                            right={id.signatureCount?.toString()}
                        />
                    </FormDisplay>
                </div>
                <div className="daisy-btn daisy-btn-error mx-4">Delete</div>
            </div>
        );
    }

    onCancel_ = () => {
        hideModal();
    };
}
