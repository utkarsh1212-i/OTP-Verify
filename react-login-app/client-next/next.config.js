/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enables React Strict Mode for highlighting potential issues
    // swcMinify: true, // Enables SWC-based minification for faster builds
    env: {
        // Add environment variables here (these will be accessible in the browser)
        API_BASE_URL: 'http://localhost:5000', // Example: Backend API base URL
    },
    images: {
        // Configure external image domains if needed
        domains: ['example.com'], // Replace with allowed domains for images
    },
    async redirects() {
        // Example: Redirects for specific routes
        return [
            {
                source: '/old-route',
                destination: '/new-route',
                permanent: true, // Set to true for 301 redirects
            },
        ];
    },
    async rewrites() {
        // Example: Rewrites for API routes
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:5000/:path*', // Proxy to backend API
            },
        ];
    },
};

module.exports = nextConfig;