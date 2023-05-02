import React, { FC, useEffect, useState } from "react";
import ReactCalendar from "react-calendar";
import { format, formatISO, isBefore, parse } from "date-fns";
import { DateType } from "@types";
import { useRouter } from "next/router";
import { getOpeningTimes, roundToNearestMinutes } from "~/utils/helpers";
import { Day } from "@prisma/client";
import { OPENING_HOURS_INTERVAL, now } from "~/constants/config";

interface CalendarProps {
  days: Day[];
  closedDays: string[];
  date: DateType;
  setDate: (date: any) => void;
}

const CalendarComponent: FC<CalendarProps> = ({
  date,
  setDate,
  days,
  closedDays,
}) => {
  const router = useRouter();

  // Determine if today is closed
  const today = days.find((day) => day.dayOfWeek === now.getDay());
  const rounded = roundToNearestMinutes(now, OPENING_HOURS_INTERVAL);
  const closing = parse(today!.closeTime, "kk:mm", now);
  const tooLate = !isBefore(rounded, closing);
  if (tooLate) closedDays.push(formatISO(new Date().setHours(0, 0, 0, 0)));

  const times = date.justDate && getOpeningTimes(date.justDate, days);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {date?.justDate ? (
        <div className="flex w-64 flex-wrap gap-4">
          {times?.map((time, i) => (
            <div key={`tim-${i}`} className=" bg-gray-1090 rounded-sm p-2">
              <button
                type="button"
                className="bg-gray-200 p-2"
                onClick={() =>
                  setDate((prev: DateType | any) => ({
                    ...prev,
                    dateTime: time,
                  }))
                }
              >
                {format(time, "kk:mm")}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <ReactCalendar
          minDate={now}
          className="REACT-CALENDAR p-2"
          view="month"
          tileDisabled={({ date }) => closedDays.includes(formatISO(date))}
          onClickDay={(date) =>
            setDate((prev: DateType | any) => ({ ...prev, justDate: date }))
          }
        />
      )}
     
    </div>
  );
};

export default CalendarComponent;
