import React from "react";
import { htmlId } from "../core/util";

type InputProps = {
    inputRef?: React.RefObject<HTMLInputElement>;
    label?: string;
    srLabel?: boolean;
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export class Input extends React.Component<InputProps> {
    render() {
        const id = htmlId();
        let inputClassName =
            " relative block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm ";
        inputClassName +=
            " focus:z-10 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 ";
        inputClassName +=
            " disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-600 ";
        if (this.props.className) {
            inputClassName += " " + this.props.className;
        }
        const input = (
            <input
                {...this.props}
                ref={this.props.inputRef}
                id={id}
                className={inputClassName}
            />
        );
        if (this.props.label) {
            return (
                <div>
                    <label
                        htmlFor={id}
                        className={
                            this.props.srLabel
                                ? "sr-only"
                                : "block text-sm font-medium text-gray-700"
                        }
                    >
                        {this.props.label}
                    </label>
                    <div className={this.props.srLabel ? "" : "mt-1"}>
                        {input}
                    </div>
                </div>
            );
        } else {
            return input;
        }
    }
}
