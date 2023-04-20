import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { dark } from "@clerk/themes";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { NavBar } from "~/components/Navbar";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        layout: {
          socialButtonsVariant: "iconButton",
          socialButtonsPlacement: "bottom",
        },
      }}
      {...pageProps}
    >
      <div className="light:black bg-gray-800 dark:text-white">
        <NavBar />
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
