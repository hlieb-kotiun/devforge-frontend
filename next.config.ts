import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
<<<<<<< HEAD
      {   
        protocol: "https",
        hostname: "ftp.goit.study",
      },
       { protocol: "https",          
         hostname: "res.cloudinary.com"    
=======
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
      {
        protocol: "https",
        hostname: "ftp.goit.study",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
>>>>>>> main
      },
    ],
  },
};

export default nextConfig;
