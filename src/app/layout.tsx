import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "kaayell",
  description: "kaayell",
};

export default function RootLayout({
  children,
	modal
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} ${geistMono.className} min-h-screen flex flex-col`}>
			  <Header />
			  <main className="flex-grow">{children}</main>
				{modal}
				<div id={"modal-root"} />
			  <Footer />
      </body>
    </html>
  );
}
