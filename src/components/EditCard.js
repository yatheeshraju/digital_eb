import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";

export default function EditCard({
  handleSave,
  handleEditClose,
  testwall,
  id,
}) {
  const [cardDetails, setcardDetails] = useState({});
  const getCardDetails = (testwall, id) => {
    return testwall.find((item) => item.id === id);
  };

  const handleInput = (e) => {
    let value = e.target.value;
    let keyname = e.target.name;
    console.log(e);
    setcardDetails({ ...cardDetails, [keyname]: value });
  };

  useEffect(() => {
    let cardDetails = getCardDetails(testwall, id);
    setcardDetails({ ...cardDetails });
  }, [id, testwall]);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <span className="text-2xl flex  font-semibold">
                <AiOutlineEdit className="mr-3" /> {cardDetails.name}
              </span>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => handleEditClose(cardDetails)}
              >
                <AiOutlineClose fill="red" />
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <label
                className="font-normal text-gray-700 dark:text-white"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="mb-2 appearance-none border border-black-300 w-full py-2 px-4 bg-white text-black-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"
                type="text"
                name="name"
                id="name"
                defaultValue={cardDetails.name}
                onChange={handleInput}
              />

              <label
                className="font-normal text-gray-700 dark:text-white"
                htmlFor="data"
              >
                Data
              </label>
              <textarea
                className="mb-2 appearance-none border border-black-300 w-full py-2 px-4 bg-white text-black-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"
                type="text"
                name="data"
                id="data"
                rows={5}
                defaultValue={cardDetails.data}
                onChange={handleInput}
              />
              <label
                className="font-normal text-gray-700 dark:text-white"
                htmlFor="link"
              >
                Link Card
              </label>
              <select
                className="mb-4 px-4 py-2 w-full text-gray-500 border-green-300 focus:ring-green-500 bo focus:border-green-500 "
                onChange={handleInput}
                id="link"
                name="link"
                value={cardDetails.link !== undefined ? cardDetails.link : ""}
              >
                <option disabled>please select a card to link</option>
                {testwall.map((item) =>
                  item.id !== cardDetails.id ? (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ) : null
                )}
              </select>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleSave(cardDetails)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
