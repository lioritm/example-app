import React from "react";
import { Link } from "react-router-dom";
import { returnDate } from "../../utils/utils";
import { catList } from "../../interfaces/cat";

const CatList = ({ cats }: catList) => {
  return (
    <div>
      <div>
        <span>Cat Name</span>
        <span>Gender</span>
        <span>Birthdate</span>
        <span>Sterilized</span>
        <span>Vaccinated</span>
        <span>Dewormed</span>
        <span>edit</span>
      </div>
      <div>
        {cats.map((cat) => {
          return (
            <div key={cat.id}>
              <Link to={`/cats/${cat.id}`}>
                <span>{cat.name}</span>
                <span>{cat.ownerName}</span>
                <span>{cat.gender}</span>
                <span>
                  {cat.birthdate ? returnDate(cat.birthdate.seconds) : ""}
                </span>
                <span>{cat.sterilized ? "Sterilized" : "No"}</span>
                <span>{cat.vaccinated ? "Vaccinated" : "Unvaccinated"}</span>
                <span>{cat.dewormed ? "Dewormed" : "Not dewormed"}</span>
              </Link>
              <Link to={`/cats/${cat.id}?edit`}>edit</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CatList;
