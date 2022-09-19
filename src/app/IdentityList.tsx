import React from "react";
import { InfoIcon } from "../icons/info";

type ListItemProps = {
    websiteName: string;
    userName: string;
};

class ListItem extends React.Component<ListItemProps> {
    render() {
        return (
            <div className="border-gray-400 bg-gray-300 border border-solid flex justify-between items-center py-1 drop-shadow-0.5 ">
                <div className="flex flex-col items-start ml-8">
                    <div className="text-md font-bold">
                        {this.props.websiteName}
                    </div>
                    <div className="text-sm text-gray-500">
                        {this.props.userName}
                    </div>
                </div>
                <div className="mr-4">
                    <InfoIcon />
                </div>
            </div>
        );
    }
}

type ListProps = {
    identities: { websiteName: string; userName: string }[];
};

export class IdentityList extends React.Component<ListProps> {
    render() {
        const items = [];
        for (const identity of this.props.identities) {
            items.push(
                <ListItem
                    websiteName={identity.websiteName}
                    userName={identity.userName}
                />
            );
        }
        return (
            <div className="shrink overflow-y-scroll flex flex-col bg-gray-200 py-4">
                {items}
            </div>
        );
    }
}
