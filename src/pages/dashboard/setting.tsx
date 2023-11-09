import Link from "next/link";
import React, { FC } from "react";



const Setting: FC = ({}) => {
  return (
    <div className="w-screen h-screen flex items-center">
      <div className="flex flex-col md:flex-row justify-around w-full">
        <Link
          href="/dashboard/accounts"
          className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Manage Admin Accounts
        </Link>
        <Link
          href="/dashboard/promotion"
          className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Manage Promotions
        </Link>
        <Link
          href="/dashboard/manage-table"
          type="button"
          className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Manage Tables
        </Link>
      </div>
    </div>
  );
};

export default Setting;
