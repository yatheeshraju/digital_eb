import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineAccountBook, AiOutlineClose } from "react-icons/ai";

export default function CreateCard({
  handleAddCard,
  handleCreateClose,
  testwall,
}) {
  const [cardDetails, setcardDetails] = useState({});
  const handleInput = (e) => {
    let value = e.target.value;
    let keyname = e.target.name;
    setcardDetails({ ...cardDetails, [keyname]: value });
  };

  const handleFile = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      let value = reader.result;
      let keyname = e.target.name;
      setcardDetails({ ...cardDetails, [keyname]: value });
    };
    reader.onerror = function (error) {
      toast.error(error);
    };
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <span className="text-2xl flex  font-semibold">
                <AiOutlineAccountBook className="mr-3" />
              </span>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => handleCreateClose()}
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
                onChange={handleInput}
              />

              <label
                className="font-normal text-gray-700 dark:text-white"
                htmlFor="image"
              >
                Image
              </label>
              <input
                className="mb-2 appearance-none border border-black-300 w-full py-2 px-4 bg-white text-black-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"
                type="file"
                name="image"
                id="image"
                accept="image/png,image/jpeg"
                onChange={handleFile}
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
              >
                <option disabled>please select a card to link</option>
                {testwall.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleAddCard(cardDetails)}
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
