import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // Commented out due to network restrictions in sandboxed environments
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] }); // Commented out due to network restrictions

export const metadata: Metadata = {
  title: "Guacchain: The Computer Game. Blockchain-AI powered Guacamole",
  description: "Absurd Avocado Farm Management Interface - Manage your blockchain-powered guacamole empire!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
