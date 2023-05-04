import React, { FC } from "react";
import ReactCalendar from "react-calendar";
import { format, formatISO, isBefore, parse } from "date-fns";
import { DateType } from "@types";
import { getOpeningTimes, roundToNearestMinutes } from "~/utils/helpers";
import { Day } from "@prisma/client";
import { OPENING_HOURS_INTERVAL, now } from "~/constants/config";

interface CalendarProps {
  days: Day[];
  closedDays: string[];
  date: DateType;
  setDate: (date: any) => void;
  setCustomerDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalendarComponent: FC<CalendarProps> = ({
  date,
  setDate,
  days,
  closedDays,
  setCustomerDetail,
}) => {
  // Determine if today is closed
  const today = days.find((day) => day.dayOfWeek === now.getDay());
  const rounded = roundToNearestMinutes(now, OPENING_HOURS_INTERVAL);
  const closing = parse(today!.closeTime, "kk:mm", now);
  const tooLate = !isBefore(rounded, closing);
  if (tooLate) closedDays.push(formatISO(new Date().setHours(0, 0, 0, 0)));

  const times = date.justDate && getOpeningTimes(date.justDate, days);
  console.log(times)
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {date?.justDate ? (
        <>
          <div>
            <button
              onClick={() => {
                setDate(() => ({ justDate: null, dateTime: null }));
              }}
              type="button"
              className="mb-6 mr-2 inline-flex items-center rounded-lg border border-blue-700 p-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5 rotate-180 transform"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-2">Go Back</span>
            </button>
          </div>
          <div className="flex w-64 flex-wrap gap-4">
            {times?.map((time, i) => (
              <div key={`tim-${i}`} className=" bg-gray-1090 rounded-sm p-2">
                <button
                  type="button"
                  className="bg-gray-200 p-2"
                  onClick={() => {
                    setDate((prev: DateType) => ({
                      ...prev,
                      dateTime: time,
                    }));
                    setCustomerDetail(true);
                  }}
                >
                  {format(time, "kk:mm")}
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <ReactCalendar
          minDate={now}
          className="REACT-CALENDAR p-2"
          view="month"
          tileDisabled={({ date }) => closedDays.includes(formatISO(date))}
          onClickDay={(date) =>
            setDate((prev: DateType) => ({ ...prev, justDate: date }))
          }
        />
      )}
    </div>
  );
};

export default CalendarComponent;
