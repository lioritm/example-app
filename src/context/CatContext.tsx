import { createContext, useState, useEffect } from "react";
import { ContextProps, CatsContextInterface } from "../interfaces/contexts";
import { ICat } from "../interfaces/cat";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
  // query,
  // orderBy,
  //startAfter,
  // limit,
} from "firebase/firestore";
import { db, catsDB } from "../config/firebase";
import { UserAuth } from "./AuthContext";
import { v4 as uuidv4 } from "uuid";

//import { CreateCatObj } from "../utils/createData";

//import { sortByParam } from "../utils/utils";
export const CatContext = createContext<CatsContextInterface>(
  {} as CatsContextInterface
);

const CatProvider = ({ children }: ContextProps) => {
  const [cats, setCats] = useState<ICat[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ICat[]>([]);
  const { user } = UserAuth();
  const catsCollectionRef = collection(db, catsDB);
  // const first = query(catsCollectionRef, orderBy("name"), limit(5));

  const getCats = async () => {
    // const data = await getDocs(first);
    const data = await getDocs(catsCollectionRef);
    const tempCats = data.docs.map((doc) => ({
      ...doc.data(),
      creator: doc.data().creator,
      name: doc.data().name,
      gender: doc.data().gender,
      birthdate: doc.data().birthdate,
      sterilized: doc.data().sterilized,
      id: doc.id ? doc.id : uuidv4(),
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
    const isCat = (cat: ICat) => cat.id === id;
    const selectedCatIndex = cats.findIndex(isCat);
    return {
      selectedCatIndex,
      selectedCat: cats[selectedCatIndex],
    };
  };

  const updateCat = async (cat: ICat, changes: {}) => {
    const catDoc = doc(db, catsDB, cat.id!);
    const tempCatIndex = returnCat(cat.id!).selectedCatIndex;
    const tempCats = [...cats];
    tempCats[tempCatIndex] = changes as ICat;
    setCats(tempCats);
    await updateDoc(catDoc, changes);
  };

  const addNewCat = async (newCat: ICat) => {
    newCat.creator = user.email;
    const tempCats = [...cats];
    tempCats.push(newCat);
    setCats(tempCats);
    await addDoc(catsCollectionRef, newCat);
  };

  const deleteCat = async (id: string) => {
    const catDoc = doc(db, catsDB, id);
    const tempCats = cats.filter((cat) => cat.id !== id);
    try {
      await deleteDoc(catDoc);
      setCats(tempCats);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    if (user) {
      getCats();

      //addNewCat(CreateCatObj());
    }

    // eslint-disable-next-line
  }, [user]);
  // const deleteAll = (cats: ICat[]) => {
  //   cats.forEach((cat) => {
  //     if (cat.ownerName !== "Liorit" && cat.ownerName !== "Liat") {
  //       deleteCat(cat.id!);
  //     }
  //   });
  // };

  useEffect(() => {
    setSearchResults(cats);
  }, [cats]);

  useEffect(() => {
    if (search.length > 0) {
      const filteredResults = cats.filter(
        (cat) =>
          (cat.name && cat.name.toLowerCase().includes(search.toLowerCase())) ||
          (cat.ownerName &&
            cat.ownerName.toLowerCase().includes(search.toLowerCase()))
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
        addNewCat,
        deleteCat,
        getCats,
      }}
    >
      {children}
    </CatContext.Provider>
  );
};

export default CatProvider;
