import React, { FC, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { categories } from "~/constants/config";
import Image from "next/image";
import { MenuItem } from "@prisma/client";

interface IMenuPageProps {}

const MenuPage: FC<IMenuPageProps> = ({}) => {
  const { data: menuItems } = api.menu.getMenuItems.useQuery();

  const [filter, setFilter] = useState<string>("all");

  const filteredMenuItems = menuItems?.filter((menuItem) => {
    if (filter === "all") return menuItems;
    return menuItem.categories.includes(filter);
  });

  return (
    <div>
      <div className="p-6">
        <div className="m-auto mb-6 mt-6 flex w-1/2 justify-between">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              type="button"
              className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-xl font-bold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {category}
            </button>
          ))}
        </div>
        <div className="flex justify-evenly flex-wrap">
          {filteredMenuItems &&
            filteredMenuItems.map((food) => (
              <div
                key={food.id}
                className=" max-w-md flex flex-col justify-between rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="w-full">
                  <Image
                    className="max-h-1/2 w-full rounded-t-lg"
                    src={food.url}
                    alt={food.name}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {food.name}
                  </h5>

                  <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
                    ${food.price}
                  </p>
                  {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a> */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
