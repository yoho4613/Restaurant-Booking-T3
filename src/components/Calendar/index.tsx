import React, { Dispatch, FC, SetStateAction, useState } from "react";
import ReactCalendar from "react-calendar";
import { add, format, getTime } from "date-fns";
import { INTERVAL, STORE_CLISING_TIME, STORE_OPENING_TIME } from "~/constants/config";
import { DateType } from "@types";

interface IndexProps {
  date: DateType
  setDate: Dispatch<SetStateAction<DateType>>
}

const index: FC<IndexProps> = ({date, setDate}) => {

  const getTimes = () => {
    if (!date?.justDate) return;

    const { justDate } = date;

    const beginning = add(justDate, { hours: STORE_OPENING_TIME });
    const end = add(justDate, { hours: STORE_CLISING_TIME });
    const interval = INTERVAL; //in minutes

    const times = [];
    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }
    return times;
  };

  const times = getTimes();
  console.log(date?.dateTime)

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {date?.justDate ? (
        <div className="flex gap-4">
          {times?.map((time, i) => (
            <div key={`tim-${i}`} className="bg-gray-1090 rounded-sm p-2">
              <button
                type="button"
                onClick={() =>
                  setDate((prev: any) => ({ ...prev, dateTime: time }))
                }
              >
                {format(time, "kk:mm")}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <ReactCalendar
          minDate={new Date()}
          className="REACT-CALENDAR p-2"
          view="month"
          onClickDay={(date) =>
            setDate((prev: DateType | any) => ({ ...prev, justDate: date }))
          }
        />
      )}
    </div>
  );
};

export default index;
