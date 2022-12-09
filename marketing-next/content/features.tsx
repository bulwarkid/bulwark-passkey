import {
    GlobeAltIcon,
    LockClosedIcon,
    ComputerDesktopIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const features = [
    {
        name: "Unphishable Authentication",
        description: (
            <>
                Passkeys allow you to log in or add a second factor of
                authentication, without any secret passwords or one-time codes.
                Just hit {'"Approve"'} on the app!
            </>
        ),
        icon: LockClosedIcon,
    },
    {
        name: "Sync Across Your Devices",
        description: (
            <>
                Bulwark Passkey syncs your credentials across all your devices.
                Windows and Linux are currently supported, with Mac support
                coming soon.
            </>
        ),
        icon: ComputerDesktopIcon,
    },
    {
        name: "One Click Approval",
        description: (
            <>
                No need to grab your phone, open your email, or copy any codes.
                Just hit {'"Approve"'} and {"you're"} in!
            </>
        ),
        icon: GlobeAltIcon,
    },
    {
        name: "Completely Open Source",
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
                        Easy and Secure
                    </h2>
                    <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                        A New Passkey Manager
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Bulwark Passkey allows you to experience the ease-of-use
                        and security of passkeys without the need for a physical
                        device.
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
