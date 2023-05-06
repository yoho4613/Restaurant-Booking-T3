import Image from "next/image";
import React, { FC } from "react";
import { IoMdTimer } from "react-icons/io";
import { GoLocation } from "react-icons/go";
import { BiPhoneCall } from "react-icons/bi";

const Landing: FC = ({}) => {
  return (
    <>
      <div className="relative flex flex-col h-5/6 w-full items-center  justify-center ">
        <div className=" relative w-2/3 text-center  ">
          <h1
            className="mb-6 text-3xl font-semibold text-white md:text-6xl"
            style={{ fontFamily: "cursive" }}
          >
            The Best Asian Restaurant
          </h1>
          <p className="mb-6 text-white">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
            saepe explicabo expedita modi
          </p>
          <button className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            Book Now!
          </button>
        </div>
        <div className="mt-8 flex flex-col items-center justify-evenly gap-4 md:mt-32 md:flex-row md:w-full md:gap-0">
          <div className="flex w-32 flex-col items-center border-2 p-3 ">
            <IoMdTimer className=" mb-2 text-4xl text-zinc-200" />
            <p className="text-xs text-white">Online Order</p>
          </div>
          <div className="flex w-32 flex-col items-center border-2 p-3 ">
            <GoLocation className=" mb-2 text-4xl text-zinc-200" />
            <p className="text-xs text-white">Online Booking</p>
          </div>
          <div className="flex w-32 flex-col items-center border-2 p-3 ">
            <BiPhoneCall className=" mb-2 text-4xl text-zinc-200" />
            <p className="text-xs text-white">Lorem ipsum dolor</p>
          </div>
        </div>
      </div>

      {/* <div className="mt-24 flex h-80 max-h-80 flex-col bg-primaryColor-100 md:flex-row">
        <div className="mt-8 md:mt-0 p-6">
          <h1 className="mb-10 text-3xl text-white font-semibold">
            Online Booking
          </h1>
          <p className="mb-6 text-white">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
            saepe explicabo expedita modi
          </p>
          <button className="rounded-full bg-slate-700 px-4 py-2 font-bold text-white hover:bg-blue-700">
            Book Now!
          </button>
        </div>
        <div className="w-full h-full md:h-full">
          <Image
            src="/assets/restaurant.jpg"
            alt="Restaurant"
            width={100}
            height={100}
            className="h-full w-full"
          />
        </div>
      </div> */}
    </>
  );
};

export default Landing;
