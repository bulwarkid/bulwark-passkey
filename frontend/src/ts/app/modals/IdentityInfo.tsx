import React from "react";
import { FormDisplay, FormData } from "../../components/FormDisplay";
import { TitleBar } from "../../components/TitleBar";
import { bytesToBase64, classNames } from "../../core/util";
import { Identity } from "../../../proto/data";
import { XIcon } from "../../icons/x";
import { hideModal } from "../ModalStack";
import * as identities from "../../data/identities";
import { CardModal, CardModalTitle, Modal } from "../../components/Modal";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { Button, ButtonColor, ButtonSize } from "../../components/Buttons";

type IdentityInfoModalProps = {
    identity: Identity;
};

export class IdentityInfoModal extends React.Component<IdentityInfoModalProps> {
    render() {
        const id = this.props.identity;
        const publicKey = id.publicKey ? bytesToBase64(id.publicKey) : "";
        const hash = id.id ? bytesToBase64(id.id) : "";
        let content = (
            <div className="flex flex-col w-full justify-center items-center">
                <dl className="w-full">
                    <DescriptionListItem label="ID" value={hash} dark={true} />
                    <DescriptionListItem
                        label="Website"
                        value={id.website?.name}
                    />
                    <DescriptionListItem
                        label="User Name"
                        value={id.user?.displayName}
                        dark={true}
                    />
                    <DescriptionListItem label="Public Key" value={publicKey} />
                    <DescriptionListItem
                        label="Signature Counter"
                        value={id.signatureCounter?.toString()}
                        dark={true}
                    />
                </dl>
            </div>
        );
        let title = (
            <CardModalTitle
                title="Info"
                button={
                    <Button
                        text="Close"
                        onClick={this.onCancel_}
                        size={ButtonSize.SM}
                        color={ButtonColor.CLEAR}
                    />
                }
            />
        );
        let buttons = (
            <div className="flex w-full justify-end px-4 py-4 sm:px-6">
                <Button
                    text="Delete"
                    onClick={this.delete_}
                    color={ButtonColor.ERROR}
                />
            </div>
        );
        return (
            <CardModal>
                {title}
                {content}
                {buttons}
            </CardModal>
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

class DescriptionListItem extends React.Component<{
    label?: string;
    value?: string;
    dark?: boolean;
}> {
    render() {
        return (
            <div
                className={classNames("px-4 py-3 grid grid-cols-3 gap-4", {
                    "bg-gray-50": !!this.props.dark,
                    "bg-white": !this.props.dark,
                })}
            >
                <dt className="text-sm font-medium text-gray-500">
                    {this.props.label}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 col-span-2 mt-0 text-ellipsis overflow-hidden">
                    {this.props.value}
                </dd>
            </div>
        );
    }
}
