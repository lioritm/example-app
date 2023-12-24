import React from "react";
import { CatContext } from "../../context/CatContext";
import { useParams, useLocation } from "react-router-dom";
import { ICat } from "../../interfaces/cat";
import Loader from "../../shared/components/Loader/Loader";
import CatComp from "../../pagesComponents/Cat/CatComp";
import AddEditCat from "../../pagesComponents/AddEditCat/AddEditCat";

const Cat = () => {
  const { catId } = useParams();
  const location = useLocation();

  const { returnCat } = React.useContext(CatContext);
  const [selectedCat, setSelectedCat] = React.useState<ICat>(
    returnCat(catId!)!
  );
  const [editMode, setEditMode] = React.useState<boolean>(!!location.search);

  React.useEffect(() => {
    if (catId) {
      const cat = returnCat(catId);
      setSelectedCat(cat!);
    }
  }, [catId, returnCat]);

  React.useEffect(() => {
    console.log(editMode);
  }, [editMode]);
  return (
    <section>
      <h1>Cat Management Board</h1>
      {!selectedCat ? (
        <div className="spinner-container">
          <Loader />
        </div>
      ) : (
        <>
          <CatComp selectedCat={selectedCat} setSelectedCat={setSelectedCat} />
          {editMode && (
            <AddEditCat
              editMode={editMode}
              cat={selectedCat}
              setEditMode={setEditMode}
              setSelectedCat={setSelectedCat}
            />
          )}
        </>
      )}
    </section>
  );
};

export default Cat;
