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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
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
        "id",
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
            <input
              type="text"
              className={errors.name ? "form-error" : ""}
              placeholder="Cat name"
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 40,
              })}
            />
            {errors.name && (
              <span className="error">Please check the cat's name</span>
            )}
          </div>
        </div>
        <div className="flex cat-info-box">
          <div className="box-item box-key">Owner name:</div>
          <div className="box-item box-value">
            <input
              className={errors.ownerName ? "form-error" : ""}
              type="text"
              placeholder="Owner name"
              {...register("ownerName", {
                required: true,
                minLength: 3,
                maxLength: 40,
              })}
            />
            {errors.ownerName && (
              <span className="error">Please check the owner's name</span>
            )}
          </div>
        </div>
        <div className="flex cat-info-box">
          <div className="box-item box-key">Gender:</div>
          <div className="box-item box-value">
            <select
              {...register("gender", {
                required: true,
              })}
              className={errors.gender ? "form-error" : ""}
              defaultValue={""}
            >
              <option className="disabled" value="" disabled>
                Select gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && (
              <span className="error">Please select gender</span>
            )}
          </div>
        </div>
        <div className="flex cat-info-box">
          <div className="box-item box-key">Birthdate:</div>
          <div className="box-item box-value">
            <input
              type="date"
              className={errors.birthdate ? "form-error" : ""}
              placeholder="date of birth"
              {...register("birthdate", {
                required: true,
              })}
            />
            {errors.birthdate && (
              <span className="error">Please enter birthdate</span>
            )}
          </div>
        </div>
        <div className="flex cat-info-box">
          <div className="box-item box-key">Sterilized:</div>
          <div className="box-item box-value">
            <select
              className={errors.sterilized ? "form-error" : ""}
              {...register("sterilized", {
                required: true,
              })}
              defaultValue={""}
            >
              <option className="disabled" value="" disabled>
                Select sterilization status
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.sterilized && (
              <span className="error">Please select sterilization status</span>
            )}
          </div>
        </div>

        {(watchedValue.sterilized === "true" ||
          watchedValue.dateOfsterilization) && (
          <div className="flex cat-info-box">
            <div className="box-item box-key">Sterilization date:</div>
            <div className="box-item box-value">
              <input
                type="date"
                className={errors.dateOfsterilization ? "form-error" : ""}
                placeholder="date of sterilization"
                {...register("dateOfsterilization", {
                  required: watchedValue.sterilized === "true",
                })}
              />
              {errors.dateOfsterilization && (
                <span className="error">Please add sterilization date</span>
              )}
            </div>
          </div>
        )}
        <div className="flex cat-info-box">
          <div className="box-item box-key">Vaccinated:</div>
          <div className="box-item box-value">
            <select
              {...register("vaccinated", {
                required: true,
              })}
              className={errors.vaccinated ? "form-error" : ""}
              defaultValue={""}
            >
              <option className="disabled" value="" disabled>
                Select vaccination status
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.vaccinated && (
              <span className="error">Please select vaccination status</span>
            )}
          </div>
        </div>

        {(watchedValue.vaccinated === "true" || watchedValue.dateOfVaccine) && (
          <div className="flex cat-info-box">
            <div className="box-item box-key">Last vaccination date:</div>
            <div className="box-item box-value">
              <input
                type="date"
                className={errors.dateOfVaccine ? "form-error" : ""}
                placeholder="date of vaccination"
                {...register("dateOfVaccine", {
                  required: watchedValue.vaccinated === "true",
                })}
              />
              {errors.dateOfVaccine && (
                <span className="error">Please add vaccination date</span>
              )}
            </div>
          </div>
        )}
        <div className="flex cat-info-box">
          <div className="box-item box-key">Dewormed:</div>
          <div className="box-item box-value">
            <select
              {...register("dewormed", {
                required: true,
              })}
              className={errors.dewormed ? "form-error" : ""}
              defaultValue={""}
            >
              <option className="disabled" value="" disabled>
                Select deworming status
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.dewormed && (
              <span className="error">Please select deworming status</span>
            )}
          </div>
        </div>

        {(watchedValue.dewormed === "true" || watchedValue.dateOfDeworm) && (
          <div className="flex cat-info-box">
            <div className="box-item box-key">Last deworming date:</div>
            <div className="box-item box-value">
              <input
                type="date"
                className={errors.dateOfDeworm ? "form-error" : ""}
                placeholder="date of deworming"
                {...register("dateOfDeworm", {
                  required: watchedValue.dewormed === "true",
                })}
              />
              {errors.dateOfDeworm && (
                <span className="error">Please add deworming date</span>
              )}
            </div>
          </div>
        )}

        <input type="submit" className="general-button" />
      </form>
    </div>
  );
};

export default AddEditCat;
