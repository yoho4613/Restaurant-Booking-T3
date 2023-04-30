import React, { FC } from "react";

import { prisma } from "~/server/db";
import { formatISO } from "date-fns";
import Calendar from "~/components/Calendar";
import { Day } from "@prisma/client";

interface BookingProps {
  days: Day[];
  closedDays: string[];
}

const booking: FC<BookingProps> = ({ days, closedDays }) => {
  return (
    <div>
      <Calendar days={days} closedDays={closedDays} />
    </div>
  );
};

export async function getServerSideProps() {
  const days = await prisma.day.findMany();
  const closedDays = (await prisma.closedDay.findMany())?.map((day) =>
    formatISO(day.date)
  );
  return { props: { days, closedDays } };
}

export default booking;
