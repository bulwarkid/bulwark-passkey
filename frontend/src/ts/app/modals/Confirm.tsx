import React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { showPopup } from "../Popups";

export async function promptUser(
    prompt: string,
    title?: string
): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        showPopup((hidePopup) => {
            return (
                <ConfirmModal
                    title={title || "Confirm"}
                    prompt={prompt}
                    onResponse={(approved) => {
                        hidePopup();
                        resolve(approved);
                    }}
                />
            );
        });
    });
}

type ConfirmModalProps = {
    title: string;
    prompt: string;
    onResponse: (approved: boolean) => void;
};

type ConfirmModalState = {
    open: boolean;
};

export class ConfirmModal extends React.Component<
    ConfirmModalProps,
    ConfirmModalState
> {
    private cancelButtonRef_ = React.createRef<HTMLButtonElement>();
    constructor(props: ConfirmModalProps) {
        super(props);
        this.state = { open: false };
    }
    componentDidMount(): void {
        setTimeout(() => {
            this.setState({ open: true });
        }, 0);
    }
    render() {
        return (
            <Transition.Root show={this.state.open} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    initialFocus={this.cancelButtonRef_}
                    onClose={() => {
                        this.setState({ open: false });
                    }}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all w-full sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                {this.props.title}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    {this.props.prompt}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                            onClick={this.onYes_}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                            onClick={this.onNo_}
                                            ref={this.cancelButtonRef_}
                                        >
                                            No
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        );
    }

    onYes_ = () => {
        this.props.onResponse(true);
        this.setState({ open: false });
    };

    onNo_ = () => {
        this.props.onResponse(false);
        this.setState({ open: false });
    };
}
