import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://i.postimg.cc/mgKz7XKb/credit-card-logo.png"), 
      new URL("https://i.postimg.cc/s2KmjRvn/nfc.png"),
      new URL ("https://i.postimg.cc/gcLh6jMX/logo-fox-prime-bank.png")
    ]
  }
};

export default nextConfig;
