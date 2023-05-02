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

const MyApp: AppType = ({ Component, pageProps }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    router.pathname.includes("dashboard")
      ? setIsAdmin(true)
      : setIsAdmin(false);
  }, [router]);

  return (
    <ChakraProvider>
      <header>{isAdmin ? <AdminNavBar /> : <Navbar />}</header>
      <main>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
