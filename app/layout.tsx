"use client";

import "@/global.css";
import { Footer } from "@/lib/components/layout/Footer";
import { Navbar } from "@/lib/components/layout/Navbar";
import { ThemeProvider } from "@/lib/components/ui/theme-provider";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-full m-0 flex flex-col relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
