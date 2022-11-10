export default function HeroSection() {
    return (
        <div className="relative mx-auto mt-16 max-w-7xl px-4 sm:mt-24">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="text-center lg:col-span-6 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block xl:inline">Bulwark Passkey</span>
                    </h1>
                    <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                        A simple, software-based, transferable FIDO device for
                        Two Factor Authentication and WebAuthN.
                    </p>
                    <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
                        <div className="rounded-md shadow">
                            <a
                                href="#"
                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                            >
                                Download
                            </a>
                        </div>
                    </div>
                </div>
                <div className="relative mt-12 sm:mx-auto sm:max-w-lg rounded-md lg:col-span-6 lg:mx-0 lg:mt-0 flex justify-center lg:max-w-none lg:items-center">
                    <img
                        className="rounded-xl shadow-lg border-4 border-gray-300"
                        src="/img/app_screenshot.png"
                        height={100}
                        width={400}
                    />
                </div>
            </div>
        </div>
    );
}
