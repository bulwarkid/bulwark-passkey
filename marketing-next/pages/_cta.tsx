export default function CallToAction() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-16 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    <span className="block">Ready to dive in?</span>
                    <span className="block">Start your free trial today.</span>
                </h2>
                <div className="mt-8 flex justify-center">
                    <div className="inline-flex rounded-md shadow">
                        <a
                            href="#"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
                        >
                            Download
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
