import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
    {
        question: "How does it work?",
        answer: "Bulwark Passkey uses USB/IP to emulate a USB device that implements the FIDO2 and U2F protocols. These protocols enable support for both Two Factor Authentication and WebAuthN, independent of your browser or type of client.",
    },
    {
        question: "How is the data stored?",
        answer: "Credentials are encrypted with a master passphrase before being stored on disk or synced up to Bulwark servers. This means that an attacker can only decrypt and use your credentials if they also gain access to the master passphrase.",
    },
    {
        question: "Is this method secure?",
        answer: "While credentials are not stored as securely as an external hardware device where credentials cannot be physically removed from the device, emulating such devices in software can completely eliminate phishing attacks and the need to copy codes or passwords. A side effect of software emulation is that your credentials can be synced across devices for great ease-of-use, much like a password manager.",
    },
    {
        question: "What platforms are supported?",
        answer: "Right now, only Windows and Linux are supported as those are the platforms that have USB/IP support. We will be adding Mac support Soon (tm) and are looking to add support for iOS and Android in the future.",
    },
    {
        question: "Can I see the source code?",
        answer: "Sure! Bulwark Passkey is built on top of an open source core called Virtual FIDO (https://github.com/bulwarkid/virtual-fido), which contains the USB emulation and FIDO protocol code, as well as the credential encryption and formatting. Right now the frontend UI contains proprietary UI code, including code bought from TailwindUI, so cannot be open sourced as easily. However, you are still able to view the safety critical parts of the code, as well as easily decrypt and transfer your credentials out of the system.",
    },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function FAQ() {
    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Frequently asked questions
                    </h2>
                    <dl className="mt-6 space-y-6 divide-y divide-gray-200">
                        {faqs.map((faq) => (
                            <Disclosure
                                as="div"
                                key={faq.question}
                                className="pt-6"
                            >
                                {({ open }) => (
                                    <>
                                        <dt className="text-lg">
                                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                                                <span className="font-medium text-gray-900">
                                                    {faq.question}
                                                </span>
                                                <span className="ml-6 flex h-7 items-center">
                                                    <ChevronDownIcon
                                                        className={classNames(
                                                            open
                                                                ? "-rotate-180"
                                                                : "rotate-0",
                                                            "h-6 w-6 transform"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel
                                            as="dd"
                                            className="mt-2 pr-12"
                                        >
                                            <p className="text-base text-gray-500">
                                                {faq.answer}
                                            </p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
