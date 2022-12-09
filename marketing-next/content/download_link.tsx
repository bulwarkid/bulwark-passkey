import { WindowsLogoIcon } from "@fluentui/react-icons-mdl2-branded";
import Image from "next/image";

export const sources = {
    windows: {
        link: "https://jdikcjgzpiezpacsqlkf.supabase.co/storage/v1/object/public/bulwark-passkey-app/Bulwark%20Passkey-amd64-installer.exe",
        logo: <WindowsLogoIcon className="mr-2" />,
    },
    linux: {
        link: "https://jdikcjgzpiezpacsqlkf.supabase.co/storage/v1/object/public/bulwark-passkey-app/bulwark-passkey.deb",
        logo: (
            <Image
                className="mr-2"
                src="img/linux.svg"
                alt="Linux Logo"
                width={20}
                height={20}
            />
        ),
    },
};

export default function DownloadLink(props: { source: "windows" | "linux" }) {
    const source = sources[props.source || "windows"];
    return (
        <a
            href={source.link}
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            {source.logo}
            Download
        </a>
    );
}
