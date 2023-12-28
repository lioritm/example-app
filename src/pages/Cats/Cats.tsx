import React from "react";
import { ICat } from "../../interfaces/cat";
import { CatContext } from "../../context/CatContext";
import { UserAuth } from "../../context/AuthContext";
import Loader from "../../shared/components/Loader/Loader";
import CatList from "../../pagesComponents/CatList/CatList";
import Searchbar from "../../components/Searchbar/Searchbar";
import "./Cats.css";
const Cats = () => {
  const { searchResults, search, setSearch } = React.useContext(CatContext);
  const { user } = UserAuth();
  const [cats, setCats] = React.useState<ICat[]>([]);
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
          <h1>Cat List {cats.length > 0 ? `(${cats.length})` : ""}</h1>
          {cats.length === 0 && !search && <Loader />}
          {cats.length === 0 && search && (
            <h3 className="text-center">No cats found</h3>
          )}
          {cats.length > 0 && <CatList cats={cats} setCats={setCats} />}
        </>
      )}
    </section>
  );
};

export default Cats;
