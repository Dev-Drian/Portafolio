/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
        domains: ['adecas-eg.github.io'],
    },
    trailingSlash: true,
};

export default nextConfig;
