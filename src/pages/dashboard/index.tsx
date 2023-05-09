import Link from "next/link";

import React, { FC } from "react";
import Booking from "~/components/Admin/Booking";
import DayOfWeekRatio from "~/components/Admin/DayOfWeekRatio";




const dashboard: FC = ({}) => {
  

  // Booking Rate by date

  return (
    <div className="flex h-screen flex-col">
      <main className="flex-grow">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900">This Week</h2>
                <div className="mt-2 text-sm text-gray-600">
                  <Booking />
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
        </div>
        <div>
          <DayOfWeekRatio />
        </div>
      </main>
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

export default dashboard;
