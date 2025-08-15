import { metadata } from "./components/Metadate";
// import { getUserFromCookies } from '@/lib/auth';
import { UserProvider } from "./components/UserProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useUserStore } from "./store/useUserStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const userData = getUserFromCookies();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>{children}</UserProvider>
        {children}
      </body>
    </html>
  );
}
