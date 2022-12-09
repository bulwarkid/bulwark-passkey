export default function ContactInfo() {
    return (
        <div className="bg-white" id="contact">
            <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
                <div className="divide-y-2 divide-gray-200">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">
                            Get in touch
                        </h2>
                        <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:col-span-2 lg:mt-0">
                            <div>
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Support
                                </h3>
                                <dl className="mt-2 text-base text-gray-500">
                                    <div>
                                        <dt className="sr-only">Email</dt>
                                        <dd>support@bulwark.id</dd>
                                    </div>
                                </dl>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    General
                                </h3>
                                <dl className="mt-2 text-base text-gray-500">
                                    <div>
                                        <dt className="sr-only">Email</dt>
                                        <dd>hello@bulwark.id</dd>
                                    </div>
                                </dl>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Github Discussion/Questions
                                </h3>
                                <dl className="mt-2 text-base text-gray-500">
                                    <div>
                                        <dt className="sr-only">
                                            Github Issues
                                        </dt>
                                        <dd>
                                            <a
                                                className="underline"
                                                href="https://github.com/bulwarkid/bulwark-issues/issues"
                                            >
                                                github.com/bulwarkid/bulwark-issues
                                            </a>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
