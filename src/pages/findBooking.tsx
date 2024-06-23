import { BookingWithTable } from "@types";
import { FC, FormEvent, MouseEvent, useEffect, useState } from "react";
import Spinner from "~/components/Spinner";
import { api } from "~/utils/api";

// interface findBookingProps {

// }

const FindBooking: FC = ({}) => {
  const { mutate: findBooking } = api.booking.findCustomerBooking.useMutation({
    onSuccess: (res) => {
      setLoading(false);
      setError("");
      setBooking(res);
    },
    onError: (err) => {
      setError(err.message);
      setLoading(false);
    },
  });
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [booking, setBooking] = useState<BookingWithTable | null>(null);
  const [selectedMethod, setSetselectedMethod] = useState<"email" | "mobile">(
    "email"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(booking);
  }, [booking]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBooking(null);
    setLoading(true);
    setError("");
    findBooking({
      method: selectedMethod,
      data: selectedMethod === "email" ? email : mobile,
    });
  };

  return (
    <div>
      <div className="mx-auto w-full max-w-xs">
        <div className="flex items-center justify-between">
          <button
            className={`focus:shadow-outline w-1/2 ${
              selectedMethod === "email" ? "bg-blue-500" : ""
            } px-4 py-2 font-bold ${
              selectedMethod === "email" ? "text-white" : "black"
            } hover:bg-blue-700 hover:text-white focus:outline-none`}
            type="button"
            onClick={() => setSetselectedMethod("email")}
          >
            Find with Email
          </button>
          <button
            className={`focus:shadow-outline w-1/2 ${
              selectedMethod === "mobile" ? "bg-blue-500" : ""
            } px-4 py-2 font-bold ${
              selectedMethod === "mobile" ? "text-white" : "black"
            } hover:bg-blue-700 hover:text-white focus:outline-none`}
            type="button"
            onClick={() => setSetselectedMethod("mobile")}
          >
            Find with Mobile
          </button>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        >
          {selectedMethod === "email" ? (
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="username"
                type="text"
                placeholder="email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          ) : (
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="username"
              >
                Mobile
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="username"
                type="tel"
                placeholder="mobile number..."
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          )}

          <div className="flex justify-between text-center">
            <button
              className="focus:shadow-outline mx-auto rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="button"
            >
              Find Booking
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        {loading && <Spinner />}
        {booking && (
          <div>
            <ul>
              <li className="mb-4 text-center font-bold">Booking Detail</li>
              <li>
                Booking Date:{" "}
                <span className="font-bold">
                  {booking.dateTime.toLocaleString()}
                </span>
              </li>
              <li>
                Booking Name: <span className="font-bold">{booking.name}</span>
              </li>
              <li>
                Email Address:{" "}
                <span className="font-bold">{booking.email}</span>
              </li>
              <li>
                Contact Number:
                <span className="font-bold">
                  {booking.mobile || "Not Registered"}
                </span>
              </li>
              <li>
                People: <span className="font-bold">{booking.people}</span>
              </li>
              <li>
                Table: <span className="font-bold">{booking.table}</span>
              </li>
              <li>
                Preorder:{" "}
                <span className="font-bold">
                  {booking.preorder ? "Yes" : "No"}
                </span>
              </li>
            </ul>
          </div>
        )}
        <p>{error}</p>
      </div>
    </div>
  );
};

export default FindBooking;
