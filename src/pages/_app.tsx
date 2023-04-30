"use client";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "~/styles/Calendar.css";
import "~/styles/Spinner.css";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <header>
        <Navbar />
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
