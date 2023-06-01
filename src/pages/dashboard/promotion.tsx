import { isAfter, isBefore, isSameDay } from "date-fns";
import React, { FC, useEffect, useState } from "react";
import Calendar from "react-calendar";

interface Form {
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
}
const Promotion: FC = ({}) => {
  const [form, setForm] = useState<Form>({
    name: "",
    description: "",
    startDate: null,
    endDate: null,
  });

  return (
    <>
      <div className="p-6">
        <h1 className="mb-6 mt-6 text-center text-3xl font-bold">
          Manage Promotions
        </h1>
        <div className="mx-auto flex max-w-xl flex-col gap-2">
          <input
            name="name"
            className="h-12 rounded-sm border-none bg-gray-200 p-2"
            type="text"
            placeholder="promotion name"
            onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
            }
            value={form.name}
          />

          <textarea
            name="description"
            className=" rounded-sm border-none bg-gray-200 p-2"
            rows={8}
            placeholder="promotion description..."
            onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            value={form.description}
          />

          <div className="mb-6 mt-6 h-full items-center justify-center sm:flex">
            <div className="text-center ">
              <span className="font-bold">Period</span>
              <Calendar
                className="REACT_CALENDAR"
                tileClassName={({ date }) => {
                  if (isSameDay(form.startDate || 0, date) || isSameDay(form.endDate || 0, date)) {
                    return "highlight selected";
                  } else if (form.startDate && form.endDate) {
                    if(isAfter(date, form.startDate) && isBefore(date, form.endDate)) {
                      return "selected"
                    }
                  }
                }}
                onClickDay={(date) => {
                  if (form.endDate !== null || form.startDate === null) {
                    setForm({ ...form, startDate: date, endDate: null });
                  } else {
                    setForm({ ...form, endDate: date });
                  }
                }}
              />
            </div>
          </div>

          <button
            className="h-12 rounded-sm bg-gray-200 disabled:cursor-not-allowed"
            disabled={!form.name || !form.description || !form.startDate || !form.endDate}
            onClick={() => {
             
            }}
          >
            Add Promotion
          </button>
        </div>

        <div className="mx-auto mt-12 max-w-7xl">
          <p className="text-lg font-medium">Avilable Promotions:</p>
          <div className=" mb-12 mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8 ">
            {/* On Live Promotion */}
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl">
          <p className="text-lg font-medium">Ended Promotions:</p>
          <div className=" mb-12 mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8 ">
            {/* Ended Promotion */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Promotion;
