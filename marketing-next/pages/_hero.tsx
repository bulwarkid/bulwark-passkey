import Image from "next/image";
import DownloadLink from "./_download_link";

export default function HeroSection() {
    return (
        <div className="relative mx-auto mt-16 max-w-7xl px-4 sm:mt-24">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-6 flex flex-col justify-center mx-12">
                    <p className="text-lg font-semibold text-indigo-600">
                        Now in Beta!
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block xl:inline">Bulwark Passkey</span>
                    </h1>
                    <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                        An open-source passkey manager for the future of
                        passwordless logins.
                    </p>
                    <div className="mt-5 max-w-md sm:flex md:mt-8 space-x-2">
                        <div className="rounded-md shadow">
                            <DownloadLink source="windows" />
                        </div>
                        <div className="rounded-md shadow">
                            <DownloadLink source="linux" />
                        </div>
                    </div>
                </div>
                <div className="relative mt-12 sm:mx-auto sm:max-w-lg rounded-md lg:col-span-6 lg:mx-0 lg:mt-0 flex justify-center lg:max-w-none lg:items-center">
                    <Image
                        alt=""
                        className="rounded-xl shadow-lg border-4 border-gray-300"
                        src="img/app_screenshot.png"
                        height={100}
                        width={400}
                    />
                </div>
            </div>
        </div>
    );
}
