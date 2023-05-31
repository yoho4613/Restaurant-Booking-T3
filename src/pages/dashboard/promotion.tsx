import React, { FC } from 'react';



const Promotion:FC = ({}) => {
  
  return(
    <>
    <div className="p-6">
      <div className="mx-auto flex max-w-xl flex-col gap-2">
        <input
          name="name"
          className="h-12 rounded-sm border-none bg-gray-200"
          type="text"
          placeholder="name"
          // onChange={(e) =>
            // setInput((prev) => ({ ...prev, name: e.target.value }))
          // }
          // value={input.name}
        />

        <input
          name="price"
          className="h-12 rounded-sm border-none bg-gray-200"
          type="number"
          placeholder="price"
          // onChange={(e) =>
            // setInput((prev) => ({ ...prev, price: Number(e.target.value) }))
          // }
          // value={input.price}
        />

        {/* <DynamicSelect
          value={input.categories}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, categories: e } as Input))
          }
          isMulti
          className="h-12"
          options={selectOptions}
        /> */}

        <label
          htmlFor="file"
          className="relative h-12 cursor-pointer rounded-sm bg-gray-200 font-medium text-indigo-600 focus-within:outline-none"
        >
          <span className="sr-only">File input</span>
          <div className="flex h-full items-center justify-center">
            {/* {preview ? (
              <div className="relative h-3/4 w-full">
                <Image
                  alt="preview"
                  style={{ objectFit: "contain" }}
                  fill
                  src={preview}
                />
              </div>
            ) : ( */}
              <span>Select image</span>
            {/* )} */}
          </div>
          <input
            name="file"
            id="file"
            // onChange={handleFileSelect}
            accept="image/jpeg image/png image/jpg"
            type="file"
            className="sr-only"
          />
        </label>

        <button
          className="h-12 rounded-sm bg-gray-200 disabled:cursor-not-allowed"
          // disabled={!input.file || !input.name}
          onClick={() => {
            // addMenuItem()
            //   .then((res) => res)
            //   .catch((err: Error) => console.log(err));
          }}
        >
          Add Promotion
        </button>
      </div>
      {/* {error && <p className="text-xs text-red-600">{error}</p>} */}

      <div className="mx-auto mt-12 max-w-7xl">
        <p className="text-lg font-medium">Avilable Promotions:</p>
        <div className=" mb-12 mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8 ">
          {/* {menuItems?.map((menuItem: MenuItems) => (
            <div key={menuItem.id}>
              <p>{menuItem.name}</p>
              <div className="relative h-40 w-40">
                 <Image priority fill alt="" src={menuItem.url} /> 
              </div>
              <button
                onClick={() => {
                  // handleDelete(menuItem.imageKey, menuItem.id)
                  //   .then((res) => res)
                  //   .catch((err: Error) => console.log(err));
                }}
                className="text-xs text-red-500"
              >
                delete
              </button>
            </div>
          ))} */}
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl">
        <p className="text-lg font-medium">Ended Promotions:</p>
        <div className=" mb-12 mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8 ">
          {/* {menuItems?.map((menuItem: MenuItems) => (
            <div key={menuItem.id}>
              <p>{menuItem.name}</p>
              <div className="relative h-40 w-40">
                 <Image priority fill alt="" src={menuItem.url} /> 
              </div>
              <button
                onClick={() => {
                  // handleDelete(menuItem.imageKey, menuItem.id)
                  //   .then((res) => res)
                  //   .catch((err: Error) => console.log(err));
                }}
                className="text-xs text-red-500"
              >
                delete
              </button>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  </>
  )
};

export default Promotion;