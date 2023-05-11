import { Booking } from "@types";
import { isSameWeek } from "date-fns";
import React, { FC, useEffect, useState } from "react";

interface BookingProps {
  bookings: Booking[] | [];
  thisWeekBooking: Booking[] | [];
}

const Booking: FC<BookingProps> = ({ bookings, thisWeekBooking }) => {
 


  return (
    <div>
      <p>
        You have <strong>{thisWeekBooking.length}</strong> registered bookings.
      </p>
      <p>
        There are{" "}
        <strong>
          {thisWeekBooking.filter((booking) => booking.preorder).length}
        </strong>{" "}
        bookings have preorder
      </p>
    </div>
  );
};

export default Booking;
