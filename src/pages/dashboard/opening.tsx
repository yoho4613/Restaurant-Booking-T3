import TimeSelector from "@components/TimeSelector";
import { Switch } from "@headlessui/react";
import { Day } from "@prisma/client";
import { formatISO } from "date-fns";
import { type FC, useState } from "react";
import { Calendar } from "react-calendar";
import toast, { Toaster } from "react-hot-toast";
import { now } from "~/constants/config";
import { capitalize, classNames, weekdayIndexToName } from "~/utils/helpers";
import { api } from "~/utils/api";
import { prisma } from "../../server/db";
import { Button } from "@chakra-ui/react";

interface OpeningProps {
  days: Day[];
}

const opening: FC<OpeningProps> = ({ days }) => {
  const [enabled, setEnabled] = useState<Boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [openingHrs, setOpeningHrs] = useState([
    {
      name: "sunday",
      openTime: days[0]!.openTime,
      closeTime: days[0]!.closeTime,
    },
    {
      name: "monday",
      openTime: days[1]!.openTime,
      closeTime: days[1]!.closeTime,
    },
    {
      name: "tuesday",
      openTime: days[2]!.openTime,
      closeTime: days[2]!.closeTime,
    },
    {
      name: "wednesday",
      openTime: days[3]!.openTime,
      closeTime: days[3]!.closeTime,
    },
    {
      name: "thursday",
      openTime: days[4]!.openTime,
      closeTime: days[4]!.closeTime,
    },
    {
      name: "friday",
      openTime: days[5]!.openTime,
      closeTime: days[5]!.closeTime,
    },
    {
      name: "saturday",
      openTime: days[6]!.openTime,
      closeTime: days[6]!.closeTime,
    },
  ]);

  const { mutate: saveOpeningHrs, isLoading } =
    api.opening.changeOpeningHours.useMutation({
      onSuccess: () => toast.success("Opening hours saved"),
      onError: () => toast.error("Something went wrong"),
    });

  const { mutate: closeDay } = api.opening.closeDay.useMutation({
    onSuccess: () => refetch(),
  });
  const { mutate: openDay } = api.opening.openDay.useMutation({
    onSuccess: () => refetch(),
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
              <div className="grid grid-cols-3 place-items-center" key={day.id}>
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
            );
          })}

          <Button
            onClick={() => {
              const withId = openingHrs.map((day) => ({
                ...day,
                id: days[days.findIndex((d) => d.name === day.name)]!.id,
              }));
              saveOpeningHrs(withId);
            }}
            isLoading={isLoading}
            colorScheme="green"
            variant="solid"
          >
            Save
          </Button>
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-6">
          <Calendar
            minDate={now}
            className="REACT-CALENDAY p2"
            view="month"
            onClickDay={(date) => setSelectedDate(date)}
            tileClassName={({ activeStartDate, date, view }) => {
              return closedDays?.includes(formatISO(date))
                ? "closed-day"
                : null;
            }}
          />

          <Button
            onClick={() => {
              if (dayIsClosed) openDay({ date: selectedDate });
              else if (selectedDate) closeDay({ date: selectedDate });
            }}
            disabled={!selectedDate}
            isLoading={isLoading}
            variant="solid"
          >
            {dayIsClosed ? "Open shop this day" : "Close shop this day"}
          </Button>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const days = await prisma.day.findMany();

  if (!(days.length === 7)) throw new Error("Insert all days into database");

  return { props: { days } };
}

export default opening;
