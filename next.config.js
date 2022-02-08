module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://diabshopping.herokuapp.com/api/:path*',
      },
      {
        source: '/api/orders',
        destination: 'https://diabshopping.herokuapp.com/api/orders',
      }
    ]
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'www.ikea.com', 'images.unsplash.com'],
  },
}
