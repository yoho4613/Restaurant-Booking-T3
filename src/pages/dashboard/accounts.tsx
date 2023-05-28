import { User } from "@prisma/client";
import React, { FC, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { prisma } from "~/server/db";
import { RoleEnumType } from "@prisma/client";
import { Toaster, toast } from "react-hot-toast";
import Confirmation from "~/components/Confirmation";

interface Form {
  email: string;
  password: string;
  name: string;
  role: RoleEnumType;
  verified: boolean;
}
const Accounts: FC = ({}) => {
  const { data: users, refetch } = api.user.getAllUsers.useQuery();
  const [popup, setPopup] = useState<boolean | string>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const Popup = ({
    user,
    label,
  }: {
    user: User | null;
    label: string | boolean;
  }) => {
    const { mutate: addUser, isError } = api.user.signupUser.useMutation({
      onSuccess: () => {
        toast.success("User successfully added");
        setPopup(false);
        refetch()
          .then((res) => res)
          .catch((err: Error) => console.log(err.message));
      },
    });
    const { mutate: deleteUser } = api.user.deleteUser.useMutation({
      onSuccess: () => {
        toast.success("User successfully deleted");
        setPopup(false);
        refetch()
          .then((res) => res)
          .catch((err: Error) => console.log(err.message));
      },
    });
    const { mutate: updateUser } = api.user.updateUser.useMutation({
      onSuccess: () => {
        toast.success("User successfully updated");
        setPopup(false);
        refetch()
          .then((res) => res)
          .catch((err: Error) => console.log(err.message));
      },
    });
    const [form, setForm] = useState<Form>({
      email: "",
      password: "",
      name: "",
      role: "staff" as RoleEnumType,
      verified: false,
    });
    const [roles, setRoles] = useState(RoleEnumType);
    const [confirm, setConfirm] = useState<boolean | null>(null);
    const [confirmPopup, setConfirmPopup] = useState(false);

    useEffect(() => {
      if (user) {
        setForm({
          ...form,
          name: user.name,
          email: user.email,
          role: user.role as RoleEnumType,
          verified: false,
        });
      }
    }, []);

    useEffect(() => {
      if (confirm !== null && user) {
        if (confirm) {
          deleteUser({ id: user.id });
          setConfirmPopup(false);
        }
      }
    }, [confirm]);

    const submitForm = () => {
      if (label === "Add") {
        addUser({
          ...form,
        });
      } else if (label === "Update") {
        if (user)
          updateUser({
            id: user.id,
            ...form,
          });
      }
    };

    return (
      <div
        className="fixed z-10 h-screen w-screen p-6"
        style={{ background: "rgba(0, 0, 0, 0.4)" }}
      >
        {confirm && (
          <Confirmation
            message="Are you sure you want to delete this user?"
            optionOne="Confirm"
            optionTwo="Cancel"
            onCancel={() => setConfirmPopup(false)}
            onConfirm={setConfirm}
          />
        )}
        <div className="m-auto w-2/3 rounded-md bg-white p-6 ">
          <h2 className="mb-6 text-center text-2xl font-bold">{label} Table</h2>
          <form>
            <p className="pb-1 text-sm text-red-600">
              {isError && "Invalid information"}
            </p>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="John Wick"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                value={form.name}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="john@email.com"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                value={form.email}
                required
              />
            </div>
            {!user && (
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="*******"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  value={form.password}
                  required
                />
              </div>
            )}
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Role
            </label>
            <select
              id="location"
              className="mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={(e) =>
                setForm({ ...form, role: e.target.value as RoleEnumType })
              }
              defaultValue="staff"
            >
              <option disabled value={form.role}>
                Choose a Role
              </option>
              {Object.values(roles).map((role) => (
                <option
                  key={role}
                  selected={Boolean(form.role === role)}
                  value={role}
                >
                  {role}
                </option>
              ))}
            </select>
            <div className="flex justify-between">
              <div>
                <button
                  type="button"
                  className="cursor-pointer rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={submitForm}
                >
                  {label}
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                  onClick={() => {
                    setPopup(false);
                    setSelectedUser(null);
                  }}
                >
                  Cancel
                </button>
              </div>
              {user && (
                <div>
                  <button
                    type="button"
                    className="mb-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => {
                      setConfirm(true);
                    }}
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
      {popup && <Popup user={selectedUser} label={popup} />}
      <div className="p-6">
        <Toaster />
        <div>
          <h1 className="mb-6 text-2xl font-bold">Manage Accounts</h1>
        </div>
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            className="rounded-md bg-blue-600 px-3 py-2  text-sm font-semibold leading-6 text-white hover:bg-blue-700"
            onClick={() => {
              setPopup("Add");
            }}
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
                    Last Login
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
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
                      <td className="px-6 py-4 font-bold">
                        {user.createdAt.toLocaleDateString("en-GB")}{" "}
                        {user.createdAt.getHours() % 12 === 0
                          ? 12
                          : user.createdAt.getHours() % 12}
                        :{user.createdAt.getMinutes() < 10 ? "0" : ""}
                        {user.createdAt.getMinutes()}
                        {user.createdAt.getHours() >= 12 ? "PM" : "AM"}
                      </td>
                      <td className="px-6 py-4 font-bold">
                        {user.lastLogin.toLocaleDateString("en-GB")}{" "}
                        {user.lastLogin.getHours() % 12 === 0
                          ? 12
                          : user.lastLogin.getHours() % 12}
                        :{user.lastLogin.getMinutes() < 10 ? "0" : ""}
                        {user.lastLogin.getMinutes()}
                        {user.lastLogin.getHours() >= 12 ? "PM" : "AM"}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                          onClick={() => {
                            setSelectedUser(user);
                            setPopup("Update");
                          }}
                        >
                          Edit
                        </button>
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
