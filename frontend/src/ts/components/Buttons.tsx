import React from "react";

export enum ButtonSize {
    XS = 1,
    SM,
    MD,
    LG,
    XL,
}

export enum ButtonColor {
    PRIMARY = 1,
    CLEAR,
    SECONDARY,
    GHOST,
    ERROR,
}

type ButtonProps = {
    className?: string;
    text?: string;
    size: ButtonSize;
    color: ButtonColor;
    onClick?: () => void;
    icon?: React.ReactNode;
    buttonRef?: React.RefObject<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
};

export class Button extends React.Component<ButtonProps> {
    static defaultProps = {
        size: ButtonSize.MD,
        color: ButtonColor.PRIMARY,
        type: "button",
    };
    render() {
        let classes = [];
        switch (this.props.size) {
            case ButtonSize.XS:
                classes.push("px-2.5 py-1.5 text-xs");
                break;
            case ButtonSize.SM:
                classes.push("px-3 py-2 text-sm");
                classes.push("leading-4");
                break;
            case ButtonSize.MD:
                classes.push("px-4 py-2 text-sm");
                break;
            case ButtonSize.LG:
                classes.push("px-4 py-2 text-base");
                break;
            case ButtonSize.XL:
                classes.push("px-6 py-3 text-base");
                break;
        }
        if (this.props.size === ButtonSize.XS) {
            classes.push("rounded");
        } else {
            classes.push("rounded-md");
        }
        switch (this.props.color) {
            case ButtonColor.PRIMARY:
                classes.push("bg-indigo-600 hover:bg-indigo-700");
                classes.push("text-white");
                break;
            case ButtonColor.CLEAR:
                classes.push("bg-white hover:bg-gray-50");
                classes.push("text-gray-700");
                break;
            case ButtonColor.SECONDARY:
                classes.push("bg-indigo-100 hover:bg-indigo-200");
                classes.push("text-indigo-700");
                break;
            case ButtonColor.GHOST:
                classes.push("bg-transparent hover:bg-gray-200");
                classes.push("text-gray-700");
                break;
            case ButtonColor.ERROR:
                classes.push("bg-red-500 hover:bg-red-600");
                classes.push("text-white");
                break;
        }
        if (this.props.color === ButtonColor.CLEAR) {
            classes.push("border-gray-300");
        } else {
            classes.push("border-transparent");
        }
        if (this.props.color !== ButtonColor.GHOST) {
            classes.push("shadow-sm");
        }
        classes.push("inline-flex items-center border font-medium");
        classes.push(
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        );
        if (this.props.className) {
            classes.push(this.props.className);
        }
        return (
            <button
                ref={this.props.buttonRef}
                type={this.props.type}
                className={classes.join(" ")}
                onClick={this.props.onClick}
            >
                {this.props.icon}
                {this.props.text}
            </button>
        );
    }
}
