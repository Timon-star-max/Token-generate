import React from "react"
import type { Metadata } from "next"
import { Nekst } from "@/public/fonts/nekst"
import { Syne } from "@/public/fonts/syne"
import { Providers } from "./providers"
import "@rainbow-me/rainbowkit/styles.css"
import "./globals.css"

import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Trial",
  description:
    "Token Generate",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <meta property="og:image" content="/images/logo.png" />
      </head>
      <body className={`${Nekst.className} overflow-x-hidden dark`}>
          <Providers>
            <Navbar></Navbar>
            {children}
          </Providers>
      </body>
    </html>
  );
}


