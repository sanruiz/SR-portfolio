import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "via.placeholder.com",
      "placehold.co",
      "simpleicons.org",
      "i0.wp.com",
      "wp.sanruiz.co",
    ],
    localPatterns: [
      {
        pathname: "/images/**",
        search: "",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com/**",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "placehold.co/**",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "simpleicons.org/icons/**",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
        pathname: "wp.sanruiz.co/wp-content/uploads/**",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
