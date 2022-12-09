import Head from "next/head";
import ContactInfo from "../content/contact";
import CallToAction from "../content/cta";
import FAQ from "../content/faq";
import Features from "../content/features";
import Footer from "../content/footer";
import Header from "../content/header";
import HeroSection from "../content/hero";
import Newsletter from "../content/newsletter";
import Passkeys from "../content/passkeys";
import DevFeatures from "../content/dev_features";

export default function Home() {
    const backgroundDots = (
        <div
            className="hidden lg:absolute lg:inset-0 lg:block"
            aria-hidden="true"
        >
            <svg
                className="absolute top-0 left-1/2 translate-x-64 -translate-y-8 transform z-0"
                width={640}
                height={784}
                fill="none"
                viewBox="0 0 640 784"
            >
                <defs>
                    <pattern
                        id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
                        x={118}
                        y={0}
                        width={20}
                        height={20}
                        patternUnits="userSpaceOnUse"
                    >
                        <rect
                            x={0}
                            y={0}
                            width={4}
                            height={4}
                            className="text-gray-200"
                            fill="currentColor"
                        />
                    </pattern>
                </defs>
                <rect
                    y={72}
                    width={640}
                    height={640}
                    className="text-gray-50"
                    fill="currentColor"
                />
                <rect
                    x={118}
                    width={404}
                    height={784}
                    fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
                />
            </svg>
        </div>
    );
    return (
        <div className="relative overflow-x-hidden">
            <Head>
                <title>Bulwark Passkey</title>
                <meta
                    name="description"
                    content="Software-based WebAuthN/2FA"
                />
                <link rel="icon" href="/favicon.png" />
            </Head>
            {backgroundDots}
            <div className="relative">
                <Header />
                <HeroSection />
                <div className="mt-12" />
                <Features />
                <div className="mt-12" />
                <Passkeys />
                <div className="mt-12" />
                <DevFeatures />
                <div className="mt-12" />
                <FAQ />
                <div className="mt-12" />
                <CallToAction />
                <div className="mt-12" />
                <Newsletter />
                <div className="mt-12" />
                <ContactInfo />
                <div className="mt-12" />
                <Footer />
            </div>
        </div>
    );
}
