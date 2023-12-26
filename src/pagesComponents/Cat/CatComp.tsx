import React from "react";
import { ICatComp } from "../../interfaces/cat";
import { returnDate } from "../../utils/utils";

const CatComp = ({ selectedCat }: ICatComp) => {
  return (
    <>
      <div className="flex cat-info-box">
        <div className="box-item box-key">Cat name</div>
        <div className="box-item box-value">{selectedCat.name}</div>
      </div>
      <div className="flex">
        <div>Owner name</div>
        <div>{selectedCat.ownerName}</div>
      </div>
      <div className="flex">
        <div>Gender</div>
        <div>{selectedCat.gender}</div>
      </div>
      <div className="flex">
        <div>Birthdate</div>
        <div>{returnDate(selectedCat.birthdate.seconds)}</div>
      </div>
      <div className="flex">
        <div>Sterilized</div>
        <div>{selectedCat.sterilized ? "Yes" : "No"}</div>
      </div>
      {selectedCat.dateOfsterilization && (
        <div className="flex">
          <div>Sterilization date</div>
          <div>{returnDate(selectedCat.dateOfsterilization.seconds)}</div>
        </div>
      )}
      <div className="flex">
        <div>Vaccinated</div>
        <div>{selectedCat.vaccinated ? "Yes" : "No"}</div>
      </div>
      {selectedCat.dateOfVaccine && (
        <div className="flex">
          <div>Last vaccination date</div>
          <div>{returnDate(selectedCat.dateOfVaccine.seconds)}</div>
        </div>
      )}
      <div className="flex">
        <div>Dewormed</div>
        <div>{selectedCat.dewormed ? "Yes" : "No"}</div>
      </div>
      {selectedCat.dateOfDeworm && (
        <div className="flex">
          <div>Last deworming date</div>
          <div>{returnDate(selectedCat.dateOfDeworm.seconds)}</div>
        </div>
      )}
    </>
  );
};

export default CatComp;
