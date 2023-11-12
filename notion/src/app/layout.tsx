import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/lib/providers/next-theme-provider";
import { twMerge } from "tailwind-merge";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notion",
  description: "Your friendly note taking app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={twMerge("bg-background", font.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* <AppStateProvider> */}
          {/* <SupabaseUserProvider> */}
          {/* <SocketProvider> */}
          {children}
          {/* <Toaster /> */}
          {/* </SocketProvider> */}
          {/* </SupabaseUserProvider> */}
          {/* </AppStateProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
