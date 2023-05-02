import { useRouter } from "next/router";
import React, { FC } from "react";
import { api } from "~/utils/api";

interface AdminNavBarProps {}

const AdminNavBar: FC<AdminNavBarProps> = ({}) => {
  const router = useRouter();
  const { mutate: logout } = api.admin.logout.useMutation({
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="/assets/logo.jpg" alt="Logo" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                >
                  Dashboard
                </a>
                <a
                  href="/dashboard/opening"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Opening Hours
                </a>
                <a
                  href="/dashboard/menu"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Menu
                </a>
                <a
                  href="/dashboard/booking"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Bookings
                </a>
              </div>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              <a
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Settings
              </a>
              <button
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => 
                  logout()}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;
