import React from "react";
import { FaSearch } from "react-icons/fa";
import { CatContext } from "../../context/CatContext";
import "./Searchbar.css";
import { useTranslation } from "react-i18next";

const Searchbar = () => {
  const { setSearch } = React.useContext(CatContext);
  const { t } = useTranslation();
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
        placeholder={t("cats.search")}
        onChange={handleOnChange}
      ></input>
    </div>
  );
};

export default Searchbar;
