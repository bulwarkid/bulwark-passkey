import Head from "next/head";
import Header from "../../content/header";
import ProblemWithPasskeys from "../../content/blog/problem_with_passkeys";
import Footer from "../../content/footer";

export default function ProblemWithPasskeysPage() {
    return (
        <div>
            <Head>
                <title>Bulwark Passkey</title>
                <meta name="description" content="Passkey Manager" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <div className="relative">
                <Header />
                <div className="mt-24" />
                <div className="flex flex-col items-center">
                    <div className="max-w-2xl w-full text-lg text-justify text-gray-700">
                        <ProblemWithPasskeys />
                    </div>
                </div>
                <div className="mt-12" />
                <Footer />
            </div>
        </div>
    );
}
