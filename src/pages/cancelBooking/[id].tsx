import Spinner from "@components/Spinner";
import { prisma } from "~/server/db";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";

const CancelBooking = () => {
  const { mutate: cancelBooking, isLoading } =
    api.booking.cancelBooking.useMutation({
      onSuccess: () => {
        findBooking({ id });
      },
    });

  const router = useRouter();
  const [id, setId] = useState<string>("");
  const [completed, setCompleted] = useState(false);
  const { mutate: findBooking } = api.booking.findBooking.useMutation({
    onSuccess: (booking) =>
      booking?.canceled ? setCompleted(false) : setCompleted(true),
  });

  useEffect(() => {
    console.log(router.query.id);
    if (router.query.id) {
      setId(router.query.id.toString());
    }
  }, [router.query]);

  useEffect(() => {
    findBooking({ id });
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      {isLoading && (
        <div
          className="fixed flex h-screen w-screen items-center justify-center"
          style={{ background: "rgba(0, 0, 0, 0.4)" }}
        >
          <Spinner />
        </div>
      )}
      <div className="mb-6 w-24 rounded-lg">
        <Image
          src="/assets/logo.jpg"
          className="mr-3 w-full rounded-lg"
          alt="Flowbite Logo"
          width={100}
          height={100}
        />
      </div>
      <div>
        <h2 className="mb-6 text-2xl font-bold">Cancel Booking</h2>
        <p className="mb-6">
          If you want to cancel booking, Click below Button
        </p>
        {completed ? (
          <h3>Your Booking Has been successfully Canceled</h3>
        ) : (
          <button
            type="button"
            onClick={() => {
              cancelBooking({ id });
            }}
            className="mb-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default CancelBooking;
