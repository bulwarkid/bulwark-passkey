import {
    GlobeAltIcon,
    LockClosedIcon,
    ComputerDesktopIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const features = [
    {
        name: "Unphishable Two Factor Authentication",
        description: (
            <>
                Bulwark Passkey uses the U2F/FIDO protocols, which allow for
                secure cryptographic authentication without the need for
                passwords or one-time codes. Just click “Approve” without the
                need to copy anything!
            </>
        ),
        icon: LockClosedIcon,
    },
    {
        name: "Sync Across Your Devices",
        description: (
            <>
                Bulwark Passkey is a pure software implementation, so
                credentials are securely synced between your devices using a
                master passphrase. Windows is currently supported, with Mac and
                Linux support coming soon.
            </>
        ),
        icon: ComputerDesktopIcon,
    },
    {
        name: "Log into websites with WebAuthN",
        description: (
            <>
                Bulwark Passkey supports the new FIDO2 protocol, which allows
                you to log into supporting websites without the need for any
                passwords.
            </>
        ),
        icon: GlobeAltIcon,
    },
    {
        name: "Open Source Core - Export and Transfer your Data",
        description: (
            <>
                Bulwark Passkey is built on top of{" "}
                <a
                    className="underline"
                    href="https://github.com/bulwarkid/virtual-fido"
                >
                    Virtual FIDO
                </a>
                , an open source USB emulation of a U2F/FIDO device with a
                standard credential encryption/storage format. You can easily
                export your credentials out of Bulwark Passkey as long as you
                have your master passphrase.
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
                        Authentication without Passwords
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        FIDO devices (such as Yubikeys or Bulwark Passkey)
                        support passkeys, which allow you to log into websites
                        or add a second factor of authentication without the
                        need for copying any codes or passwords.
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
