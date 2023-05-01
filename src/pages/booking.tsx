import React, { FC, useState } from "react";

import { prisma } from "~/server/db";
import { formatISO } from "date-fns";
import Calendar from "~/components/Calendar";
import { Day } from "@prisma/client";
import CustomerDetail from "~/components/CustomerDetail";

interface BookingProps {
  days: Day[];
  closedDays: string[];
}

export interface Form {
  name: string;
  mobile: string;
  email: string | null;
  people: number;
}

const booking: FC<BookingProps> = ({ days, closedDays }) => {
  const [customerDetail, setCustomerDetail] = useState(true);
  const [form, setForm] = useState<Form>({
    name: "",
    mobile: "",
    email: null,
    people: 0,
  });

  return (
    <div>
      {!customerDetail ? (
        <CustomerDetail form={form} setForm={setForm} />
      ) : (
        <Calendar days={days} closedDays={closedDays} />
      )}
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
