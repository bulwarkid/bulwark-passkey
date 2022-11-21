import { WindowsLogoIcon } from "@fluentui/react-icons-mdl2-branded";

export default function DownloadLink() {
    return (
        <a
            href="#"
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
        >
            <WindowsLogoIcon className="mr-2" />
            Download
        </a>
    );
}
