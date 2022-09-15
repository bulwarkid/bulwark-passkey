import React from "react";
import "./List.css";

type ListItemProps = {
    websiteName: string;
    userName: string;
};

class ListItem extends React.Component<ListItemProps> {
    render() {
        return (
            <div className="border-gray-400 bg-gray-300 border border-solid flex items-center py-2 px-8 rounded-3xl my-0.5 mx-2 drop-shadow-0.5">
                <div className="flex flex-col items-start">
                    <div className="text-md font-bold">
                        {this.props.websiteName}
                    </div>
                    <div className="text-sm text-gray-500">
                        {this.props.userName}
                    </div>
                </div>
            </div>
        );
    }
}

type ListProps = {
    identities: { websiteName: string; userName: string }[];
};

export class List extends React.Component<ListProps> {
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
            <div className="h-full w-full flex flex-col bg-gray-200 py-4">
                {items}
            </div>
        );
    }
}
