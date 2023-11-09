import React, { FC } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineCall } from "react-icons/md";

const Contact: FC = ({}) => {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 md:flex-row md:p-12">
      <div className="flex w-full flex-col p-6 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.2)] md:w-[25rem]">
        <div className="space-y-4 border-b-2 p-2 md:p-6">
          <div className="flex items-center">
            <div className="bg-redPrimary flex h-12 w-12 items-center justify-center rounded-full">
              <MdOutlineCall color="green" size={30} />
            </div>
            <h2 className="ml-4 text-lg font-bold">Call To Us</h2>
          </div>
          <p>We are available 24/7, 7 days a week.</p>
          <p>Phone +64 888 8888</p>
        </div>
        <div className="space-y-4 p-2 md:p-6">
          <div className="flex items-center">
            <div className="bg-redPrimary flex h-12 w-12 items-center justify-center rounded-full">
              <AiOutlineMail color="green" size={30} />
            </div>
            <h2 className="ml-4 text-lg font-bold">Write To Us</h2>
          </div>
          <p>Fill out our form and we will contact you within 24 hours.</p>
          <p>Email: contact@fcrestaurant.com</p>
          <p>Email: support@fcrestaurant.com</p>
        </div>
      </div>

      <div className="flex grow flex-col px-6 py-12 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.2)]">
        <form className="space-y-8">
          <div className="flex flex-col justify-between space-y-4 lg:flex-row lg:space-y-0">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-secondary w-full rounded-sm border-2 p-2 lg:w-48"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="bg-secondary w-full rounded-sm border-2 p-2 lg:w-48"
            />
            <input
              type="tel"
              placeholder="Your Phone"
              className="bg-secondary w-full rounded-sm border-2 p-2 lg:w-48"
            />
          </div>
          <textarea
            rows={8}
            placeholder="Your Message"
            className="bg-secondary w-full rounded-sm border-2 p-2"
          />
          <div className="text-right">
            <button className="rounded bg-green-500 px-6 py-4 font-bold text-white hover:bg-green-400">
              Send Massage
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
