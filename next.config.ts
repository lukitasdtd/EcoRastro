import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            // Excluir `express` del paquete del servidor, ya que causa problemas con Genkit.
            config.externals.push('express');
        }
        return config;
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:5000/api/:path*', // Redirige al backend en el puerto 5000
            },
        ]
    },
    /* config options here */
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;