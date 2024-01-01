import React from "react";
import { Link } from "react-router-dom";
import { returnDate } from "../../utils/utils";
import { catList } from "../../interfaces/cat";
import { sortByParam } from "../../utils/utils";
import "./CatList.css";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { DeleteModal } from "../../components/DeleteModal/DeleteModal";
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa";
import { UserAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const CatList = ({ cats, setCats }: catList) => {
  const { user } = UserAuth();
  const { t } = useTranslation();
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
                {t("cats.props.name")}
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
                {t("cats.props.ownerName")}
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
                {t("cats.props.gender")}
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
                {t("cats.props.birthdate")}
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
                {t("cats.props.sterilized")}
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
                {t("cats.props.vaccinated")}
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
                {t("cats.props.dewormed")}
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
              <span className="table-cell"> {t("cats.actions.edit")}</span>
              <span className="table-cell"> {t("cats.actions.delete")}</span>
            </span>
          </div>
        </div>
        <div className="table-body">
          {cats.map((cat) => {
            return (
              <div key={cat.id} className="table-row">
                <Link className="table-row-devided" to={`/cats/${cat.id}`}>
                  <span className="table-cell">
                    <span className="for-mobile">{t("cats.props.name")}: </span>
                    {cat.name}
                  </span>
                  <span className="table-cell">
                    <span className="for-mobile">
                      {t("cats.props.ownerName")}
                    </span>
                    {cat.ownerName}
                  </span>
                  <span className="table-cell">
                    <span className="for-mobile">
                      {t("cats.props.gender")}:
                    </span>
                    {cat.gender}
                  </span>
                  <span className="table-cell">
                    <span className="for-mobile">
                      {t("cats.props.birthdate")}:
                    </span>
                    {cat.birthdate ? returnDate(cat.birthdate.seconds) : ""}
                  </span>
                  <span className="table-cell">
                    <span className="for-mobile">
                      {t("cats.props.sterilized")}:
                    </span>
                    {cat.sterilized ? t("general.yes") : t("general.no")}
                  </span>
                  <span className="table-cell">
                    <span className="for-mobile">
                      {t("cats.props.vaccinated")}:
                    </span>

                    {cat.vaccinated ? t("general.yes") : t("general.no")}
                  </span>
                  <span className="table-cell">
                    <span className="for-mobile">
                      {t("cats.props.dewormed")}:
                    </span>
                    {cat.dewormed ? t("general.yes") : t("general.no")}
                  </span>
                </Link>
                <span className="actions">
                  <Link className="table-cell" to={`/cats/${cat.id}?edit`}>
                    <FaRegEdit />
                    <span className="for-mobile">{t("cats.actions.edit")}</span>
                  </Link>
                  <button
                    title={
                      user.email !== cat.creator
                        ? t("cats.actions.deleteWarning")
                        : t("cats.actions.delete")
                    }
                    disabled={user.email !== cat.creator}
                    className="table-cell"
                    onClick={() => handleDelete(cat.id!)}
                  >
                    <FaTrash
                      className={user.email !== cat.creator ? "disabled" : ""}
                    />
                    <span className="for-mobile">
                      {t("cats.actions.delete")}
                      {user.email !== cat.creator && (
                        <span className="delete-warning">
                          {t("cats.actions.deleteWarning")}
                        </span>
                      )}
                    </span>
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
