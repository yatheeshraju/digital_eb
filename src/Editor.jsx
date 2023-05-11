import React from "react";
import { useState, useEffect } from "react";
import { set, getAll, del, get } from "./idb_utils";
import Card from "./Card";
import { toast } from "react-hot-toast";
import { AiOutlineNodeIndex, AiOutlineSisternode } from "react-icons/ai";

function Editor({ settestwall, testwall }) {
  const [cardDetails, setcardDetails] = useState({});
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  const handleAddCard = async () => {
    if (
      cardDetails.name !== "" ||
      cardDetails.name !== undefined ||
      cardDetails.name !== null
    ) {
      set({
        name: cardDetails.name,
        link: cardDetails.link,
        data: cardDetails.data,
        x: random(20, 500),
        y: random(20, 500),
        isDragging: false,
      });
    }
    reloadData();
  };
  const reloadData = async () => {
    await getAll().then((res) => settestwall(res));
  };
  const handleInput = (e) => {
    let value = e.target.value;
    let keyname = e.target.name;
    setcardDetails({ ...cardDetails, [keyname]: value });
  };
  useEffect(() => {
    getAll().then((res) => settestwall(res));
  }, [settestwall]);
  const handleDeleteCard = async (id) => {
    const tempid = id !== undefined ? parseInt(id) : undefined;

    if (tempid !== undefined) {
      const link = await get(id);
      if (link.link === undefined) {
        toast("looks like root node !", {
          icon: <AiOutlineNodeIndex color="red" />,
        });
        return;
      }
      if (!parseInt(link.link)) {
        // const linkedCard = await get(parseInt(link.link));
        // await set({
        //   id: linkedCard.id,
        //   name: linkedCard.name,
        //   link: undefined,
        //   data: linkedCard.data,
        //   x: random(20, 500),
        //   y: random(20, 500),
        //   isDragging: false,
        // });
        await del(id);
        reloadData();
      } else {
        toast("links at below level !", {
          icon: <AiOutlineSisternode color="red" />,
        });
      }
    }
  };
  return (
    <>
      <span className="font-normal text-gray-700 dark:text-white">Name</span>
      <input
        className="mb-2 appearance-none border border-black-300 w-full py-2 px-4 bg-white text-black-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"
        type="text"
        name="name"
        onChange={handleInput}
      />

      <span className="font-normal text-gray-700 dark:text-white">Data</span>
      <textarea
        className="mb-2 appearance-none border border-black-300 w-full py-2 px-4 bg-white text-black-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"
        type="text"
        name="data"
        onChange={handleInput}
      />

      <select
        className="mb-4 px-4 py-2  text-gray-500 border-green-300 focus:ring-green-500 bo focus:border-green-500 pr-7 "
        onChange={handleInput}
        name="link"
      >
        <option value={null}> please select a card to link </option>
        {testwall.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <button
        className="py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
        onClick={handleAddCard}
      >
        Add Card
      </button>
      <div className="w-full flex flex-col">
        {testwall.map((item) => (
          <Card key={item.id} info={item} handleDeleteCard={handleDeleteCard} />
        ))}
      </div>
    </>
  );
}

export default Editor;
