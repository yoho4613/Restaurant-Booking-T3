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
  email: string;
  people: string;
  preorder: boolean;
}

const Booking: FC<BookingProps> = ({ days, closedDays }) => {
  const router = useRouter();
  const [customerDetail, setCustomerDetail] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
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
        localStorage.setItem(
          "bookingWithPreorder",
          JSON.stringify({ ...form, dateTime: date.dateTime, preorder: true })
        );
        router
          .push("/menu")
          .then((res) => res)
          .catch((err: Error) => console.log(err));
      } else if (withPreOrder === false) {
        sendForm(form);

        router
          .push("/")
          .then((res) => res)
          .catch((err: Error) => console.log(err));
      }
    }
  }, [date.dateTime, router, withPreOrder]);

  const sendForm = (form: Form) => {
    function isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    if (isValidEmail(form.email)) {
      addBooking({
        ...form,
        dateTime: date.dateTime!,
      });
    }
  };

  return (
    <div>
      {customerDetail ? (
        <CustomerDetail
          setOrderConfirmed={setOrderConfirmed}
          setForm={setForm}
          form={form}
          setDate={setDate}
          setCustomerDetail={setCustomerDetail}
        />
      ) : (
        <Calendar
          date={date}
          setDate={setDate}
          days={days}
          closedDays={closedDays}
          setCustomerDetail={setCustomerDetail}
          dayOff={days.filter((day) => !day.open).map((day) => day.dayOfWeek)}
        />
      )}
      {orderConfirmed && (
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

export default Booking;
