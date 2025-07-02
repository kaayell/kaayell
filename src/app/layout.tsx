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
        <div className="grid min-h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
          <div className="col-span-5">
            <Header />
          </div>

          <div className="hidden h-full md:row-start-2 md:flex">
            <SideLinks />
          </div>

          <main className="col-start-2 flex h-full w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
