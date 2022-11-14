/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        unoptimized: true,
        loader: "akamai",
        path: "",
    },
    basePath: "/bulwark-passkey-website",
    assetPrefix: "./",
};

module.exports = nextConfig;
