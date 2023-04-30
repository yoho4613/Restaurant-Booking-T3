import React, { FC, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiCheck, HiSelector } from "react-icons/hi";
import { classNames } from "~/utils/helpers";

interface TimeSelectorProps {
  changeTime: (time: string, type: "openTime" | "closeTime") => void;
  selected: string | undefined;
  type: "openTime" | "closeTime";
}

const timeOptions: string[] = [];
for (let i = 5; i < 24; i++) {
  for (let j = 0; j < 60; j += 30) {
    timeOptions.push(
      `${i.toString().padStart(2, "0")}:${j.toString().padStart(2, "0")}`
    );
  }
}

const TimeSelector: FC<TimeSelectorProps> = ({
  selected,
  changeTime,
  type,
}) => {
  if (!selected) return <p>none selected</p>;

  return (
    <Listbox
      value={selected}
      onChange={(e) => {
        if (type === "openTime") e = e?.replace(/^0/, "");
        changeTime(e, type);
      }}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block w-32 text-sm font-medium text-gray-700">
            {type === "openTime" ? "Opening Time" : "Closing Time"}
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <div className="flex items-center">
                <span
                  aria-label={true ? "Online" : "Offline"}
                  className={classNames(
                    true ? "bg-green-400" : "bg-gray-200",
                    "flex-shink-0 inline-block h-2 w-2 rounded-full"
                  )}
                />
                <span className="ml-3 block truncate">{selected}</span>
              </div>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <HiSelector
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {timeOptions.map((time) => {
                  return (
                    <Listbox.Option
                      onClick={() => console.log(timeOptions)}
                      key={time}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-indigo-600 text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={time}
                    >
                      {({ active, selected: selectedOption }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selectedOption ? "bg-green-400" : "bg-gray-200",
                                "inline-block h-2 w-2 flex-shrink-0 rounded-full"
                              )}
                              aria-hidden="true"
                            />
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {time}
                              <span className=" sr-only">
                                is {true ? "online" : "offline"}
                              </span>
                            </span>
                          </div>

                          {selectedOption ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <HiCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default TimeSelector;
