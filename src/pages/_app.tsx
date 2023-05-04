"use client";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "~/styles/Calendar.css";
import "~/styles/Spinner.css";
import "~/styles/Confirmation.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "~/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminNavBar from "~/components/AdminNavbar";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    router.pathname.includes("dashboard")
      ? setIsAdmin(true)
      : setIsAdmin(false);
  }, [router]);

  return (
    <>
      <Head>
        <title>FC Restaurant</title>
        <meta
          name="description"
          content="FC Restaurant Booking Online Order App"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider>
        <header>{isAdmin ? <AdminNavBar /> : <Navbar />}</header>
        <main>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
