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
            <div className="w-screen h-screen flex flex-col bg-gray-200">
                {this.props.title}
                <div className={contentClasses}>{this.props.children}</div>
            </div>
        );
    }
}

type CardModalProps = {
    title: string;
    buttons: React.ReactNode;
    children?: React.ReactNode;
};

export class CardModal extends React.Component<CardModalProps> {
    render() {
        return (
            <div className="w-screen h-screen flex flex-col justify-center">
                <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow m-2">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            {this.props.title}
                        </h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        {this.props.children}
                    </div>
                    <div className="px-4 py-4 sm:px-6">
                        {this.props.buttons}
                    </div>
                </div>
            </div>
        );
    }
}
