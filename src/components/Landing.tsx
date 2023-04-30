import Image from "next/image";
import React, { FC } from "react";
import { PRIMARY_COLOR_THEME } from "~/constants/config";
import { IoMdTimer } from "react-icons/io";
import { GoLocation } from 'react-icons/go'
import { BiPhoneCall } from 'react-icons/bi'

interface LandingProps {}

const Landing: FC<LandingProps> = ({}) => {
  return (
    <>
      <div className="relative mt-8 flex w-full flex-col items-center justify-center md:flex-row md:justify-evenly">
        <div
          className="absolute -top-32 overflow-hidden right-0 h-full w-full md:w-1/2"
          style={{ height: "300%" }}
        >
          <svg
            id="wave"
            style={{ transform: "rotate(180deg)", transition: "0.3s" }}
            viewBox="0 0 1440 490"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full"
          >
            <defs>
              <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                <stop
                  stopColor={PRIMARY_COLOR_THEME}
                  offset="0%"
                  className=" bg-primaryColor-200"
                ></stop>
                <stop
                  stopColor={PRIMARY_COLOR_THEME}
                  offset="100%"
                  className=" bg-primaryColor-200"
                ></stop>
              </linearGradient>
            </defs>
            <path
              style={{ transform: "translate(0, 0px)", opacity: 1 }}
              fill="url(#sw-gradient-0)"
              d="M0,294L21.8,253.2C43.6,212,87,131,131,122.5C174.5,114,218,180,262,196C305.5,212,349,180,393,187.8C436.4,196,480,245,524,220.5C567.3,196,611,98,655,57.2C698.2,16,742,33,785,40.8C829.1,49,873,49,916,40.8C960,33,1004,16,1047,8.2C1090.9,0,1135,0,1178,49C1221.8,98,1265,196,1309,261.3C1352.7,327,1396,359,1440,318.5C1483.6,278,1527,163,1571,163.3C1614.5,163,1658,278,1702,310.3C1745.5,343,1789,294,1833,253.2C1876.4,212,1920,180,1964,138.8C2007.3,98,2051,49,2095,49C2138.2,49,2182,98,2225,114.3C2269.1,131,2313,114,2356,122.5C2400,131,2444,163,2487,155.2C2530.9,147,2575,98,2618,130.7C2661.8,163,2705,278,2749,343C2792.7,408,2836,425,2880,416.5C2923.6,408,2967,376,3011,367.5C3054.5,359,3098,376,3120,383.8L3141.8,392L3141.8,490L3120,490C3098.2,490,3055,490,3011,490C2967.3,490,2924,490,2880,490C2836.4,490,2793,490,2749,490C2705.5,490,2662,490,2618,490C2574.5,490,2531,490,2487,490C2443.6,490,2400,490,2356,490C2312.7,490,2269,490,2225,490C2181.8,490,2138,490,2095,490C2050.9,490,2007,490,1964,490C1920,490,1876,490,1833,490C1789.1,490,1745,490,1702,490C1658.2,490,1615,490,1571,490C1527.3,490,1484,490,1440,490C1396.4,490,1353,490,1309,490C1265.5,490,1222,490,1178,490C1134.5,490,1091,490,1047,490C1003.6,490,960,490,916,490C872.7,490,829,490,785,490C741.8,490,698,490,655,490C610.9,490,567,490,524,490C480,490,436,490,393,490C349.1,490,305,490,262,490C218.2,490,175,490,131,490C87.3,490,44,490,22,490L0,490Z"
            ></path>
          </svg>
        </div>
        <div className=" w-fll relative z-10 px-6 md:w-1/3">
          <h1 className="mb-10 text-3xl text-white md:text-gray-800 font-semibold">
            The Best Asian Restaurant
          </h1>
          <p className="mb-6 text-white md:text-gray-800">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
            saepe explicabo expedita modi
          </p>
          <button className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            Book Now!
          </button>
        </div>
        <div className="relative z-10 mt-6 w-full md:w-1/3">
          <Image
            src="/assets/landingFood.jpg"
            width={100}
            height={100}
            alt="Main Food"
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="mt-12 md:mt-32 flex flex-col md:flex-row items-center gap-4 md:gap-0 justify-evenly">
        <div className="flex w-32 flex-col items-center border-2 p-3 ">
          <IoMdTimer className=" mb-2 text-4xl text-primaryColor-400" />
          <p className="text-xs">Lorem ipsum dolor</p>
        </div>
        <div className="flex w-32 flex-col items-center border-2 p-3 ">
          <GoLocation className=" mb-2 text-4xl text-primaryColor-400" />
          <p className="text-xs">Lorem ipsum dolor</p>
        </div>
        <div className="flex w-32 flex-col items-center border-2 p-3 ">
          <BiPhoneCall className=" mb-2 text-4xl text-primaryColor-400" />
          <p className="text-xs">Lorem ipsum dolor</p>
        </div>
      </div>

      <div className="relative mt-16 overflow-hidden flex w-screen flex-col items-center justify-center md:flex-row md:justify-evenly">
        <div className="absolute -z-10 top-10 md:-top-32 right-0 h-full w-full md:w-1/2"
          style={{ height: "300%" }}
        >
          <svg
            id="wave"
            style={{ transform: "rotate(180deg)", transition: "0.3s" }}
            viewBox="0 0 1440 490"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full"
          >
            <defs>
              <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                <stop
                  stopColor={PRIMARY_COLOR_THEME}
                  offset="0%"
                  className=" bg-primaryColor-200"
                ></stop>
                <stop
                  stopColor={PRIMARY_COLOR_THEME}
                  offset="100%"
                  className=" bg-primaryColor-200"
                ></stop>
              </linearGradient>
            </defs>
            <path
              style={{ transform: "translate(0, 0px)", opacity: 1 }}
              fill="url(#sw-gradient-0)"
              d="M0,294L21.8,253.2C43.6,212,87,131,131,122.5C174.5,114,218,180,262,196C305.5,212,349,180,393,187.8C436.4,196,480,245,524,220.5C567.3,196,611,98,655,57.2C698.2,16,742,33,785,40.8C829.1,49,873,49,916,40.8C960,33,1004,16,1047,8.2C1090.9,0,1135,0,1178,49C1221.8,98,1265,196,1309,261.3C1352.7,327,1396,359,1440,318.5C1483.6,278,1527,163,1571,163.3C1614.5,163,1658,278,1702,310.3C1745.5,343,1789,294,1833,253.2C1876.4,212,1920,180,1964,138.8C2007.3,98,2051,49,2095,49C2138.2,49,2182,98,2225,114.3C2269.1,131,2313,114,2356,122.5C2400,131,2444,163,2487,155.2C2530.9,147,2575,98,2618,130.7C2661.8,163,2705,278,2749,343C2792.7,408,2836,425,2880,416.5C2923.6,408,2967,376,3011,367.5C3054.5,359,3098,376,3120,383.8L3141.8,392L3141.8,490L3120,490C3098.2,490,3055,490,3011,490C2967.3,490,2924,490,2880,490C2836.4,490,2793,490,2749,490C2705.5,490,2662,490,2618,490C2574.5,490,2531,490,2487,490C2443.6,490,2400,490,2356,490C2312.7,490,2269,490,2225,490C2181.8,490,2138,490,2095,490C2050.9,490,2007,490,1964,490C1920,490,1876,490,1833,490C1789.1,490,1745,490,1702,490C1658.2,490,1615,490,1571,490C1527.3,490,1484,490,1440,490C1396.4,490,1353,490,1309,490C1265.5,490,1222,490,1178,490C1134.5,490,1091,490,1047,490C1003.6,490,960,490,916,490C872.7,490,829,490,785,490C741.8,490,698,490,655,490C610.9,490,567,490,524,490C480,490,436,490,393,490C349.1,490,305,490,262,490C218.2,490,175,490,131,490C87.3,490,44,490,22,490L0,490Z"
            ></path>
          </svg>
        </div>
        <div className="w-fll order-2 mb-8 md:mb-0 mt-8 md:mt-0 relative z-10 px-6 md:w-1/3">
          <h1 className="mb-10 text-3xl text-white md:text-gray-800 font-semibold">
            The Best Asian Restaurant
          </h1>
          <p className="mb-6 text-white md:text-gray-800">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
            saepe explicabo expedita modi
          </p>
          <button className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            Book Now!
          </button>
        </div>
        <div className="relative z-10 md:mt-6 w-full md:w-1/3">
          <Image
            src="/assets/restaurant.jpg"
            width={100}
            height={100}
            alt="Main Food"
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="mt-24 flex h-80 max-h-80 flex-col bg-primaryColor-100 md:flex-row">
        <div className="mt-8 md:mt-0 p-6">
          <h1 className="mb-10 text-3xl text-white md:text-gray-800 font-semibold">
            Online Booking
          </h1>
          <p className="mb-6 text-white md:text-gray-800">
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
      </div>
    </>
  );
};

export default Landing;
