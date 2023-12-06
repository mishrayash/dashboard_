import React from "react";
import { MdDeleteOutline } from "react-icons/md";

const Search = ({ search, setSearch, deleteSelectedRows }) => {
  return (
    <div className="flex flex-rows justify-between mr-1">
      <input
        placeholder="Enter Value..."
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border focus:outline-none px-2 w-[15rem] rounded-md py-1"
      ></input>
      <button
        className="px-2 py-1 bg-red-300 text-white rounded-md"
        onClick={() => deleteSelectedRows()}
      >
        <MdDeleteOutline />
      </button>
    </div>
  );
};

export default Search;
