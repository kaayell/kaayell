import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import SideLinks from "@/components/layout/SideLinks";
import { geistMono, geistSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "kaayell",
  description: "kaayell",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} ${geistMono.className}`}>
        <Header />
        <SideLinks />
        <main>{children}</main>
      </body>
    </html>
  );
}
