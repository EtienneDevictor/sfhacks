/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyimage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placekitten.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      { protocol: "https",
      hostname: "sfhacksbucketstoryteller.s3.us-west-1.amazonaws.com",
      port: "",
      pathname: "/**",}
    ],
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
