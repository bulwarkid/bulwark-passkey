import React from "react";
import { htmlId } from "../core/util";

type InputProps = {
    inputRef?: React.RefObject<HTMLInputElement>;
    label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export class Input extends React.Component<InputProps> {
    render() {
        const id = htmlId();
        const input = (
            <input
                ref={this.props.inputRef}
                id={id}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-600"
                {...this.props}
            />
        );
        if (this.props.label) {
            return (
                <div>
                    <label
                        htmlFor={id}
                        className="block text-sm font-medium text-gray-700"
                    >
                        {this.props.label}
                    </label>
                    <div className="mt-1">{input}</div>
                </div>
            );
        } else {
            return input;
        }
    }
}
