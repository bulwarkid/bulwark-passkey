import React from "react";
import { Identity } from "../../proto/data";
import * as identities from "../data/identities";
import { InfoIcon } from "../icons/info";
import { showModal } from "./ModalContainer";
import { IdentityInfoModal } from "./modals/IdentityInfo";
import { UnlockModal } from "./modals/Unlock";

type ListItemProps = {
    identity: Identity;
};

class ListItem extends React.Component<ListItemProps> {
    render() {
        return (
            <div className="border-gray-500 bg-gray-300 border-b border-solid flex justify-between items-center py-1 drop-shadow-0.5 ">
                <div className="flex flex-col items-start ml-8">
                    <div className="text-md font-bold">
                        {this.props.identity.website?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                        {this.props.identity.user?.displayName}
                    </div>
                </div>
                <div
                    className="mr-4 daisy-btn daisy-btn-square daisy-btn-ghost"
                    onClick={this.onClick_}
                >
                    <InfoIcon />
                </div>
            </div>
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
        const items = [];
        for (const identity of this.state.identities) {
            items.push(<ListItem identity={identity} />);
        }
        return (
            <div className="flex flex-col my-4 border-t border-gray-500 border-solid">
                {items}
            </div>
        );
    }

    refreshIdentities_ = (identities: Identity[]) => {
        this.setState({ identities });
    };
}
