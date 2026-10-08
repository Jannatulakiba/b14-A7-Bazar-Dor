import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Marquee from "@/components/Marquee"; 
import Footer from "@/components/Footer";
   import Header from "@/components/Header";

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-noto-serif-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: " 🛒 বাজার দর",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-theme="light" className={`${notoSerifBengali.variable} h-full antialiased`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <Marquee />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
