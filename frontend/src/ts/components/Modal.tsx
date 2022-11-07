import React from "react";
import { classNames } from "../core/util";

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

type CardModalTitleProps = {
    title: string;
    button?: React.ReactNode;
};

export class CardModalTitle extends React.Component<CardModalTitleProps> {
    render() {
        const title = (
            <h3 className="text-lg font-medium leading-6 text-gray-900">
                {this.props.title}
            </h3>
        );
        if (this.props.button) {
            return (
                <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap px-4 py-5 sm:px-6">
                    <div className="ml-4 mt-2">{title}</div>
                    <div className="ml-4 mt-2 flex-shrink-0">
                        {this.props.button}
                    </div>
                </div>
            );
        } else {
            return <div className="px-4 py-5 sm:px-6">{title}</div>;
        }
    }
}

type CardModalProps = {
    children?: React.ReactNode;
};

export class CardModal extends React.Component<CardModalProps> {
    render() {
        return (
            <div className="w-screen h-screen flex flex-col justify-center">
                <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow m-2">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
