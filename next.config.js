/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['t4.ftcdn.net', 'lh3.googleusercontent.com', 'c.saavncdn.com'],
    formats: ['image/avif', 'image/webp'],
  }
}

module.exports = nextConfig