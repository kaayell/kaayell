import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { geistMono, geistSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "kaayell",
  description: "kaayell",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.className} min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        {modal}
        <Footer />
      </body>
    </html>
  );
}
