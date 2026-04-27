import type { Metadata } from "next";
import { Space_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransitionWrapper from "@/components/layout/PageTransitionWrapper";
import CartDrawer from "@/components/cart/CartDrawer";
import FloatingFeedback from "@/components/layout/FloatingFeedback";
import LightningOverlay from "@/components/layout/LightningOverlay";

// ─── Google Fonts ────────────────────────────────────────────────────
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// ─── Metadata ────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "NinetyWear — Premium Streetwear",
    template: "%s | NinetyWear",
  },
  description:
    "NinetyWear: premium on-demand streetwear crafted for those who refuse to conform. Brutalist aesthetics, zero waste, no compromises.",
  keywords: ["streetwear", "premium", "hoodies", "fashion", "ninetywear", "drop"],
  authors: [{ name: "NinetyWear" }],
  creator: "NinetyWear",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NinetyWear",
    title: "NinetyWear — Premium Streetwear",
    description:
      "Premium on-demand streetwear. Brutalist aesthetics, zero waste, no compromises.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NinetyWear — Premium Streetwear",
    description: "Premium on-demand streetwear. Brutalist dark aesthetics.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─── Root Layout ─────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="scanlines bg-void text-bone antialiased font-mono selection:bg-magenta selection:text-white">
        <Header />
        <CartDrawer />
        <LightningOverlay />
        <PageTransitionWrapper>
          <main className="relative z-10">{children}</main>
        </PageTransitionWrapper>
        <FloatingFeedback />
        <Footer />
      </body>
    </html>
  );
}
