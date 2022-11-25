import { Menu, Popover, Transition } from "@headlessui/react";
import { WindowsLogoIcon } from "@fluentui/react-icons-mdl2-branded";
import Image from "next/image";
import Link from "next/link";
import DownloadLink, { sources } from "./_download_link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function DownloadDropdown() {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Download
                <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                />
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                    <Menu.Item>
                        <a
                            href={sources["windows"].link}
                            className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover-text-gray-900"
                        >
                            <WindowsLogoIcon className="mr-2" />
                            Windows
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a
                            href={sources["linux"].link}
                            className="block flex px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                            <Image
                                className="mr-2"
                                src="img/linux-dark.svg"
                                alt="Linux Logo"
                                width={20}
                                height={20}
                            />
                            Linux
                        </a>
                    </Menu.Item>
                </div>
            </Menu.Items>
        </Menu>
    );
}

export default function Header() {
    const logo = (
        <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center space-x-3">
                <Image
                    className="h-8 w-auto sm:h-10"
                    src="img/logo.svg"
                    alt=""
                    width={10}
                    height={10}
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
                        {/* <DownloadLink source="windows" /> */}
                        <DownloadDropdown />
                    </div>
                </div>
            </div>
        </Popover>
    );
}
