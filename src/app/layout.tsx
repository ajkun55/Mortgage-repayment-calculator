import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const pjs = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend Mentor | Mortgage repayment calculator",
  description: "Frontend Mentor | Mortgage repayment calculator using Next JS",
  icons: {
    icon: "/favicon.png", // /public path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pjs.className}>{children}</body>
    </html>
  );
}
