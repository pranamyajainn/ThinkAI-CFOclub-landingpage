import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CFO Forward — AI in Finance for Practitioners",
  description: "Monthly briefings, live workshops, and an exclusive peer community of finance leaders implementing AI. Built by practitioners, not publishers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="bg-background text-on-surface font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

