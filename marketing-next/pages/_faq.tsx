import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
    {
        question: "How does it work?",
        answer: (
            <>
                Bulwark Passkey uses USB/IP to emulate a USB device that
                implements the FIDO2 and U2F protocols. These protocols enable
                us to support passkeys for Two Factor Authentication and
                WebAuthN, independent of what browser or client you use.
            </>
        ),
    },
    {
        question: "How is the data stored?",
        answer: (
            <>
                Credentials are encrypted with industry standard AES-256 using a
                master passphrase before being stored on disk or synced up to
                the cloud. Since your data is end-to-end encrypted, we do not
                have the ability to access your data. Data can also be stored
                only in a local file, and never synced up to Bulwark servers.
            </>
        ),
    },
    {
        question: "Is this method secure?",
        answer: (
            <>
                Credentials stored in a virtual device like Bulwark Passkey are
                not as secure as credentials stored in a hardware device, where
                they cannot be physically exported. However, a virtual device
                still completely eliminates phishing attacks and removes the
                need for copying passwords/codes, while also allowing you to
                transfer your credentials or recover your access should you lose
                your device.
            </>
        ),
    },
    {
        question: "What platforms are supported?",
        answer: (
            <>
                Right now, Windows and Linux support are supported. We will be
                adding Mac support {"Soon™️"}, and are looking to add support
                for iOS and Android in the future.
            </>
        ),
    },
    {
        question: "Can I see the source code?",
        answer: (
            <>
                Sure! Bulwark Passkey is{" "}
                <a
                    className="underline"
                    href="https://github.com/bulwarkid/bulwark-passkey"
                >
                    open source
                </a>
                , so you can examine the code whenever you want. In addition, it
                is built on top of a library called{" "}
                <a
                    className="underline"
                    href="https://github.com/bulwarkid/virtual-fido"
                >
                    Virtual FIDO
                </a>
                , which is an open source library maintained by us to create
                virtual FIDO devices like Bulwark Passkey.
            </>
        ),
    },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function FAQ() {
    return (
        <div className="bg-gray-50" id="faq">
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
