import type { Metadata } from "next";
import { Outfit, Hanken_Grotesk, Permanent_Marker } from "next/font/google";
import { ReservationProvider } from "@/components/reservation-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const marker = Permanent_Marker({
  variable: "--font-permanent-marker",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Brew & Co",
  description: "Fresh-roasted coffee, ready when you are.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${hanken.variable} ${marker.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReservationProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ReservationProvider>
      </body>
    </html>
  );
}
