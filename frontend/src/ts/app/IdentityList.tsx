import React from "react";
import { Identity } from "../../proto/data";
import * as identities from "../data/identities";
import { InfoIcon } from "../icons/info";
import { showModal } from "./ModalStack";
import { IdentityInfoModal } from "./modals/IdentityInfo";
import {
    EllipsisHorizontalCircleIcon,
    EllipsisHorizontalIcon,
    EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import { Button, ButtonColor, ButtonSize } from "../components/Buttons";

type ListItemProps = {
    identity: Identity;
};

class ListItem extends React.Component<ListItemProps> {
    render() {
        return (
            <li className="overflow-hidden rounded-md bg-white px-4 py-2 shadow">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col items-start pl-2">
                        <div className="text-md">
                            {this.props.identity.website?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                            {this.props.identity.user?.displayName}
                        </div>
                    </div>
                    <Button
                        icon={<EllipsisHorizontalIcon className="h-5 w-5" />}
                        onClick={this.onClick_}
                        color={ButtonColor.GHOST}
                        size={ButtonSize.SM}
                    />
                </div>
            </li>
        );
    }

    onClick_ = () => {
        showModal(<IdentityInfoModal identity={this.props.identity} />);
    };
}

type ListState = {
    identities: Identity[];
};

export class IdentityList extends React.Component<{}, ListState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            identities: [],
        };
        identities.listenForUpdate(this.refreshIdentities_);
        identities.update();
    }
    render() {
        if (this.state.identities.length == 0) {
            return (
                <div className="w-full h-full flex flex-col justify-center items-center text-lg text-gray-500">
                    No identities in vault.
                </div>
            );
        }
        const items = [];
        for (const identity of this.state.identities) {
            items.push(<ListItem identity={identity} />);
        }
        return (
            <ul role="list" className="space-y-2 mx-2 mt-4">
                {items}
            </ul>
        );
    }

    refreshIdentities_ = (identities: Identity[]) => {
        this.setState({ identities });
    };
}
