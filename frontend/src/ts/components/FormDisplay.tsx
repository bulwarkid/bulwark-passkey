import React from "react";
import { ChevronRightIcon } from "../icons/chevron-right";

type FormLinkProps = {
    text: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export class FormLink extends React.Component<FormLinkProps> {
    render() {
        return (
            <div
                className="p-3 flex items-center justify-between w-full h-full hover:bg-gray-400"
                onClick={this.props.onClick}
            >
                {this.props.text}
                <ChevronRightIcon />
            </div>
        );
    }
}

type FormDataProps = {
    label?: string;
    value?: string;
};

export class FormData extends React.Component<FormDataProps> {
    render() {
        return (
            <div className="p-3 flex justify-between items-center">
                <div className="whitespace-nowrap grow mr-4">
                    {this.props.label}
                </div>
                <div className="text-gray-600 truncate">{this.props.value}</div>
            </div>
        );
    }
}

export class FormDisplay extends React.Component<{
    children: React.ReactElement[];
}> {
    render() {
        const items = [];
        for (const child of this.props.children) {
            items.push(child);
            items.push(<div className="border-b border-gray-400" />);
        }
        items.pop();
        return <div className="list flex flex-col">{items}</div>;
    }
}
