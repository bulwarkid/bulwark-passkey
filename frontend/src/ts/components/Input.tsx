import React from "react";

export class Input extends React.Component<{
    inputRef?: React.RefObject<HTMLInputElement>;
    placeholder?: string;
    type?: string;
}> {
    render() {
        return (
            <input
                ref={this.props.inputRef}
                type={this.props.type}
                placeholder={this.props.placeholder}
                className="daisy-input daisy-input-bordered daisy-input-md"
            ></input>
        );
    }
}

export class VerticalInputGroup extends React.Component<{
    children: React.ReactNode;
}> {
    render() {
        return (
            <div className="daisy-input-group daisy-input-group-vertical">
                {this.props.children}
            </div>
        );
    }
}
