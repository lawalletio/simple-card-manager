"use client";

import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { AppProvider } from "@/contexts/app-context";
import { Suspense } from "react";
import { InjectedNFCProvider } from "@/contexts/injected-nfc";
import { CardProvider } from "@/contexts/card-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='dark'>
      <body className='antialiased'>
        <AppProvider>
          <InjectedNFCProvider>
            <CardProvider>
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </CardProvider>
          </InjectedNFCProvider>
        </AppProvider>
        <Analytics />
      </body>
    </html>
  );
}
