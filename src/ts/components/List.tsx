import React from "react";
import { ChevronRightIcon } from "../icons/chevron-right";

export class ListItem extends React.Component<{
    text: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}> {
    render() {
        return (
            <li className="bg-gray-400">
                <a onClick={this.props.onClick}>
                    <div className="flex items-center justify-between w-full h-full">
                        {this.props.text}
                        <ChevronRightIcon />
                    </div>
                </a>
            </li>
        );
    }
}

export class ListSection extends React.Component<{
    title?: string;
    children?: React.ReactNode;
}> {
    render() {
        return (
            <div className="daisy-form-control">
                {this.props.title ? (
                    <label className="daisy-label">
                        <span className="daisy-label-text">
                            {this.props.title}
                        </span>
                    </label>
                ) : undefined}
                <div className="daisy-menu rounded-box px-2">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
