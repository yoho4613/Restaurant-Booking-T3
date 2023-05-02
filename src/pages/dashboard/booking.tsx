import React, { FC, useEffect, useState } from "react";
import { api } from "~/utils/api";

interface BookingProps {}

const booking: FC<BookingProps> = ({}) => {
  const [booking, setBooking] = useState<
    | {
        id: string;
        createdAt: Date;
        name: string;
        people: string;
        mobile: string;
        email: string;
        preorder: boolean;
        dateTime: Date;
      }[]
    | null
    | false
  >(null);
  const { data: bookings } = api.admin.getBookings.useQuery(booking || []);

  useEffect(() => {
    console.log(bookings);
  }, [bookings]);

  
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Booking Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Table People
              </th>
              <th scope="col" className="px-6 py-3">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Preorder
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking) => (
              <tr
                key={booking.id}
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {booking.id}
                </th>
                <td className="px-6 py-4">{booking.name}</td>
                <td className="px-6 py-4">{booking.people}</td>
                <td className="px-6 py-4">{booking.dateTime.toString()}</td>
                <td className="px-6 py-4">{booking.mobile}</td>
                <td className="px-6 py-4">{booking.email}</td>
                <td className="px-6 py-4">{booking.preorder ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default booking;
