import React from "react";
import { ICatComp } from "../../interfaces/cat";
import { returnDate } from "../../utils/utils";

const CatComp = ({ selectedCat }: ICatComp) => {
  return (
    <>
      <div>{selectedCat.name}</div>
      <div>{selectedCat.ownerName}</div>
      <div>{selectedCat.gender}</div>
      <div>{returnDate(selectedCat.birthdate.seconds)}</div>
      <div>{selectedCat.sterilized ? "Sterilized" : "Not sterilized"}</div>
      <div>{selectedCat.vaccinated ? "Vaccinated" : "Unvaccinated"}</div>
      <div>{selectedCat.dewormed ? "Dewormed" : "Not dewormed"}</div>
    </>
  );
};

export default CatComp;
