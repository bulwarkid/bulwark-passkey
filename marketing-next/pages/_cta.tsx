import DownloadLink from "./_download_link";

export default function CallToAction() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-16 lg:px-8 flex flex-col items-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    <span className="block">Want to try out passkeys?</span>
                    <span className="block">Download it today.</span>
                </h2>
                <div className="flex justify-center mt-5 max-w-md sm:flex md:mt-8 space-x-2">
                    <div className="rounded-md shadow">
                        <DownloadLink source="windows" />
                    </div>
                    <div className="rounded-md shadow">
                        <DownloadLink source="linux" />
                    </div>
                </div>
            </div>
        </div>
    );
}
