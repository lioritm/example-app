import React from "react";
import { Link } from "react-router-dom";
import { returnDate } from "../../utils/utils";
import { catList } from "../../interfaces/cat";
import { CatContext } from "../../context/CatContext";
import { sortByParam } from "../../utils/utils";
import "./CatList.css";
import { FaRegEdit, FaTrash } from "react-icons/fa";

const CatList = ({ cats, setCats }: catList) => {
  const { deleteCat } = React.useContext(CatContext);
  const [sorting, setSorting] = React.useState<{
    key: string;
    ascending: boolean | null;
  }>({ key: "", ascending: null });
  function applySorting(key: string) {
    let asc;
    if (key === sorting.key) {
      asc = !sorting.ascending;
    } else {
      asc = true;
    }
    setSorting({ key: key, ascending: asc });
  }

  React.useEffect(() => {
    if (sorting.key !== "") {
      const catsCopy = [...cats];
      const sortedCats = sortByParam(sorting.key, catsCopy, sorting.ascending!);
      setCats(sortedCats);
    }

    // eslint-disable-next-line
  }, [sorting]);
  const handleDelete = (id: string) => {
    deleteCat(id).then(
      () => {
        alert("cat deleted succesfully");
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <div className="table">
      <div className="table-head">
        <div className="table-row">
          <span className="table-row-devided">
            <span
              className="table-cell pointer"
              role="button"
              onClick={() => applySorting("name")}
            >
              Cat Name
            </span>
            <span
              className="table-cell pointer"
              role="button"
              onClick={() => applySorting("ownerName")}
            >
              Owner Name
            </span>
            <span
              className="table-cell pointer"
              role="button"
              onClick={() => applySorting("gender")}
            >
              Gender
            </span>
            <span
              className="table-cell pointer"
              role="button"
              onClick={() => applySorting("birthdate")}
            >
              Birthdate
            </span>
            <span
              className="table-cell pointer"
              role="button"
              onClick={() => applySorting("sterilized")}
            >
              Sterilized
            </span>
            <span
              className="table-cell pointer"
              role="button"
              onClick={() => applySorting("vaccinated")}
            >
              Vaccinated
            </span>
            <span
              className="table-cell pointer"
              role="button"
              onClick={() => applySorting("dewormed")}
            >
              Dewormed
            </span>
          </span>
          <span className="actions">
            <span className="table-cell">edit</span>
            <span className="table-cell">delete</span>
          </span>
        </div>
      </div>
      <div className="table-body">
        {cats.map((cat) => {
          return (
            <div key={cat.id} className="table-row">
              <Link className="table-row-devided" to={`/cats/${cat.id}`}>
                <span className="table-cell">{cat.name}</span>
                <span className="table-cell">{cat.ownerName}</span>
                <span className="table-cell">{cat.gender}</span>
                <span className="table-cell">
                  {cat.birthdate ? returnDate(cat.birthdate.seconds) : ""}
                </span>
                <span className="table-cell">
                  {cat.sterilized ? "Yes" : "No"}
                </span>
                <span className="table-cell">
                  {cat.vaccinated ? "Yes" : "No"}
                </span>
                <span className="table-cell">
                  {cat.dewormed ? "Yes" : "No"}
                </span>
              </Link>
              <span className="actions">
                <Link className="table-cell" to={`/cats/${cat.id}?edit`}>
                  <FaRegEdit />
                </Link>
                <button
                  className="table-cell"
                  onClick={() => handleDelete(cat.id!)}
                >
                  <FaTrash />
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CatList;
