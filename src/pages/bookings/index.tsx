import React, { FC, useEffect, useState } from "react";

import { prisma } from "~/server/db";
import { formatISO } from "date-fns";
import Calendar from "~/components/Calendar";
import { Day } from "@prisma/client";
import CustomerDetail from "~/components/CustomerDetail";
import { DateType } from "@types";
import { api } from "~/utils/api";
import Confirmation from "~/components/Confirmation";
import { useRouter } from "next/router";

interface BookingProps {
  days: Day[];
  closedDays: string[];
}

export interface Form {
  name: string;
  mobile: string;
  email: string ;
  people: string;
  preorder: boolean;
}

const booking: FC<BookingProps> = ({ days, closedDays }) => {
  const router = useRouter();
  const [customerDetail, setCustomerDetail] = useState(false);
  const [form, setForm] = useState<Form>({
    name: "",
    mobile: "",
    email: "",
    people: "",
    preorder: false,
  });
  const [withPreOrder, setWithPreOrder] = useState<boolean | null>(null);
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });
  const { mutate: addBooking } = api.booking.addBooking.useMutation({});

  useEffect(() => {
    if (date.dateTime) {
      localStorage.setItem("selectedTime", date.dateTime.toISOString());
      if (withPreOrder === true) {
        router.push("/menu");
      } else if (withPreOrder === false) {
        sendForm(form);
        router.push("/");
      }
    }
  }, [date.dateTime, router, withPreOrder]);

  const sendForm = async (form: Form) => {
    function isValidEmail(email: string): boolean {
      const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    if (isValidEmail(form.email)) {
      await addBooking({
        ...form,
        dateTime: date.dateTime!
      });
    }
  };

  return (
    <div>
      {!customerDetail ? (
        <CustomerDetail
          setCustomerDetail={setCustomerDetail}
          setForm={setForm}
          form={form}
        />
      ) : (
        <Calendar
          date={date}
          setDate={setDate}
          days={days}
          closedDays={closedDays}
        />
      )}
      {date.dateTime && (
        <Confirmation
          onCancel={() => {
            setDate({ ...date, dateTime: null });
          }}
          onConfirm={setWithPreOrder}
          message="Would you like to pre-order food?"
        />
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
