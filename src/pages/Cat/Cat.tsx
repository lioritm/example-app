import React from "react";
import { CatContext } from "../../context/CatContext";
import { useParams, useLocation, Link } from "react-router-dom";
import { ICat } from "../../interfaces/cat";
import Loader from "../../shared/components/Loader/Loader";
import CatComp from "../../pagesComponents/Cat/CatComp";
import AddEditCat from "../../pagesComponents/AddEditCat/AddEditCat";
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Cat = () => {
  const { catId } = useParams();
  const location = useLocation();
  const { returnCat } = React.useContext(CatContext);
  const { t } = useTranslation();
  const [selectedCat, setSelectedCat] = React.useState<ICat>(
    returnCat(catId!)!.selectedCat
  );
  const [editMode, setEditMode] = React.useState<boolean>(!!location.search);

  React.useEffect(() => {
    if (catId) {
      const cat = returnCat(catId).selectedCat;
      setSelectedCat(cat!);
    }
  }, [catId, returnCat]);

  return (
    <section className="container page">
      <Link to="/" className="back">
        <FaArrowLeft />
        <span>{t("general.back")}</span>
      </Link>
      <h1>{t("cats.cat.pageTitle")}</h1>
      {!selectedCat ? (
        <div className="spinner-container">
          <Loader />
        </div>
      ) : (
        <>
          {editMode ? (
            <AddEditCat
              editMode={editMode}
              cat={selectedCat}
              setEditMode={setEditMode}
              setSelectedCat={setSelectedCat}
            />
          ) : (
            <CatComp
              setEditMode={setEditMode}
              selectedCat={selectedCat}
              setSelectedCat={setSelectedCat}
            />
          )}
        </>
      )}
    </section>
  );
};

export default Cat;
