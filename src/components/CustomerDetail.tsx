import React, { FC, useState } from "react";
import { Form } from "~/pages/booking";

interface CustomerDetailProps {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
  setCustomerDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomerDetail: FC<CustomerDetailProps> = ({
  form,
  setForm,
  setCustomerDetail,
}) => {
  const [isMissing, setIsMissing] = useState(false);

  const handleNext = () => {
    function isValidEmail(email: string): boolean {
      const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    if (form.name.length && isValidEmail(form.email!) && form.people) {
      setCustomerDetail(true);
    } else {
      setIsMissing(true);
    }
    console.log(form)
  };

  return (
    <div>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="First Name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={(e) =>
                    setForm((form) => ({ ...form, name: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="guest"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Mobile Number (Optional)
                </label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  placeholder="021-123-1234"
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={(e) =>
                    setForm((form) => ({ ...form, mobile: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="guest"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@email.com"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              onChange={(e) =>
                setForm((form) => ({ ...form, email: e.target.value }))
              }
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="guest"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              How many guest are you bringing?
            </label>
            <input
              type="number"
              name="guest"
              id="guest"
              placeholder="5"
              min="0"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              onChange={(e) =>
                setForm((form) => ({ ...form, people: e.target.value }))
              }
            />
          </div>
          {isMissing && (
            <div className="mb-4 mt-4">
              <p className=" text-base text-red-600">
                Please fill all fields correctly.
              </p>
            </div>
          )}
          <div>
            <button
              onClick={handleNext}
              className="hover:shadow-form w-full rounded-md bg-[#6A64F1] px-8 py-3 text-center text-base font-semibold text-white outline-none"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
