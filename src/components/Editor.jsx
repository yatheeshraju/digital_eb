import React from "react";
import { useState, useEffect } from "react";
import { set, getAll, del } from "../utils/idb_utils";
import Card from "./Card";
import { toast } from "react-hot-toast";
import EditCard from "./EditCard";
import {
  AiFillCheckCircle,
  AiFillPlusSquare,
  AiOutlineGithub,
} from "react-icons/ai";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import CreateCard from "./CreateCard";

function Editor({ settestwall, testwall, setshowSideBar, showSideBar }) {
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
        image: cardDetails.image,
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
        image: newCardDetails.image,
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

      <div className="w-full flex h-[750px] flex-col overflow-auto ">
        {showSideBar &&
          testwall.map((item) => (
            <Card
              key={item.id}
              info={item}
              handleDelete={handleDelete}
              handleEditOpen={handleEditOpen}
            />
          ))}
      </div>
      <div className="flex flex-col justify-center">
        <button
          className="p-2 flex justify-center items-center w-full bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
          onClick={handleCreateOpen}
        >
          <span>
            <AiFillPlusSquare fill="white" fontSize={38} />
          </span>
          <span>{showSideBar && "Create"}</span>
        </button>
      </div>
      <div className="flex flex-col justify-center items-center mr-2">
        <a
          href="https://github.com/yatheeshraju/digital_eb"
          target="_blank"
          rel="noreferrer"
          className="mb-2 mt-2 flex  text-center justify-center items-center text-xl font-bold text-green-900"
        >
          <span>
            <AiOutlineGithub size={38} />
          </span>
          <span>{showSideBar && "yatheeshraju"}</span>
        </a>
      </div>
      <div className="flex flex-row justify-end  items-center mb-2 mr-2">
        <button onClick={() => setshowSideBar(!showSideBar)}>
          {showSideBar ? (
            <MdKeyboardDoubleArrowLeft size={38} />
          ) : (
            <MdKeyboardDoubleArrowRight size={38} />
          )}
        </button>
      </div>
    </>
  );
}

export default Editor;
