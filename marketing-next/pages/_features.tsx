import {
    GlobeAltIcon,
    LockClosedIcon,
    ComputerDesktopIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const features = [
    {
        name: "Unphishable Login and Two Factor Authentication",
        description: (
            <>
                Passkeys can be used either directly for logging in or as an
                extra factor in multi-factor authentication. Better yet, since
                passkeys dont have codes or passwords, they cannot be phished at
                all. Just click “Approve” without the need to copy anything!
            </>
        ),
        icon: LockClosedIcon,
    },
    {
        name: "Sync Across Your Devices",
        description: (
            <>
                Bulwark Passkey is implemented virtually in software, so
                credentials can be securely and easily synced between your
                devices.. Windows is currently supported, with Mac and Linux
                support coming soon.
            </>
        ),
        icon: ComputerDesktopIcon,
    },
    {
        name: "Log into websites without passwords",
        description: (
            <>
                Bulwark Passkey supports the new FIDO2 industry standard, which
                allows you to log into supporting websites with just a click. No
                passwords or codes required!
            </>
        ),
        icon: GlobeAltIcon,
    },
    {
        name: "Open Source - Control and Transfer your Data",
        description: (
            <>
                Bulwark Passkey is{" "}
                <a
                    className="underline"
                    href="https://github.com/bulwarkid/bulwark-passkey"
                >
                    open source
                </a>
                , which means you can easily audit the code or export your data
                from it. No vendor lock-in!
            </>
        ),
        icon: MagnifyingGlassIcon,
    },
];

export default function Features() {
    return (
        <div className="bg-white py-12" id="features">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-lg font-semibold text-indigo-600">
                        Passkeys
                    </h2>
                    <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                        The Passwordless Future
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Passkeys are an industry standard that allows you to log
                        into websites without any passwords or codes, instead
                        relying on the credentials stored on your device.
                    </p>
                </div>

                <div className="mt-10">
                    <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative">
                                <dt>
                                    <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                                        <feature.icon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                                        {feature.name}
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    {feature.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
