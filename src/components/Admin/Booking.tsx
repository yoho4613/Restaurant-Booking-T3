import { Booking } from "@types";
import { isSameWeek } from "date-fns";
import React, { FC, useEffect, useState } from "react";
import { api } from "~/utils/api";

interface BookingProps {}

const Booking: FC<BookingProps> = ({}) => {
  const { data: bookings } = api.admin.getBookings.useQuery<Booking | []>();
  const [weekBookings, setWeekBookings] = useState<Booking[] | []>([])
  useEffect(() => {
    console.log(bookings)
    if(bookings?.length) {
      setWeekBookings(bookings.filter((booking) => isSameWeek(booking.dateTime, new Date())))
    }
  }, [bookings])

  useEffect(() => {
    console.log(weekBookings)
  }, [weekBookings])
  return <div>
    <p>
      You have <strong>{weekBookings.length}</strong> registered bookings.
    </p>
    <p>There are <strong>{weekBookings.filter((booking) => booking.preorder).length}</strong> bookings have preorder</p>

    </div>;
};

export default Booking;
