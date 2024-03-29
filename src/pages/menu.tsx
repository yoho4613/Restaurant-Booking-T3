import Menu from "@components/Menu";
import Spinner from "@components/Spinner";
import { parseISO } from "date-fns";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { now } from "~/constants/config";
import { api } from "~/utils/api";
import { BsCart } from "react-icons/bs";
import Cart from "~/components/Cart";

import { CustomerDetail } from "@types";

const MenuPage: FC = ({}) => {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { isFetchedAfterMount } = api.menu.checkMenuStatus.useQuery(
    undefined,
    {}
  );

  const [customerDetail, setCustomerDetail] = useState<CustomerDetail | null>(
    null
  );

  useEffect(() => {
    setCustomerDetail(
      JSON.parse(localStorage.getItem("bookingWithPreorder")!) as CustomerDetail
    );
  }, []);

  const [showCart, setShowCart] = useState<boolean>(false);
  const [productsInCart, setProductsInCart] = useState<
    { id: string; quantity: number }[]
  >([]);

  const addToCart = (id: string, quantity: number) => {
    setProductsInCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) => {
          if (item.id === id)
            return { ...item, quantity: item.quantity + quantity };
          return item;
        });
      }
      return [...prev, { id, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setProductsInCart((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const selectedTime = localStorage.getItem("selectedTime");
    if (!selectedTime)
      router
        .push("/")
        .then((res) => res)
        .catch((err: Error) => console.log(err));
    else {
      const date = parseISO(selectedTime);

      if (date < new Date())
        router
          .push("/")
          .then((res) => res)
          .catch((err: Error) => console.log(err));

      // Date is valied
      setSelectedTime(selectedTime);
    }
  }, []);

  return (
    <>
      <Cart
        removeFromCart={removeFromCart}
        open={showCart}
        setOpen={setShowCart}
        products={productsInCart}
      />
      {isFetchedAfterMount && selectedTime ? (
        <div className="mx-auto mt-12 max-w-7xl sm:px-6 lg:px-8">
          {/* Cart Icon */}
          <div className="sticky bg-white top-0 z-10 flex w-full items-center justify-end">
            <p className="mr-2 text-lg font-light">Checkout</p>
            <button
              type="button"
              onClick={() => setShowCart((prev) => !prev)}
              className="flex mr-2 items-center justify-center rounded-lg bg-gray-200 p-3 text-lg font-medium text-indigo-600"
            >
              <BsCart className="mr-2 text-lg" />
              {productsInCart.reduce((acc, item) => acc + item.quantity, 0)}
            </button>
          </div>

          <Menu addToCart={addToCart} selectedTime={selectedTime} />
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default MenuPage;
