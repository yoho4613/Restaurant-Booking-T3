import React, { FC, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { now } from "~/constants/config";
import { formatISO, getDay, isBefore, isSameDay } from "date-fns";
import { isAfter } from "date-fns";
import { isToday } from "date-fns";
import ReactCalendar from "react-calendar";
import { prisma } from "../../server/db";
import { Day } from "@prisma/client";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import AddBookingForm from "~/components/Admin/AddBookingForm";

interface booking {
  id: string;
  createdAt: Date;
  name: string;
  people: string;
  mobile: string;
  email: string;
  preorder: boolean;
  dateTime: Date;
  canceled: boolean;
  tableId: string;
}

interface BookingProps {
  days: Day[];
  closedDays: string[];
}

const Booking: FC<BookingProps> = ({ days, closedDays }) => {
  const router = useRouter();
  const [openForm, setOpenForm] = useState(false);
  const [bookingCopy, setBookingCopy] = useState<booking[] | undefined>();
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [filteredBooking, setFilteredBooking] = useState<
    booking[] | null | false | undefined
  >(null);
  const [filter, setFilter] = useState<string>("today");
  const { data: bookings, refetch } = api.admin.getBookings.useQuery();
  const { data: findPreorders } = api.admin.getPreorders.useQuery(
    bookings?.map((booking) => booking.id) || []
  );
  const { mutate: cancel } = api.booking.cancelBooking.useMutation({
    onSuccess: () => {
      refetch()
        .then((res) => res)
        .catch((err: Error) => console.log(err));
    },
  });
  const { data: tables } = api.table.getTables.useQuery();

  const song = "notification.mp3";
  const icon = "https://via.placeholder.com/50x50";
  const title = "New Booking";
  const msg = "There's a new booking!";

  // useEffect(() => {
  //   setInterval(() => {
  //     refetch()
  //       .then((res) => res)
  //       .catch((err: Error) => console.log(err));
  //   }, 10000);
  // }, []);

  useEffect(() => {
    if (bookings && bookings.length) {
      if (bookingCopy) {
        if (bookingCopy.length < bookings.length) {
          const newBookings = findNewBooking(bookingCopy, bookings);
          notifyMe(newBookings);
          // if (newBookings.length) {
          //   console.log(newBookings);
          //   const tags: HTMLTableCellElement[] = []
          //   document.querySelectorAll("th").forEach((el) =>{
          //     console.log(el.textContent)
          //     if(newBookings.includes(el.textContent)) {
          //       tags.push(el)
          //     }
          //   }
          //   );
          //   console.log(tags)
          //   tags.map((tag) => {
          //     tag?.parentElement?.classList.add("blink_me");
          //     setTimeout(() => {
          //       tag?.parentElement?.classList.remove("blink_me");
          //     }, 3000);
          //   });
          // }
        }
      }
      filterBookings();
      setBookingCopy(bookings);
    }
  }, [bookings]);

  useEffect(() => {
    filterBookings();
  }, [filter]);

  const findNewBooking = (oldArr: booking[], newArr: booking[]) => {
    const oldArrIds = oldArr.map((el) => el.id);
    const newArrIds = newArr.map((el) => el.id);
    const bookingIds = newArrIds.filter((id) => !oldArrIds.includes(id));

    return newArr.filter((booking) => bookingIds.includes(booking.id));
  };

  const filterBookings = () => {
    if (bookings && bookings.length) {
      switch (filter) {
        case "all":
          setFilteredBooking(bookings);
          break;
        case "passed":
          setFilteredBooking(
            bookings.filter(
              (booking) =>
                isBefore(booking.dateTime, now.setHours(0, 0, 0, 0)) &&
                !isToday(booking.dateTime)
            )
          );
          break;
        case "today":
          setFilteredBooking(
            bookings.filter((booking) => isToday(booking.dateTime))
          );
          break;
        case "upcoming":
          setFilteredBooking(
            bookings.filter((booking) =>
              isAfter(booking.dateTime, now.setHours(0, 0, 0, 0))
            )
          );
          break;
        default:
          setFilteredBooking(
            bookings.filter(
              (book) =>
                book.name.toLowerCase().includes(filter.toLowerCase()) ||
                book.id.includes(filter) ||
                book.dateTime.toString().includes(filter) ||
                book.mobile.includes(filter) ||
                book.email.includes(filter)
            )
          );
          break;
      }
    }
  };

  const toggleHidden = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.target as HTMLButtonElement;

    const hiddenTag = button.nextElementSibling as HTMLElement;
    hiddenTag.classList.toggle("hidden");
  };

  const checkDatePassed = (date: Date) => {
    if (isToday(date)) {
      return "today";
    } else if (isBefore(date, now.setHours(0, 0, 0, 0))) {
      return "passed";
    } else {
      return "upcoming";
    }
  };

  const cancelBooking = (id: string) => {
    cancel({ id });
  };

  function notifyMe(bookings: booking[]) {
    if (!("Notification" in window)) {
      alert("This browser does not support Desktop notifications");
    }
    if (Notification.permission === "granted") {
      callNotify(title, msg, icon, bookings);
      return;
    }
    if (Notification.permission !== "denied") {
      Notification.requestPermission((permission) => {
        if (permission === "granted") {
          callNotify(title, msg, icon, bookings);
        }
      })
        .then((res) => res)
        .catch((err: Error) => console.log(err));
      return;
    }
  }

  function callNotify(
    title: string,
    msg: string,
    icone: string,
    bookings: booking[]
  ) {
    new Notification(title, { body: msg, icon: icone });
    new Audio(`/assets/${song}`)
      .play()
      .then((res) => res)
      .catch((err: Error) => console.log(err));
    toast((t) => (
      <div>
        <button
          onClick={() => toast.dismiss(t.id)}
          type="button"
          className="right-0 mb-2 mr-2 rounded-full bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          X
        </button>
        <br />
        <p className="font-bold">{msg}</p>
        {bookings.map((booking) => (
          <button
            key={booking.id}
            type="button"
            onClick={() => {
              router
                .push("/dashboard/booking")
                .then((res) => res)
                .catch((err: Error) => console.log(err));
            }}
          >
            <p>{booking.dateTime.toLocaleString()}</p>
            <p>{booking.name}</p>
            <p>{booking.people} people</p>
          </button>
        ))}
      </div>
    ));
  }

  return (
    <div>
      {openForm && (
        <div className="absolute left-0 top-0 z-10 rounded-md bg-gray-200 md:left-24 md:top-24">
          {/* <div className="text-right">
            <button
              onClick={() => setOpenForm(false)}
              type="button"
              className="right-0 mb-2 mr-2 rounded-full bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              X
            </button>
          </div> */}
          <AddBookingForm
            setOpenForm={setOpenForm}
            days={days}
            closedDays={closedDays}
          />
        </div>
      )}
      {openCalendar && (
        <div className="absolute left-0 top-0 z-10 rounded-md bg-gray-600 p-6 sm:left-1/3 sm:top-24">
          <button
            onClick={() => setOpenCalendar(false)}
            type="button"
            className="right-0 mb-2 mr-2 rounded-full bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            X
          </button>
          <ReactCalendar
            className="REACT-CALENDAR w-full p-2"
            view="month"
            tileDisabled={({ date }) => {
              const dayOfWeek = getDay(date);
              return (
                closedDays.includes(formatISO(date)) ||
                days
                  .filter((day) => !day.open)
                  .map((day) => day.dayOfWeek)
                  .includes(dayOfWeek)
              );
            }}
            onClickDay={(date) => {
              const time =
                bookings &&
                bookings
                  .find((book) => isSameDay(book.dateTime, date))
                  ?.dateTime.toString()
                  .slice(0, 15);
              setFilter(time || "");
              setOpenCalendar(false);
            }}
          />
        </div>
      )}

      <div className="relative overflow-x-auto">
        <div className="mb-2 mt-6 flex items-center justify-between p-4">
          <Toaster />
          <div className="ju flex w-full items-center">
            <label className="mr-2" htmlFor="filter">
              Filter
            </label>
            <select
              id="filter"
              name="filter"
              defaultValue="today"
              className=" block h-full w-1/3 appearance-none rounded-r border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight text-gray-700 focus:border-2 focus:border-gray-500 focus:bg-white focus:outline-none sm:rounded-r-none"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="passed">Past</option>
              <option value="today">Today</option>
              <option value="upcoming">Upcoming</option>
            </select>
            <button
              onClick={() => setOpenCalendar(true)}
              type="button"
              className="w-12 "
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"
                  fill="rgba(70,146,221,1)"
                ></path>
              </svg>
            </button>
          </div>

          <div className="relative flex w-1/3 ">
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
                setFilter(e.target.value);
              }}
            />
            <button
              onClick={() => setOpenForm(true)}
              className="w-32 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Add
            </button>
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
                Table Name
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
              <th scope="col" className="px-6 py-3">
                Cancel
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBooking &&
              tables &&
              filteredBooking.map((booking) => (
                <tr
                  key={booking.id}
                  className={`border-b bg-white  decoration-red-600 dark:border-gray-700 dark:bg-gray-800 ${
                    booking.canceled ? "line-through" : ""
                  }
                  ${
                    checkDatePassed(booking.dateTime) === "today"
                      ? "text-green-600"
                      : checkDatePassed(booking.dateTime) === "passed"
                      ? "text-red-600"
                      : "text-gray-700"
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
                  <td className="px-6 py-4">
                    {tables.find((table) => table.id === booking.tableId)?.name}
                  </td>
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
                        <button
                          className=" rounded-lg bg-slate-200 p-2"
                          onClick={toggleHidden}
                        >
                          View Detail
                        </button>
                        <div className="fixed left-1/2 top-1/2 hidden bg-slate-600 bg-opacity-60 p-6">
                          <button
                            className="mb-2 mr-2 rounded-full bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
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
                  <td className="px-6 py-4">
                    {booking.canceled ? (
                      <button className="cursor-text">Canceled</button>
                    ) : (
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        type="button"
                        className="rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Cancel
                      </button>
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

export async function getServerSideProps() {
  const days = await prisma.day.findMany();
  const closedDays = (await prisma.closedDay.findMany())?.map((day) =>
    formatISO(day.date)
  );
  return { props: { days, closedDays } };
}
