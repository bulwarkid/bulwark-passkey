import React from "react";

type ModalProps = {
    title: React.ReactElement;
    children: React.ReactNode;
    center?: boolean;
};

export class Modal extends React.Component<ModalProps> {
    render() {
        let contentClasses = "grow flex flex-col p-4";
        if (this.props.center) {
            contentClasses += " justify-center items-stretch";
        }
        return (
            <div className="w-screen h-screen flex flex-col">
                {this.props.title}
                <div className={contentClasses}>{this.props.children}</div>
            </div>
        );
    }
}
