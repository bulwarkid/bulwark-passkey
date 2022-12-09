import {
    ArrowRightOnRectangleIcon,
    BackwardIcon,
    BoltIcon,
    ClipboardDocumentCheckIcon,
    DevicePhoneMobileIcon,
    EyeSlashIcon,
    FolderOpenIcon,
    GlobeAltIcon,
    RocketLaunchIcon,
    ScaleIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";

const features = [
    {
        name: "Try the new login standard",
        description: (
            <>
                WebAuthN (otherwise known as passkeys) is a new industry
                standard supported by W3C and the FIDO Alliance. Bulwark Passkey
                allows you to test your implementation of the protocol with no
                hardware device.
            </>
        ),
        icon: GlobeAltIcon,
    },
    {
        name: "Test your two factor authentication flows",
        description: (
            <>
                Bulwark Passkey also supports U2F, the older protocol used by
                two factor authentication devices like Yubikeys. Test your flow
                without plugging anything in!
            </>
        ),
        icon: ClipboardDocumentCheckIcon,
    },
    {
        name: "Sync your credentials across the entire team",
        description: (
            <>
                Bulwark Passkey credentials can be synced across many devices
                with one account, allowing your team to collaborate or access
                needed credentials for testing without any hardware.
            </>
        ),
        icon: UserGroupIcon,
    },
    {
        name: "Supports local-only storage",
        description: (
            <>
                Don{"'"}t want to store your credentials on an account, or need
                to test something without internet? No problem! Bulwark Passkey
                supports storing your credentials only on the single device the
                app is running on.
            </>
        ),
        icon: FolderOpenIcon,
    },
];

function DevFeaturesOld() {
    return (
        <div className="bg-white pb-24 sm:pb-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="sm:text-center">
                    <h2 className="text-lg font-semibold leading-8 text-indigo-600">
                        A New Developer Tool
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Test your apps without hardware
                    </p>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                        Bulwark Passkey is a virtual FIDO device, allowing you
                        to test the latest industry standards without buying a
                        hardware device, like a Yubikey.
                    </p>
                </div>

                <div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
                    <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
                        {features.map((feature) => (
                            <div
                                key={feature.name}
                                className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white sm:shrink-0">
                                    <feature.icon
                                        className="h-8 w-8"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="sm:min-w-0 sm:flex-1">
                                    <p className="text-lg font-semibold leading-8 text-gray-900">
                                        {feature.name}
                                    </p>
                                    <p className="mt-2 text-base leading-7 text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

import { CheckIcon } from "@heroicons/react/24/outline";

const features2 = [
    {
        name: "WebAuthN",
        description: (
            <>
                WebAuthN (otherwise known as passkeys) is a new industry
                standard supported by W3C and the FIDO Alliance. Bulwark Passkey
                allows you to test your implementation of the protocol with no
                hardware device.
            </>
        ),
    },
    {
        name: "Two Factor Authentication",
        description: (
            <>
                Bulwark Passkey also supports U2F, the older protocol used by
                two factor authentication devices like Yubikeys. Test your flow
                without plugging anything in!
            </>
        ),
    },
    {
        name: "Team-wide Collaboration",
        description: (
            <>
                Bulwark Passkey credentials can be synced across many devices
                with one account, allowing your team to collaborate or access
                needed credentials for testing without sharing any hardware.
            </>
        ),
    },
    {
        name: "Local-only storage",
        description: (
            <>
                Don{"'"}t want to store your credentials on an account, or need
                to test something without internet? No problem! Bulwark Passkey
                supports storing your credentials only on the single device the
                app is running on.
            </>
        ),
    },
];

export default function DevFeaturesAlt() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl pb-24 px-6 sm:pb-32 lg:px-8 lg:pb-40">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Test your apps without hardware
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-600">
                        Bulwark Passkey is a virtual FIDO2 device, allowing you
                        to test the latest industry standards without buying a
                        hardware device, like a Yubikey.
                    </p>
                </div>
                <dl className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
                    {features2.map((feature) => (
                        <div key={feature.name} className="relative">
                            <dt>
                                <CheckIcon
                                    className="absolute mt-1 h-6 w-6 text-indigo-600"
                                    aria-hidden="true"
                                />
                                <p className="ml-10 text-lg font-semibold leading-8 text-gray-900">
                                    {feature.name}
                                </p>
                            </dt>
                            <dd className="mt-2 ml-10 text-base leading-7 text-gray-600">
                                {feature.description}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
}
