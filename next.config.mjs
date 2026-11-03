/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: "https",
         hostname: "**",
      },
    ],
  },
  experimental: {
    agentFeedback: true,
  },
<<<<<<< HEAD
 
=======

>>>>>>> 061db1f0cdcea9650650d3889205b14345d7ac68
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
