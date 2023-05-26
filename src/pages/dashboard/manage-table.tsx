import { Tables } from "@prisma/client";
import React, { FC, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { api } from "~/utils/api";

const ManageTable: FC = ({}) => {
  const { data: tables, refetch } = api.table.getTables.useQuery();
  const [locations, setLocations] = useState<string[] | []>([]);
  const [popup, setPopup] = useState<boolean | string>(false);
  const [selectedTable, setSelectedTable] = useState<Tables | null>(null);

  useEffect(() => {
    if (tables) {
      const removeDuplication = new Set(tables.map((table) => table.location));
      setLocations([...removeDuplication]);
    }
    console.log(locations);
  }, [tables]);

  const Popup = ({
    table,
    label,
  }: {
    table: Tables | null;
    label: string | boolean;
  }) => {
    const { mutate: addTable } = api.table.addTable.useMutation({
      onSuccess: () => {
        toast.success("Table successfully added");
        refetch().then(res => res).catch((err:Error) => console.log(err.message));
      },
    });
    const { mutate: updateTable } = api.table.updateTable.useMutation({
      onSuccess: () => {
        toast.success("Table successfully updated");
        refetch().then(res => res).catch((err:Error) => console.log(err.message));
      },
    });
    const [form, setForm] = useState({
      name: "",
      location: "",
      capacity: 0,
    });

    useEffect(() => {
      if (table)
        setForm({
          name: table?.name,
          location: table?.location,
          capacity: table?.capacity,
        });
    }, [table]);

    const submitForm = () => {
      if (label === "Add") {
        addTable({
          ...form,
        });
      } else if (label === "Update") {
        if (table)
          updateTable({
            ...form,
            id: table.id,
          });
      }
      setPopup(false);
    };

    return (
      <div
        className="fixed h-screen w-screen p-6"
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
            <select
              id="location"
              className="mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            >
              <option disabled selected>
                Choose a location
              </option>
              {locations.map((location) => (
                <option key={location} selected={Boolean(form.location)} value={location}>
                  {location}
                </option>
              ))}
            </select>
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
                onChange={(e) =>
                  setForm({ ...form, capacity: Number(e.target.value) })
                }
                value={form.capacity}
                required
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={submitForm}
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
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      <Toaster />
      {popup && <Popup label={popup} table={selectedTable} />}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h1 className="mb-6 text-3xl font-bold">Manage Tables</h1>
          <button
            type="button"
            className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              setSelectedTable(null);
              setPopup("Add");
            }}
          >
            Add Table
          </button>
        </div>

        {locations &&
          locations.map((location) => (
            <div
              key={location}
              className="mb-6 w-full rounded-md bg-slate-200 p-6"
            >
              <h3 className="mb-4 text-xl font-bold">{location}</h3>
              <div className="justify-evenly rounded-md">
                {tables &&
                  tables
                    .filter((table) => table.location === location)
                    .map((table) => (
                      <button
                        key={table.id}
                        type="button"
                        className="mb-2 mr-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => {
                          setSelectedTable(table);
                          setPopup("Update");
                        }}
                      >
                        {table.name}{" "}
                        <span className="font-light">({table.capacity})</span>
                      </button>
                    ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ManageTable;
