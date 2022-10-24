import React from "react";
import { FormDisplay, FormData } from "../../components/FormDisplay";
import { TitleBar } from "../../components/TitleBar";
import { bytesToBase64 } from "../../core/util";
import { Identity } from "../../../proto/data";
import { XIcon } from "../../icons/x";
import { hideModal } from "../ModalStack";
import * as identities from "../../data/identities";

type IdentityInfoModalProps = {
    identity: Identity;
};

export class IdentityInfoModal extends React.Component<IdentityInfoModalProps> {
    render() {
        const id = this.props.identity;
        const publicKey = id.publicKey ? bytesToBase64(id.publicKey) : "";
        const hash = id.id ? bytesToBase64(id.id) : "";
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
                        <FormData label="ID" value={hash} />
                        <FormData label="Website" value={id.website?.name} />
                        <FormData
                            label="User Name"
                            value={id.user?.displayName}
                        />
                        <FormData label="Public Key" value={publicKey} />
                        <FormData
                            label="Signature Counter"
                            value={id.signatureCounter?.toString()}
                        />
                    </FormDisplay>
                </div>
                <div
                    className="daisy-btn daisy-btn-error mx-4"
                    onClick={this.delete_}
                >
                    Delete
                </div>
            </div>
        );
    }

    delete_ = async () => {
        const id = this.props.identity.id;
        if (id) {
            if (await identities.deleteIdentity(id)) {
                hideModal();
            }
        }
    };

    onCancel_ = () => {
        hideModal();
    };
}
