import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    const logo = (
        <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center space-x-3">
                <Image
                    className="h-8 w-auto sm:h-10"
                    src="img/logo.svg"
                    alt=""
                />
                <span className="text-lg font-medium tracking-tight text-gray-900">
                    Bulwark Passkey
                </span>
            </Link>
        </div>
    );
    return (
        <Popover className="relative bg-white z-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                    {logo}
                    <Popover.Group
                        as="nav"
                        className="hidden space-x-10 md:flex"
                    >
                        <Link
                            href="/"
                            className="text-base font-medium text-gray-500 hover:text-gray-900"
                        >
                            About
                        </Link>
                        <a
                            href="#features"
                            className="text-base font-medium text-gray-500 hover:text-gray-900"
                        >
                            Features
                        </a>
                        <a
                            href="#faq"
                            className="text-base font-medium text-gray-500 hover:text-gray-900"
                        >
                            FAQ
                        </a>
                        <a
                            href="#contact"
                            className="text-base font-medium text-gray-500 hover:text-gray-900"
                        >
                            Contact
                        </a>
                    </Popover.Group>
                    <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                        <a
                            href="#"
                            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Download
                        </a>
                    </div>
                </div>
            </div>
        </Popover>
    );
}
