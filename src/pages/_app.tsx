"use client";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "~/styles/Calendar.css";
import "~/styles/Spinner.css";
import "~/styles/Confirmation.css";
import Navbar from "~/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminNavBar from "~/components/Admin/AdminNavbar";
import Head from "next/head";
import Script from "next/script";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    router.pathname.includes("dashboard")
      ? setIsAdmin(true)
      : setIsAdmin(false);
  }, [router]);

  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     // eslint-disable-next-line
  //     window.OneSignal = window.OneSignal || [];
  //     // eslint-disable-next-line
  //     OneSignal.push(function () {
  //     // eslint-disable-next-line
  //     OneSignal.init({
  //         appId: process.env.NEXT_PUBLIC_ONESIGNAL_API_KEY,
  //         allowLocalhostAsSecureOrigin: true,
  //         notifyButton: {
  //           enable: true,
  //         },
  //       });
  //     });
  //   }
  //   return () => {
  //     window.OneSignal = undefined;
  //   };
  // }, []);

  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-KNV715P46P"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-KNV715P46P');
`,
        }}
      ></Script>
      <Head>
        <title>FC Restaurant</title>
        <meta
          name="description"
          content="FC Restaurant Booking Online Order App"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>{isAdmin ? <AdminNavBar /> : <Navbar />}</header>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default api.withTRPC(MyApp);
