import React from "react";
import AddEditCat from "../../pagesComponents/AddEditCat/AddEditCat";
import { Link } from "react-router-dom";

const AddCatPage = () => {
  return (
    <section className="container page">
      <Link to="/">Back</Link>
      <h1>Add a new cat</h1>
      <AddEditCat editMode={false} />
    </section>
  );
};

export default AddCatPage;
