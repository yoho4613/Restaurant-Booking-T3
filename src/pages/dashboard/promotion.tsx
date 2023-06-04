import { Promotion } from "@prisma/client";
import { isAfter, isBefore, isSameDay } from "date-fns";
import React, { FC, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Toaster, toast } from "react-hot-toast";
import { api } from "~/utils/api";

interface Form {
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
}
const Promotion: FC = ({}) => {
  const { data: promotions, refetch } = api.promotion.getPromotions.useQuery();
  const { mutate: addPromotion } = api.promotion.addPromotion.useMutation({
    onSuccess: () => {
      toast.success("Promotion added successfully");
      setForm({
        name: "",
        description: "",
        startDate: null,
        endDate: null,
      });
      refetch().then(res => res).catch((err:Error) => console.log(err));
    },
  });
  const [form, setForm] = useState<Form>({
    name: "",
    description: "",
    startDate: null,
    endDate: null,
  });
  const [onGoingPromotion, setOnGoingPromotion] = useState<Promotion[] | []>(
    []
  );
  const [endedPromotion, setEndedPromotion] = useState<Promotion[] | []>([]);

  useEffect(() => {
    if (promotions) {
      setOnGoingPromotion(
        promotions.filter((promotion) =>
          isBefore(new Date(), promotion.endDate)
        )
      );
      setEndedPromotion(
        promotions.filter((promotion) => isAfter(new Date(), promotion.endDate))
      );
    }
  }, [promotions]);

  const submitForm = () => {
    if (form.startDate !== null && form.endDate !== null) {
      addPromotion({
        name: form.name,
        description: form.description,
        startDate: form.startDate,
        endDate: form.endDate,
      });
    }
  };

  return (
    <>
      <div className="p-6">
        <Toaster />
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
                  if (
                    isSameDay(form.startDate || 0, date) ||
                    isSameDay(form.endDate || 0, date)
                  ) {
                    return "highlight selected";
                  } else if (form.startDate && form.endDate) {
                    if (
                      isAfter(date, form.startDate) &&
                      isBefore(date, form.endDate)
                    ) {
                      return "selected";
                    }
                  }
                }}
                onClickDay={(date) => {
                  if (
                    form.endDate !== null ||
                    form.startDate === null ||
                    form.startDate.getTime() > date.getTime()
                  ) {
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
            disabled={
              !form.name ||
              !form.description ||
              !form.startDate ||
              !form.endDate
            }
            onClick={submitForm}
          >
            Add Promotion
          </button>
        </div>

        <div className="mx-auto mt-12 max-w-7xl">
          <p className="text-lg font-medium">Avilable Promotions:</p>
          <div className=" mb-12 mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8 ">
            {/* On Live Promotion */}
            {onGoingPromotion &&
              onGoingPromotion.map((promotion) => (
                <div key={promotion.id}>
                  <button
                    type="button"
                    className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {promotion.name}
                    </h5>
                    <h5 className="text-md mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                      <span className="font-bold">Ended at:</span>{" "}
                      {promotion.endDate.toLocaleString()}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      <span className="font-bold">Description:</span>
                      {promotion.description}
                    </p>
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl">
          <p className="text-lg font-medium">Ended Promotions:</p>
          <div className=" mb-12 mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8 ">
            {/* Ended Promotion */}
            {endedPromotion &&
              endedPromotion.map((promotion) => (
                <div key={promotion.id}>
                  <button
                    type="button"
                    className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {promotion.name}
                    </h5>
                    <h5 className="text-md mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                      <span className="font-bold">Ended at:</span>{" "}
                      {promotion.endDate.toLocaleString()}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      <span className="font-bold">Description:</span>
                      {promotion.description}
                    </p>
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Promotion;
