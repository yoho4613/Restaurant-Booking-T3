import { Booking } from "@types";
import { isSameWeek, isThisMonth, isThisWeek, isThisYear } from "date-fns";
import Link from "next/link";

import React, { FC, useEffect, useState } from "react";
import Bookings from "~/components/Admin/Booking";
import DayOfWeekRatio from "~/components/Admin/DayOfWeekRatio";
import Statistics from "~/components/Admin/Statistics";
import { api } from "~/utils/api";

const Dashboard: FC = ({}) => {
  const { data: bookings } = api.admin.getBookings.useQuery<Booking | []>();
  const [thisWeekBooking, setThisWeekBooking] = useState<Booking[] | []>([]);
  const [chartName, setChartName] = useState("weekly");
  const [filteredBooking, setFilteredBooking] = useState<Booking[] | []>([]);

  // Booking Rate by date

  useEffect(() => {
    console.log(bookings);
    if (bookings?.length) {
      setThisWeekBooking(
        bookings.filter((booking) => isSameWeek(booking.dateTime, new Date()))
      );
    }
  }, [bookings]);

  useEffect(() => {
    if (bookings) {
      switch (chartName) {
        case "weekly":
          setFilteredBooking(
            bookings?.filter((booking) => isThisWeek(booking.dateTime))
          );
          break;
        case "monthly":
          setFilteredBooking(
            bookings?.filter((booking) => isThisMonth(booking.dateTime))
          );
          break;
        case "yealy":
          setFilteredBooking(
            bookings?.filter((booking) => isThisYear(booking.dateTime))
          );
          break;
        case "total":
          setFilteredBooking([...bookings]);

          break;

        default:
          setFilteredBooking([...bookings]);
          break;
      }
    }
  }, [chartName, bookings]);

  function getLastWeeksDate() {
    const now = new Date();

    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
  }

  return (
    <div className="flex p-6 h-screen flex-col">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="mt-4 mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">This Week</h2>
            <div className="mt-2 text-sm text-gray-600">
              <Bookings
                bookings={bookings || []}
                thisWeekBooking={thisWeekBooking}
              />
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">Revenue</h2>
            <div className="mt-2 text-sm text-gray-600">
              <p>Your total revenue</p>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">Orders</h2>
            <div className="mt-2 text-sm text-gray-600">
              <p>You have 5678 orders this month.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Statistics bookings={bookings || []} />
      </div>
      
      <div>
        <div className="ml-6 flex">
          <button
            onClick={() => setChartName("weekly")}
            className="mr-2 rounded border border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Weekly
          </button>
          <button
            onClick={() => setChartName("monthly")}
            className="mr-2 rounded border border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Monthly
          </button>
          <button
            onClick={() => setChartName("yearly")}
            className="mr-2 rounded border border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Yearly
          </button>
          <button
            onClick={() => setChartName("total")}
            className="mr-2 rounded border border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Total
          </button>
        </div>
        <h2 className="text-center text-2xl font-bold">{chartName.toUpperCase()}</h2>
        <DayOfWeekRatio bookings={filteredBooking || []} />
      </div>

      <footer className="bg-gray-800 py-2 text-white">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <div>© 2023 JH Limited.</div>
            <div>Made with by Jiho Park</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
