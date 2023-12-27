import React from "react";
import { CatContext } from "../../context/CatContext";
import { Timestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { ICat, IAddEditCat } from "../../interfaces/cat";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./AddEditCat.css";
const AddEditCat = ({
  editMode,
  cat,
  setEditMode,
  setSelectedCat,
}: IAddEditCat) => {
  const { addNewCat, updateCat } = React.useContext(CatContext);
  const { register, handleSubmit, watch, setValue } = useForm();
  const navigate = useNavigate();
  const watchedValue = {
    vaccinated: watch("vaccinated"),
    dewormed: watch("dewormed"),
    sterilized: watch("sterilized"),
    dateOfsterilization: watch("dateOfsterilization"),
    dateOfDeworm: watch("dateOfDeworm"),
    dateOfVaccine: watch("dateOfVaccine"),
  };

  const onSubmit = handleSubmit((data) => {
    Object.keys(data).forEach((key) => {
      if (data[key] === "true") {
        data[key] = true;
      } else if (data[key] === "false") {
        data[key] = false;
      } else if (key.indexOf("date") > -1) {
        if (!data[key] || data[key].seconds === 0) {
          data[key] = "";
        } else {
          data[key] = Timestamp.fromDate(new Date(data[key]));
        }
      }
    });
    if (editMode) {
      updateCat(cat!, data as ICat).then(() => {
        if (setEditMode) setEditMode(false);
        if (setSelectedCat) setSelectedCat(data as ICat);
      });
    } else {
      data.id = uuidv4();
      addNewCat(data as ICat).then(() => {
        navigate("/");
      });
    }
  });

  React.useEffect(() => {
    if (editMode) {
      const fields = [
        "ownerName",
        "name",
        "gender",
        "birthdate",
        "dewormed",
        "vaccinated",
        "sterilized",
        "dateOfsterilization",
        "dateOfVaccine",
        "dateOfDeworm",
      ];
      fields.forEach((field) => {
        //@ts-ignore
        if (cat[field] && cat[field].seconds) {
          setValue(
            field,
            //@ts-ignore
            new Date(cat[field].seconds * 1000).toISOString().split("T")[0]
          );
        } else {
          //@ts-ignore
          setValue(field, cat[field]);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (watchedValue.dewormed === "false") {
      setValue("dateOfDeworm", null);
    }
    if (watchedValue.vaccinated === "false") {
      setValue("dateOfVaccine", null);
    }
    if (watchedValue.sterilized === "false") {
      setValue("dateOfsterilization", null);
    }
  }, [
    watchedValue.dewormed,
    watchedValue.vaccinated,
    watchedValue.sterilized,
    setValue,
  ]);
  return (
    <div className="cat-info-container">
      <form onSubmit={onSubmit}>
        <div className="flex cat-info-box">
          <div className="box-item box-key">Cat name:</div>
          <div className="box-item box-value">
            <input type="text" placeholder="Cat name" {...register("name")} />
          </div>
        </div>
        <div className="flex cat-info-box">
          <div className="box-item box-key">Owner name:</div>
          <div className="box-item box-value">
            {" "}
            <input
              type="text"
              placeholder="Owner name"
              {...register("ownerName")}
            />
          </div>
        </div>
        <div className="flex cat-info-box">
          <div className="box-item box-key">Gender:</div>
          <div className="box-item box-value">
            {" "}
            <select {...register("gender")} required defaultValue={""}>
              <option className="disabled" value="" disabled>
                Select gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="flex cat-info-box">
          <div className="box-item box-key">Birthdate:</div>
          <div className="box-item box-value">
            <input
              type="date"
              placeholder="date of birth"
              {...register("birthdate")}
            />
          </div>
        </div>
        <div className="flex cat-info-box">
          <div className="box-item box-key">Sterilized:</div>
          <div className="box-item box-value">
            <select {...register("sterilized")} defaultValue={""}>
              <option className="disabled" value="" disabled>
                Select sterilization status
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        {(watchedValue.sterilized === "true" ||
          watchedValue.dateOfsterilization) && (
          <div className="flex cat-info-box">
            <div className="box-item box-key">Sterilization date:</div>
            <div className="box-item box-value">
              <input
                type="date"
                placeholder="date of sterilization"
                {...register("dateOfsterilization")}
              />
            </div>
          </div>
        )}
        <div className="flex cat-info-box">
          <div className="box-item box-key">Vaccinated:</div>
          <div className="box-item box-value">
            <select {...register("vaccinated")} defaultValue={"DEFAULT"}>
              <option className="disabled" value="DEFAULT" disabled>
                Select vaccination status
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        {(watchedValue.vaccinated === "true" || watchedValue.dateOfVaccine) && (
          <div className="flex cat-info-box">
            <div className="box-item box-key">Last vaccination date:</div>
            <div className="box-item box-value">
              <input
                type="date"
                placeholder="date of vaccination"
                {...register("dateOfVaccine")}
              />
            </div>
          </div>
        )}
        <div className="flex cat-info-box">
          <div className="box-item box-key">Dewormed:</div>
          <div className="box-item box-value">
            <select {...register("dewormed")} defaultValue={"DEFAULT"}>
              <option className="disabled" value="DEFAULT" disabled>
                Select deworming status
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        {(watchedValue.dewormed === "true" || watchedValue.dateOfDeworm) && (
          <div className="flex cat-info-box">
            <div className="box-item box-key">Last deworming date:</div>
            <div className="box-item box-value">
              <input
                type="date"
                placeholder="date of deworming"
                {...register("dateOfDeworm")}
              />
            </div>
          </div>
        )}

        <input type="submit" className="general-button" />
      </form>
    </div>
  );
};

export default AddEditCat;
