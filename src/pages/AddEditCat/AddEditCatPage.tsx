import React from "react";
import AddEditCat from "../../pagesComponents/AddEditCat/AddEditCat";

const AddEditCatPage = () => {
  return (
    <div>
      <h1>Add a new cat</h1>
      <AddEditCat editMode={false} />
    </div>
  );
};

export default AddEditCatPage;
