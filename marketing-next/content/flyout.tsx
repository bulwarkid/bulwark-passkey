import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

export default function FlyoutMenu(props: {
    button: React.ReactElement;
    panel: React.ReactElement;
}) {
    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button>{props.button}</Popover.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
                            {props.panel}
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
