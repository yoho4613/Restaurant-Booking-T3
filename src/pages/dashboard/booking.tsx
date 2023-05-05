import React, { FC, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { now } from "~/constants/config";
import { isBefore } from "date-fns";
import { isAfter } from "date-fns";
import { isToday } from "date-fns";

interface booking {
  id: string;
  createdAt: Date;
  name: string;
  people: string;
  mobile: string;
  email: string;
  preorder: boolean;
  dateTime: Date;
}
interface Preorder {
  id: string;
  bookingId: string;
  item: string;
  quantity: string;
  createdAt: Date;
  updatedAt: Date;
}

const Booking: FC = ({}) => {
  const [booking, setBooking] = useState<booking[] | null | false>(null);
  const [preorders, setPreorders] = useState<Preorder[] | null>(null);
  const [filteredBooking, setFilteredBooking] = useState<
    booking[] | null | false | undefined
  >(null);
  const { data: bookings } = api.admin.getBookings.useQuery();
  const { data: findPreorders } = api.admin.getPreorders.useQuery(
    bookings?.map((booking) => booking.id) || []
  );

  useEffect(() => {
    if (bookings && bookings.length) {
      setBooking([...bookings]);
    }
  }, [bookings]);

  useEffect(() => {
    if (booking) {
      setFilteredBooking(
        [...booking].sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())
      );
      console.log(findPreorders);
    }
  }, [booking]);

  const toggleHidden = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.target as HTMLButtonElement;

    const hiddenTag = button.nextElementSibling as HTMLElement;
    hiddenTag.classList.toggle("hidden");
  };

  return (
    <div>
      <div className="relative overflow-x-auto">

        <div className="mb-2 mt-6 p-4 flex items-center justify-between">
          <div className="w-full flex items-center ju">
            <label className="mr-2" htmlFor="filter">Filter</label>
            <select
              id="filter"
              name="filter"
              className=" block h-full w-1/3 appearance-none rounded-r border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight text-gray-700 focus:border-2 focus:border-gray-500 focus:bg-white focus:outline-none sm:rounded-r-none"
              onChange={(e) => console.log(e.target.value)}
           >
              <option value="all">All</option>
              <option value="past">Past</option>
              <option value="today">Today</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-1/3 ">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search"
              onChange={(e) => {
                console.log(e.target.value);
                setFilteredBooking(
                  booking &&
                    booking.filter(
                      (book) =>
                        book.name
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase()) ||
                        book.id.includes(e.target.value) ||
                        book.dateTime.toString().includes(e.target.value) ||
                        book.mobile.includes(e.target.value) ||
                        book.email.includes(e.target.value)
                    )
                );
              }}
            />
          </div>
        </div>

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
            {filteredBooking &&
              filteredBooking.map((booking) => (
                <tr
                  key={booking.id}
                  className={`border-b bg-white  dark:border-gray-700 dark:bg-gray-800
                  ${
                    isBefore(booking.dateTime, now.setHours(0, 0, 0, 0))
                      ? "text-red-600"
                      : ""
                  }
                  ${isToday(booking.dateTime) ? "text-green-600" : ""}
                  ${
                    isAfter(booking.dateTime, now.setHours(0, 0, 0, 0))
                      ? "text-gray-700"
                      : ""
                  }
                  `}
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium dark:text-white"
                  >
                    {booking.id}
                  </th>
                  <td className="px-6 py-4">{booking.name}</td>
                  <td className="px-6 py-4">{booking.people}</td>
                  <td className="px-6 py-4 font-bold">
                    {booking.dateTime.toLocaleDateString("en-GB")}{" "}
                    {booking.dateTime.getHours() % 12 === 0
                      ? 12
                      : booking.dateTime.getHours() % 12}
                    :{booking.dateTime.getMinutes() < 10 ? "0" : ""}
                    {booking.dateTime.getMinutes()}
                    {booking.dateTime.getHours() >= 12 ? "PM" : "AM"}
                  </td>
                  <td className="px-6 py-4">{booking.mobile}</td>
                  <td className="px-6 py-4">{booking.email}</td>
                  <td className="px-6 py-4">
                    {booking.preorder ? (
                      <div>
                        <button onClick={toggleHidden}>View Detail</button>
                        <div className="fixed left-1/2 top-1/2 hidden bg-slate-600 bg-opacity-60 p-6">
                          <button
                            className=" p-2 text-xl font-extrabold text-white"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                              (
                                e.target as HTMLButtonElement
                              ).parentElement?.classList.add("hidden")
                            }
                          >
                            X
                          </button>
                          <ul className=" text-white">
                            {findPreorders?.map((preorder) => {
                              if (preorder.bookingId === booking.id) {
                                return (
                                  <li
                                    className=" mb-4 text-lg font-bold"
                                    key={preorder.id}
                                  >
                                    {preorder.item} - {preorder.quantity}
                                  </li>
                                );
                              }
                            })}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      "No"
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;
