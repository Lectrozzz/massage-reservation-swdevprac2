import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Massage Hub",
    default: "Massage Hub"
  },
  description: "Massage Hub is a place you can satisfy your massage cravings",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
          <TopMenu/>
          {children}
      </body>
    </html>
  );
}
