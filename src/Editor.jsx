import React from "react";
import { useState, useEffect } from "react";
import { set, getAll, del } from "./idb_utils";
import Card from "./Card";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import { AiFillCheckCircle } from "react-icons/ai";

function Editor({ settestwall, testwall }) {
  const [cardDetails, setcardDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState();
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

  const handleSave = async (newCardDetails) => {
    if (
      newCardDetails.name !== "" ||
      newCardDetails.name !== undefined ||
      newCardDetails.name !== null
    ) {
      set({
        id: newCardDetails.id,
        name: newCardDetails.name,
        link: newCardDetails.link,
        data: newCardDetails.data,
        x: newCardDetails.x,
        y: newCardDetails.y,
        isDragging: false,
      });
    }
    handleEditClose();
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
  const handleDelete = async (id) => {
    const tempid = id !== undefined ? parseInt(id) : undefined;

    if (tempid !== undefined) {
      await del(id);
      reloadData();
      toast("card deleted !", {
        icon: <AiFillCheckCircle color="green" />,
      });
    }
  };

  const handleEditOpen = (id) => {
    setShowModal(true);
    setEditId(id);
  };

  const handleEditClose = (id) => {
    setShowModal(false);
  };
  return (
    <>
      {showModal ? (
        <Modal
          testwall={testwall}
          id={editId}
          handleEditClose={handleEditClose}
          handleSave={handleSave}
        />
      ) : null}
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
        htmlFor="link"
      >
        Link Card
      </label>
      <select
        className="mb-4 px-4 py-2  text-gray-500 border-green-300 focus:ring-green-500 bo focus:border-green-500 pr-7 "
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

      <button
        type="button"
        className="py-2 px-4  mb-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
        onClick={handleAddCard}
      >
        Add Card
      </button>
      <div className="w-full flex flex-col h-96 overflow-auto">
        {testwall.map((item) => (
          <Card
            key={item.id}
            info={item}
            handleDelete={handleDelete}
            handleEditOpen={handleEditOpen}
          />
        ))}
      </div>
    </>
  );
}

export default Editor;
