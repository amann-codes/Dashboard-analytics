/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/summary",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/dashboard/summary",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
