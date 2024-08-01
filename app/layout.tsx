import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const fontHeading = Inter({ subsets: ["latin"], variable: "--font-heading" });

const fontBody = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Homeaway",
  description: "Feel at home, away from home",
  icons: {
    icon: "/assets/red_tent.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth dark antialiased">
        <head>
          <meta charSet="utf-8" />
        </head>
        <body
          className={cn(
            "min-h-screen flex-1",
            fontBody.className,
            fontHeading.className
          )}
        >
          <Providers
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="container py-10 flex-1">{children}</main>
            <Toaster />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
