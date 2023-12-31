import React from "react";
import { ICat } from "../../interfaces/cat";
import { CatContext } from "../../context/CatContext";
import { UserAuth } from "../../context/AuthContext";
import Loader from "../../shared/components/Loader/Loader";
import CatList from "../../pagesComponents/CatList/CatList";
import Searchbar from "../../components/Searchbar/Searchbar";
import { useTranslation } from "react-i18next";
import "./Cats.css";
const Cats = () => {
  const { searchResults, search, setSearch } = React.useContext(CatContext);
  const { user } = UserAuth();
  const [cats, setCats] = React.useState<ICat[]>([]);
  const { t } = useTranslation();
  React.useEffect(() => {
    setSearch("");
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    setCats(searchResults);
  }, [searchResults]);

  return (
    <section className="container page">
      <Searchbar />
      {!user ? (
        <div></div>
      ) : (
        <>
          <h1>
            {t("home.title")} {cats.length > 0 ? `(${cats.length})` : ""}
          </h1>
          {cats.length === 0 && !search && <Loader />}
          {cats.length === 0 && search && (
            <h3 className="text-center">{t("home.noCats")}</h3>
          )}
          {cats.length > 0 && <CatList cats={cats} setCats={setCats} />}
        </>
      )}
    </section>
  );
};

export default Cats;
