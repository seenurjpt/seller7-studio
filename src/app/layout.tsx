import { ThemeProvider } from "@/components/ThemeProvider";
import { Toast } from "@/components/ui/heroui";
import { AuthProvider } from "@/context/auth-context";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seller7.in"),
  title: "Seller7 Studio — AI Product Photos for Indian Sellers",
  description:
    "Turn one product photo into scroll-stopping marketing creatives. AI-powered product images for Indian small businesses — without overpaying for design.",
  openGraph: {
    title: "Seller7 Studio — AI Product Photos for Indian Sellers",
    description:
      "Turn one product photo into scroll-stopping marketing creatives. Clean backgrounds, your logo, marketplace-ready sizes — in under a minute.",
    type: "website",
    locale: "en_IN",
    siteName: "Seller7 Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seller7 Studio — AI Product Photos for Indian Sellers",
    description:
      "Turn one product photo into scroll-stopping marketing creatives for Indian marketplaces.",
  },
};

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme === 'dark' || (!theme && systemDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
          <Toast.Provider placement="top" />
        </ThemeProvider>
      </body>
    </html>
  );
}
