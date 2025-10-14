/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@genkit-ai/core"],
    },
};

module.exports = nextConfig;
