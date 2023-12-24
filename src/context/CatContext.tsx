import { createContext, useState, useEffect } from "react";
import { ContextProps, CatsContextInterface } from "../interfaces/contexts";
import { ICat } from "../interfaces/cat";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  addDoc,
  // FieldValue,
} from "firebase/firestore";
import { db, catsDB } from "../config/firebase";
import { UserAuth } from "./AuthContext";
//import { sortByParam } from "../utils/utils";
export const CatContext = createContext<CatsContextInterface>(
  {} as CatsContextInterface
);

const CatProvider = ({ children }: ContextProps) => {
  const { user } = UserAuth();
  const [cats, setCats] = useState<ICat[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ICat[]>([]);

  const catsCollectionRef = collection(db, catsDB);

  const getCats = async () => {
    const data = await getDocs(catsCollectionRef);
    const tempCats = data.docs.map((doc) => ({
      ...doc.data(),
      name: doc.data().name,
      gender: doc.data().gender,
      birthdate: doc.data().birthdate,
      sterilized: doc.data().sterilized,
      id: doc.id,
      dewormed: doc.data().dewormed,
      vaccinated: doc.data().vaccinated,
      ownerName: doc.data().ownerName,
    }));
    setCats(tempCats);
    // const searchParams = window.localStorage.getItem("searchParam");

    // if (searchParams && searchParams.indexOf("ascending") > -1) {
    //   const searchParam = JSON.parse(searchParams).param;
    //   const ascending = JSON.parse(searchParams).ascending;
    //   setCats(sortByParam(searchParam, tempCats, ascending));
    // } else {
    //   if (searchParams) {
    //     window.localStorage.removeItem("searchParam");
    //   }
    //   setCats(tempCats);
    // }
  };

  const returnCat = (id: string) => {
    const selectedCat = cats.find((cat) => cat.id === id);
    return selectedCat;
  };

  const updateCat = async (cat: ICat, changes: {}) => {
    const catDoc = doc(db, catsDB, cat.id!);
    await updateDoc(catDoc, changes);
  };

  const addNewCat = async (newCat: ICat) => {
    await addDoc(catsCollectionRef, newCat);
  };
  useEffect(() => {
    if (user) {
      getCats();
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    setSearchResults(cats);
  }, [cats]);

  useEffect(() => {
    if (search.length > 0) {
      const filteredResults = cats.filter(
        (cat) =>
          cat.name && cat.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults(cats);
    }
  }, [search, cats]);

  return (
    <CatContext.Provider
      value={{
        setSearch,
        searchResults,
        search,
        returnCat,
        updateCat,
        getCats,
        addNewCat,
      }}
    >
      {children}
    </CatContext.Provider>
  );
};

export default CatProvider;
