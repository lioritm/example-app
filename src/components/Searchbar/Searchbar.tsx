import React from "react";
import { FaSearch } from "react-icons/fa";
import { CatContext } from "../../context/CatContext";
import "./Searchbar.css";
const Searchbar = () => {
  const { setSearch } = React.useContext(CatContext);

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length > 1) {
      setSearch(event.currentTarget.value);
    } else if (event.currentTarget.value.length === 0) {
      setSearch("");
    }
  };
  return (
    <div className="search-bar">
      <FaSearch size={20} />
      <input
        type="text"
        placeholder="Search by cat name or owner name"
        onChange={handleOnChange}
      ></input>
    </div>
  );
};

export default Searchbar;