import { type NextPage } from "next";
import Head from "next/head";
import { formatISO } from "date-fns";
import { prisma } from "~/server/db";
import { Day } from "@prisma/client";
import Landing from "~/components/Landing";
import Footer from "~/components/Footer";

interface HomeProps {
  days: Day[];
  closedDays: string[];
}

const Home: NextPage<HomeProps> = ({ days, closedDays }) => {
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
      <main>
        <Landing />
        {/* <Calendar days={days} closedDays={closedDays} /> */}
      </main>
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  const days = await prisma.day.findMany();
  const closedDays = (await prisma.closedDay.findMany())?.map((day) =>
    formatISO(day.date)
  );
  return { props: { days, closedDays } };
}

export default Home;
