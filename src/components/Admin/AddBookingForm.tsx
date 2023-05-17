import React, { FC, useState } from "react";
import { api } from "~/utils/api";
import { DateType } from "@types";
import { Day } from "@prisma/client";
import CalendarComponent from "../Calendar";
import { Form } from "~/pages/booking";

interface AddBookingFormProps {
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  days: Day[];
  closedDays: string[];
}

const AddBookingForm: FC<AddBookingFormProps> = ({
  setOpenForm,
  days,
  closedDays,
}) => {
  const { mutate: addBooking } = api.booking.addBooking.useMutation({
    onSuccess: () => setOpenForm(false),
    onError: () => setWarning(true)
  });
  const [warning, setWarning] = useState(false)
  const [form, setForm] = useState<Form>({
    name: "",
    mobile: "",
    email: "",
    people: "",
    preorder: false,
    // tableId hard coded
    tableId: 'clhkg2kho406w03qor8m18nqi',
  });
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });
  const [customerDetail, setCustomerDetail] = useState(true);
  const sendForm = (form: Form) => {
    function isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    if (isValidEmail(form.email)) {
      addBooking({
        ...form,
        dateTime: date.dateTime!,
      })
    } else {
      setWarning(true)
    }
  };
  return (
    <div className={`p-6 ${warning ? "border-2 border-red-500" : ""}`}>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date
              </label>
              <div className="mt-2">
                <CalendarComponent
                  date={date}
                  setDate={setDate}
                  days={days}
                  closedDays={closedDays}
                  setCustomerDetail={setCustomerDetail}
                  dayOff={days
                    .filter((day) => !day.open)
                    .map((day) => day.dayOfWeek)}
                />
              </div>
            </div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Customer Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a correct email address where customer can receive email.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className=" block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className=" block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="contact-number"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contact Number (optional)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="contact-number"
                    id="contact-number"
                    autoComplete="phone"
                    onChange={(e) => setForm({...form, mobile: e.target.value})}
                    className=" block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="people"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  People
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="people"
                    id="people"
                    autoComplete="number"
                    onChange={(e) => setForm({...form, people: e.target.value})}
                    className=" block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
          {warning && <p className="text-red-500">Something&apos;s wrong. Please check the form and try again.</p>}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => {
              setOpenForm(false);
            }}
            className=" rounded-md bg-red-600 px-3 py-2  text-sm font-semibold leading-6 text-white hover:bg-red-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              sendForm(form);
            }}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookingForm;
