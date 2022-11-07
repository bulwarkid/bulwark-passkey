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
}

type ButtonProps = {
    text: string;
    size: ButtonSize;
    color: ButtonColor;
    onClick?: () => void;
    icon?: React.ReactNode;
};

export class Button extends React.Component<ButtonProps> {
    static defaultProps = {
        size: ButtonSize.MD,
        color: ButtonColor.PRIMARY,
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
                classes.push("border-transparent");
                break;
            case ButtonColor.CLEAR:
                classes.push("bg-white hover:bg-gray-50");
                classes.push("text-gray-700");
                classes.push("border-gray-300");
                break;
            case ButtonColor.SECONDARY:
                classes.push("bg-indigo-100 hover:bg-indigo-200");
                classes.push("text-indigo-700");
                classes.push("border-transparent");
                break;
        }
        classes.push("inline-flex items-center border font-medium shadow-sm");
        classes.push(
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        );
        return (
            <button
                type="button"
                className={classes.join(" ")}
                onClick={this.props.onClick}
            >
                {this.props.icon}
                {this.props.text}
            </button>
        );
    }
}
