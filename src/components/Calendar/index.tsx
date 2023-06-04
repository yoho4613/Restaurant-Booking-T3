import React, { FC, useState } from "react";
import ReactCalendar from "react-calendar";
import { format, formatISO, getDay, isAfter, isBefore, parse } from "date-fns";
import { DateType } from "@types";
import { getOpeningTimes, roundToNearestMinutes } from "~/utils/helpers";
import { Day } from "@prisma/client";
import { OPENING_HOURS_INTERVAL, now } from "~/constants/config";
import { api } from "~/utils/api";

interface CalendarProps {
  days: Day[];
  closedDays: string[];
  date: DateType;
  setDate: (date: any) => void;
  setCustomerDetail: React.Dispatch<React.SetStateAction<boolean>>;
  dayOff: number[];
}

const CalendarComponent: FC<CalendarProps> = ({
  date,
  setDate,
  days,
  closedDays,
  setCustomerDetail,
  dayOff,
}) => {
  const { data: promotions } = api.promotion.getPromotions.useQuery();
  // Determine if today is closed
  const today = days.find((day) => day.dayOfWeek === now.getDay());
  const rounded = roundToNearestMinutes(now, OPENING_HOURS_INTERVAL);
  const closing = parse(today!.closeTime, "kk:mm", now);
  const tooLate = !isBefore(rounded, closing);
  if (tooLate) closedDays.push(formatISO(new Date().setHours(0, 0, 0, 0)));

  const times = date.justDate && getOpeningTimes(date.justDate, days);

  const PromotionPopup = ({ day }: { day: Date }) => {
    const foundDay = promotions?.filter(
      (promotion) =>
        isBefore(day, promotion.endDate) && isAfter(day, promotion.startDate)
    );
    const [Popup, setPopup] = useState(false);

    return (
      <div className="w-4">
        {Popup && (
          <div className="absolute bottom-0 right-0 z-10 w-64 -translate-y-1/2 translate-x-full rounded-md border-2 border-emerald-400 bg-slate-400 p-4">
            <h4 className="text-white font-bold mb-4">Promotion</h4>
            {foundDay?.map((promotion) => (
              <div
                style={{ zIndex: 999 }}
                className="relative text-white "
                key={promotion.id}
              >
                <h5 className="mb-2">
                  - {promotion.name}
                </h5>
              </div>
            ))}
          </div>
        )}
        <div
          className="m-auto rounded-md bg-red-800"
          onMouseEnter={() => setPopup(true)}
          onMouseLeave={() => setPopup(false)}
        >
          <span className="text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"
                fill="rgba(255,255,255,1)"
              ></path>
            </svg>
          </span>
        </div>
      </div>
    );
  };

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
                  className={`border-2 bg-gray-200 p-2 ${
                    date.dateTime?.toString() === time.toString()
                      ? "border-red-600"
                      : ""
                  }`}
                  onClick={(e) => {
                    setDate((prev: DateType) => ({
                      ...prev,
                      dateTime: time,
                    }));
                    setCustomerDetail(true);
                    // e.currentTarget.classList.toggle("border-red-600")
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
          minDate={new Date()}
          className="REACT-CALENDAR relative p-2"
          view="month"
          tileDisabled={({ date }) => {
            const dayOfWeek = getDay(date);
            return (
              closedDays.includes(formatISO(date)) || dayOff.includes(dayOfWeek)
            );
          }}
          onClickDay={(date) => {
            setDate((prev: DateType) => ({ ...prev, justDate: date }));
          }}
          tileContent={(day) => {
            console.log(day);
            if (
              promotions?.find(
                (promotion) =>
                  isBefore(day.date, promotion.endDate) &&
                  isAfter(day.date, promotion.startDate)
              )
            )
              return (
                <div className="flex justify-end">
                  <PromotionPopup day={day.date} />
                </div>
              );
          }}
        />
      )}
    </div>
  );
};

export default CalendarComponent;
