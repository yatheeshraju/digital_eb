import React from "react";
import { useState, useEffect } from "react";
import { set, getAll, del } from "../utils/idb_utils";
import Card from "./Card";
import { toast } from "react-hot-toast";
import EditCard from "./EditCard";
import {
  AiFillCheckCircle,
  AiFillPlusCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import CreateCard from "./CreateCard";

function Editor({ settestwall, testwall }) {
  const [cardDetails, setcardDetails] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [editId, setEditId] = useState();
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  const handleAddCard = async (cardDetails) => {
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
    handleCreateClose();
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
    setShowEdit(true);
    setEditId(id);
  };

  const handleEditClose = (id) => {
    setShowEdit(false);
  };

  const handleCreateOpen = (id) => {
    setShowCreate(true);
  };

  const handleCreateClose = (id) => {
    setShowCreate(false);
  };

  return (
    <>
      {showEdit ? (
        <EditCard
          testwall={testwall}
          id={editId}
          handleEditClose={handleEditClose}
          handleSave={handleSave}
        />
      ) : null}
      {showCreate ? (
        <CreateCard
          handleCreateClose={handleCreateClose}
          handleAddCard={handleAddCard}
          testwall={testwall}
        />
      ) : null}
      <div className="flex justify-center">
        <button
          className="p-1 w-12 h-12 flex justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
          onClick={handleCreateOpen}
        >
          <AiFillPlusCircle fill="white" fontSize={38} />
        </button>
      </div>
      <div className="w-full flex h-[800px] flex-col overflow-auto">
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
