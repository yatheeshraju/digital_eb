import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

function Card({ info, handleDeleteCard }) {
  return (
    <div className="w-full p-4 flex justify-between bg-white shadow-lg border mt-3 ">
      <div>{info.name}</div>
      <button onClick={() => handleDeleteCard(info.id)}>
        <AiOutlineDelete color="red" size={18} />
      </button>
    </div>
  );
}

export default Card;
