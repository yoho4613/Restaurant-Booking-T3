import TimeSelector from "@components/TimeSelector";
import { Switch } from "@headlessui/react";
import { Day } from "@prisma/client";
import { formatISO } from "date-fns";
import { type FC, useState, ChangeEvent } from "react";
import { Calendar } from "react-calendar";
import toast, { Toaster } from "react-hot-toast";
import { capitalize, classNames, weekdayIndexToName } from "~/utils/helpers";
import { api } from "~/utils/api";
import { prisma } from "../../server/db";

interface OpeningProps {
  days: Day[];
}

const Opening: FC<OpeningProps> = ({ days }) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [openingHrs, setOpeningHrs] = useState([
    {
      name: "sunday",
      openTime: days[0]!.openTime,
      closeTime: days[0]!.closeTime,
      open: days[0]!.open,
    },
    {
      name: "monday",
      openTime: days[1]!.openTime,
      closeTime: days[1]!.closeTime,
      open: days[1]!.open,
    },
    {
      name: "tuesday",
      openTime: days[2]!.openTime,
      closeTime: days[2]!.closeTime,
      open: days[2]!.open,
    },
    {
      name: "wednesday",
      openTime: days[3]!.openTime,
      closeTime: days[3]!.closeTime,
      open: days[3]!.open,
    },
    {
      name: "thursday",
      openTime: days[4]!.openTime,
      closeTime: days[4]!.closeTime,
      open: days[4]!.open,
    },
    {
      name: "friday",
      openTime: days[5]!.openTime,
      closeTime: days[5]!.closeTime,
      open: days[5]!.open,
    },
    {
      name: "saturday",
      openTime: days[6]!.openTime,
      closeTime: days[6]!.closeTime,
      open: days[6]!.open,
    },
  ]);

  const { mutate: saveOpeningHrs, isLoading } =
    api.opening.changeOpeningHours.useMutation({
      onSuccess: () => toast.success("Opening hours saved"),
      onError: () => toast.error("Something went wrong"),
    });

  const { mutate: closeDay } = api.opening.closeDay.useMutation({
    onSuccess: () => {
      refetch()
        .then((res) => res)
        .catch((err) => console.log(err));
      toast.success("Successfully updated closed day");
    },
  });
  const { mutate: openDay } = api.opening.openDay.useMutation({
    onSuccess: () => {
      refetch()
        .then((res) => res)
        .catch((err) => console.log(err));
      toast.success("Successfully updated opened day");
    },
  });
  const { data: closedDays, refetch } = api.opening.getClosedDays.useQuery();

  const dayIsClosed =
    selectedDate && closedDays?.includes(formatISO(selectedDate));

  // Curried for easier usage
  function _changeTime(day: Day) {
    return function (time: string, type: "openTime" | "closeTime") {
      const index = openingHrs.findIndex(
        (x) => x.name === weekdayIndexToName(day.dayOfWeek)
      );
      const newOpeningHrs = [...openingHrs];
      newOpeningHrs[index]![type] = time;
      setOpeningHrs(newOpeningHrs);
    };
  }

  const changeDayOff = (e: ChangeEvent<HTMLInputElement>, day: Day) => {
    const index = openingHrs.findIndex(
      (x) => x.name === weekdayIndexToName(day.dayOfWeek)
    );
    let newOpeningHrs;
    if (e.target.checked) {
      newOpeningHrs = openingHrs.map((day, i) =>
        i === index ? { ...day, open: false } : day
      );
    } else {
      newOpeningHrs = openingHrs.map((day, i) =>
        i === index ? { ...day, open: true } : day
      );
    }
    setOpeningHrs(newOpeningHrs);
  };

  return (
    <div className="mx-auto max-w-xl">
      <Toaster />
      <div className="mt-6 flex justify-center gap-6">
        <p className={`${!enabled ? "font-medium" : ""}`}>Opening Times</p>
        <Switch
          checked={enabled ? true : false}
          onChange={setEnabled}
          className={classNames(
            enabled ? "bg-indigo-600" : "bg-gray-200",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2"
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md"
            )}
          />
        </Switch>
        <p className={`${enabled ? "font-medium" : ""}`}>Opening days</p>
      </div>

      {!enabled ? (
        // Opening times options
        <div className="my-12 flex flex-col gap-8">
          {days.map((day) => {
            const changeTime = _changeTime(day);
            return (
              <div
                className="flex flex-col items-center border-2 sm:flex-row"
                key={day.id}
              >
                <div className="grid grid-cols-1 place-items-center sm:grid-cols-3">
                  <h3 className="font-semibold">
                    {capitalize(weekdayIndexToName(day.dayOfWeek)!)}
                  </h3>
                  <div className="mx-4">
                    <TimeSelector
                      type="openTime"
                      changeTime={changeTime}
                      selected={
                        openingHrs[
                          openingHrs.findIndex(
                            (x) => x.name === weekdayIndexToName(day.dayOfWeek)
                          )
                        ]?.openTime
                      }
                    />
                  </div>

                  <div className="mx-4">
                    <TimeSelector
                      type="closeTime"
                      changeTime={changeTime}
                      selected={
                        openingHrs[
                          openingHrs.findIndex(
                            (x) => x.name === weekdayIndexToName(day.dayOfWeek)
                          )
                        ]?.closeTime
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultChecked={!day.open}
                    onChange={(e) => changeDayOff(e, day)}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    htmlFor="default-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Close this date
                  </label>
                </div>
              </div>
            );
          })}

          <button
            className="mx-auto w-36 rounded-md border-2 bg-green-500 px-4 py-2 font-bold text-white"
            onClick={() => {
              const withId = openingHrs.map((day) => ({
                ...day,
                id: days[days.findIndex((d) => d.name === day.name)]!.id,
              }));
              saveOpeningHrs(withId);
            }}
            // isLoading={isLoading}
            // colorScheme="green"
            // variant="solid"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-6">
          <Calendar
            minDate={new Date()}
            className="REACT-CALENDAY p2"
            view="month"
            onClickDay={(date) => setSelectedDate(date)}
            tileClassName={({ activeStartDate, date, view }) => {
              return closedDays?.includes(formatISO(date))
                ? "closed-day"
                : null;
            }}
          />

          <button
            onClick={() => {
              if (dayIsClosed) openDay({ date: selectedDate });
              else if (selectedDate) closeDay({ date: selectedDate });
            }}
            disabled={!selectedDate}
            // isLoading={isLoading}
            // variant="solid"
            className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {dayIsClosed ? "Open shop this day" : "Close shop this day"}
          </button>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const days = await prisma.day.findMany();

  if (!days.length) throw new Error("Insert all days into database");

  return { props: { days } };
}

export default Opening;
