/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
                pathname: '/uploads/**',
            }, {
                protocol: 'https',
                hostname: 'images.pexels.com',
            }, {
                protocol: 'https',
                hostname: 'audelweiss.fr',
                pathname: '/wp-content/uploads/**',
            }
        ],
    },
}

module.exports = nextConfig
