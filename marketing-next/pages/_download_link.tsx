import { WindowsLogoIcon } from "@fluentui/react-icons-mdl2-branded";

export default function DownloadLink() {
    return (
        <a
            href="https://jdikcjgzpiezpacsqlkf.supabase.co/storage/v1/object/public/bulwark-passkey-app/Bulwark%20Passkey-amd64-installer.exe"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            <WindowsLogoIcon className="mr-2" />
            Download
        </a>
    );
}
