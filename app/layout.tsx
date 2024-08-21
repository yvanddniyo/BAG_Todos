import type { Metadata } from "next";
import { Radio_Canada } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import QueryProvider from "./components/QueryProvider";

const radio = Radio_Canada({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo-app",
  description: "This app is about help you to schedule things you'll work on later. Plan the task well because without plan there nothing to will happen.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={radio.className}>
        <QueryProvider>
        <Providers>
         {children}
        </Providers>
        </QueryProvider>
      </body>
    </html>
  );
}
