import React from "react";
import { ChevronRightIcon } from "../icons/chevron-right";

export class ListItem extends React.Component<{ text: string }> {
    render() {
        return (
            <div className="h-12 bg-gray-400 flex items-center justify-between border-b border-gray-500 px-4">
                {this.props.text}
                <ChevronRightIcon />
            </div>
        );
    }
}

export class ListSection extends React.Component<{
    title: string;
    children?: React.ReactNode;
}> {
    render() {
        return (
            <div>
                <div className="pl-4 text-md text-slate-700">
                    {this.props.title}
                </div>
                <div className="border-t border-gray-500">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
