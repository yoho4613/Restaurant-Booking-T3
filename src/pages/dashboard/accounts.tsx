import { User } from "@prisma/client";
import React, { FC, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { prisma } from "~/server/db";
import { RoleEnumType } from "@prisma/client";

const Accounts: FC = ({}) => {
  const { data: users, refetch } = api.user.getAllUsers.useQuery();
  const [popup, setPopup] = useState(true);

  const Popup = ({ user, label }: { user: User | null; label: string }) => {
    const [form, setForm] = useState({
      email: "",
      password: "",
      name: "",
      role: "",
    });
    const [roles, setRoles] = useState(Object.values(RoleEnumType));

    return (
      <div
        className="fixed h-screen w-screen p-6 z-10"
        style={{ background: "rgba(0, 0, 0, 0.4)" }}
      >
        <div className="m-auto w-2/3 rounded-md bg-white p-6 ">
          <h2 className="mb-6 text-center text-2xl font-bold">{label} Table</h2>
          <form>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Table Name
              </label>
              <input
                type="text"
                id="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Table 9"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                value={form.name}
                required
              />
            </div>
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Location
            </label>
            {/* <select
              id="location"
              className="mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              defaultValue={form.location}
            >
              <option disabled value={form.location}>
                Choose a location
              </option>
              {locations.map((location) => (
                <option
                  key={location}
                  selected={Boolean(form.location === location)}
                  value={location}
                >
                  {location}
                </option>
              ))}
            </select> */}
            <div className="mb-6">
              <label
                htmlFor="capacity"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Table Capacity
              </label>
              <input
                type="number"
                id="capacity"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="6"
                // onChange={(e) =>
                //   setForm({ ...form, capacity: Number(e.target.value) })
                // }
                // value={form.capacity}
                required
              />
            </div>
            <div className="flex justify-between">
              <div>
                <button
                  type="submit"
                  className="cursor-pointer rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  // onClick={submitForm}
                >
                  {label}
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                  onClick={() => setPopup(false)}
                >
                  Cancel
                </button>
              </div>
              {user && (
                <div>
                  <button
                    type="button"
                    className="mb-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    // onClick={() => {
                    //   deleteTable({
                    //     id: table.id,
                    //   });
                    // }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      {popup && <Popup user={null} label="" />}
      <div className="p-6">
        <div>
          <h1 className="mb-6 text-2xl font-bold">Manage Accounts</h1>
        </div>
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            className="rounded-md bg-blue-600 px-3 py-2  text-sm font-semibold leading-6 text-white hover:bg-blue-700"
          >
            Add User
          </button>
        </div>
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Registered At
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Approved by
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-900">
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                {users &&
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b bg-white dark:border-gray-700 dark:bg-gray-900"
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        {user.role}
                      </th>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.createdAt.toString()}</td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;
