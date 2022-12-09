import DownloadLink from "./_download_link";
import { AppleIcon } from "./_icons";

export default function CallToAction() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-16 lg:px-8 flex flex-col items-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    <span className="block">Want to try out passkeys?</span>
                    <span className="block">Download it today.</span>
                </h2>
                <div className="flex justify-center mt-5 max-w-lg sm:flex md:mt-8 space-x-2">
                    <div className="rounded-md shadow">
                        <DownloadLink source="windows" />
                    </div>
                    <div className="rounded-md shadow">
                        <DownloadLink source="linux" />
                    </div>
                    <div className="rounded-md shadow">
                        <div className="inline-flex items-center rounded-md border border-transparent bg-indigo-400 px-6 py-3 text-base font-medium text-white shadow-sm">
                            <AppleIcon />
                            Coming Soon
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
