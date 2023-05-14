import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

function Card({ info, handleDelete, handleEditOpen }) {
  return (
    <div className="w-72 p-4 flex  flex-row justify-between bg-white shadow-lg border mt-3 ">
      <div>{info.name}</div>
      <div className="flex flex-row w-12 justify-between">
        <button onClick={() => handleEditOpen(info.id)}>
          <AiOutlineEdit color="gray" size={18} />
        </button>
        <button onClick={() => handleDelete(info.id)}>
          <AiOutlineDelete color="red" size={18} />
        </button>
      </div>
    </div>
  );
}

export default Card;
