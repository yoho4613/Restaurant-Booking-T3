import { type NextPage } from "next";
import { formatISO } from "date-fns";
import { prisma } from "~/server/db";
import { Day } from "@prisma/client";
import Landing from "~/components/Landing";
import Footer from "~/components/Footer";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    localStorage.removeItem("products");
  }, []);
  return (
    <>
      <main className="banner">
        <Landing />
        {/* <Calendar days={days} closedDays={closedDays} /> */}
      </main>
      <Footer />
    </>
  );
};

export default Home;
