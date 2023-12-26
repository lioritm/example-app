import React from "react";
import { CatContext } from "../../context/CatContext";
import { Timestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { ICat, IAddEditCat } from "../../interfaces/cat";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
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
    <>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Cat name" {...register("name")} />
        <input
          type="text"
          placeholder="Owner name"
          {...register("ownerName")}
        />
        <select {...register("gender")} required defaultValue={"DEFAULT"}>
          <option className="disabled" value="DEFAULT" disabled>
            Select gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="date"
          placeholder="date of birth"
          {...register("birthdate")}
        />
        <select {...register("sterilized")} defaultValue={"DEFAULT"}>
          <option className="disabled" value="DEFAULT" disabled>
            Select sterilization status
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        {(watchedValue.sterilized === "true" ||
          watchedValue.dateOfsterilization) && (
          <input
            type="date"
            placeholder="date of sterilization"
            {...register("dateOfsterilization")}
          />
        )}

        <select {...register("vaccinated")} defaultValue={"DEFAULT"}>
          <option className="disabled" value="DEFAULT" disabled>
            Select vaccination status
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        {(watchedValue.vaccinated === "true" || watchedValue.dateOfVaccine) && (
          <input
            type="date"
            placeholder="date of vaccination"
            {...register("dateOfVaccine")}
          />
        )}

        <select {...register("dewormed")} defaultValue={"DEFAULT"}>
          <option className="disabled" value="DEFAULT" disabled>
            Select deworming status
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        {(watchedValue.dewormed === "true" || watchedValue.dateOfDeworm) && (
          <input
            type="date"
            placeholder="date of deworming"
            {...register("dateOfDeworm")}
          />
        )}

        <input type="submit" />
      </form>
    </>
  );
};

export default AddEditCat;
