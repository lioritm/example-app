import React from "react";
import { Link } from "react-router-dom";
import { returnDate } from "../../utils/utils";
import { catList } from "../../interfaces/cat";
import { sortByParam } from "../../utils/utils";
import "./CatList.css";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { DeleteModal } from "../../components/DeleteModal/DeleteModal";
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa";

const CatList = ({ cats, setCats }: catList) => {
  const [selectedCat, setSelectedCat] = React.useState<string | null>(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
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
    setSelectedCat(id);
    setOpenModal(true);
  };
  return (
    <>
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
                {sorting.key !== "name" ? (
                  <FaSort />
                ) : sorting.ascending ? (
                  <FaSortDown />
                ) : (
                  <FaSortUp />
                )}
              </span>
              <span
                className="table-cell pointer"
                role="button"
                onClick={() => applySorting("ownerName")}
              >
                Owner Name
                {sorting.key !== "ownerName" ? (
                  <FaSort />
                ) : sorting.ascending ? (
                  <FaSortDown />
                ) : (
                  <FaSortUp />
                )}
              </span>
              <span
                className="table-cell pointer"
                role="button"
                onClick={() => applySorting("gender")}
              >
                Gender
                {sorting.key !== "gender" ? (
                  <FaSort />
                ) : sorting.ascending ? (
                  <FaSortDown />
                ) : (
                  <FaSortUp />
                )}
              </span>
              <span
                className="table-cell pointer"
                role="button"
                onClick={() => applySorting("birthdate")}
              >
                Birthdate
                {sorting.key !== "birthdate" ? (
                  <FaSort />
                ) : sorting.ascending ? (
                  <FaSortDown />
                ) : (
                  <FaSortUp />
                )}
              </span>
              <span
                className="table-cell pointer"
                role="button"
                onClick={() => applySorting("sterilized")}
              >
                Sterilized
                {sorting.key !== "sterilized" ? (
                  <FaSort />
                ) : sorting.ascending ? (
                  <FaSortDown />
                ) : (
                  <FaSortUp />
                )}
              </span>
              <span
                className="table-cell pointer"
                role="button"
                onClick={() => applySorting("vaccinated")}
              >
                Vaccinated
                {sorting.key !== "vaccinated" ? (
                  <FaSort />
                ) : sorting.ascending ? (
                  <FaSortDown />
                ) : (
                  <FaSortUp />
                )}
              </span>
              <span
                className="table-cell pointer"
                role="button"
                onClick={() => applySorting("dewormed")}
              >
                Dewormed
                {sorting.key !== "dewormed" ? (
                  <FaSort />
                ) : sorting.ascending ? (
                  <FaSortDown />
                ) : (
                  <FaSortUp />
                )}
              </span>
            </span>
            <span className="actions">
              <span className="table-cell">Edit</span>
              <span className="table-cell">Delete</span>
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
      {openModal && (
        <DeleteModal id={selectedCat!} closeModal={() => setOpenModal(false)} />
      )}
    </>
  );
};

export default CatList;
