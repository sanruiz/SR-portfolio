import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Cta from "@/components/cta";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Santiago Ramirez Portfolio",
  description: "Personal portfolio of Santiago Ramirez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full scroll-smooth ${inter.variable} ${roboto_mono.variable} antialiased`}
    >
      <body>
        <Header />
        {children}
        <Cta />
        <Footer />
      </body>
    </html>
  );
}
