import Link from "next/link";

import React, { FC } from "react";




const dashboard: FC = ({}) => {
  
  // return (
  //   <div className="flex h-screen w-full items-center justify-center gap-8 font-medium">
  //     <Link className="rounded-md bg-gray-100 p-2" href="/dashboard/opening">
  //       Opening Hours
  //     </Link>
  //     <Link className="rounded-md bg-gray-100 p-2" href="/dashboard/menu">
  //       Menu
  //     </Link>
  //   </div>
  // );

  return (
    <div className="flex h-screen flex-col">
      <main className="flex-grow">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900">Booking</h2>
                <div className="mt-2 text-sm text-gray-600">
                  <p>You have 1234 registered bookings.</p>
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
