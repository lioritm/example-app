import React from "react";
import { CatContext } from "../../context/CatContext";
import { Timestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { ICat, IAddEditCat } from "../../interfaces/cat";
import { useNavigate } from "react-router-dom";
import "./AddEditCat.css";
import { formatDate } from "../../utils/utils";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const watchedValue = {
    vaccinated: watch("vaccinated"),
    birthdate: watch("birthdate"),
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
      updateCat(cat!, data as ICat).then(
        () => {
          if (setEditMode) setEditMode(false);
          if (setSelectedCat) setSelectedCat(data as ICat);
        },
        (err) => {
          alert(err);
        }
      );
    } else {
      addNewCat(data as ICat).then(
        () => {
          navigate("/");
        },
        (err) => {
          alert(err);
        }
      );
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
      setValue("dateOfDeworm", false);
    }
    if (watchedValue.vaccinated === "false") {
      setValue("dateOfVaccine", false);
    }
    if (watchedValue.sterilized === "false") {
      setValue("dateOfsterilization", false);
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
          <div className="box-item box-key">{t("cats.props.name")}:</div>
          <div className="box-item box-value">
            <input
              type="text"
              className={errors.name ? "form-error" : ""}
              placeholder={t("cats.props.name")}
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 40,
              })}
            />
            {errors.name && (
              <span className="error">{t("cats.cat.form.errors.name")}</span>
            )}
          </div>
        </div>
        <div className="flex cat-info-box">
          <div className="box-item box-key">{t("cats.props.ownerName")}:</div>
          <div className="box-item box-value">
            <input
              className={errors.ownerName ? "form-error" : ""}
              type="text"
              placeholder={t("cats.props.ownerName")}
              {...register("ownerName", {
                required: true,
                minLength: 3,
                maxLength: 40,
              })}
            />
            {errors.ownerName && (
              <span className="error">
                {t("cats.cat.form.errors.ownerName")}
              </span>
            )}
          </div>
        </div>
        <div className="flex cat-info-box">
          <div className="box-item box-key">{t("cats.props.gender")}:</div>
          <div className="box-item box-value">
            <select
              {...register("gender", {
                required: true,
              })}
              className={errors.gender ? "form-error" : ""}
              defaultValue={""}
            >
              <option className="disabled" value="" disabled>
                {t("cats.cat.form.gender")}
              </option>
              <option value="Male">{t("cats.cat.form.male")}</option>
              <option value="Female">{t("cats.cat.form.female")}</option>
            </select>
            {errors.gender && (
              <span className="error">{t("cats.cat.form.errors.gender")}</span>
            )}
          </div>
        </div>
        <div className="flex cat-info-box">
          <div className="box-item box-key">{t("cats.props.birthdate")}:</div>
          <div className="box-item box-value">
            <input
              type="date"
              className={errors.birthdate ? "form-error" : ""}
              {...register("birthdate", {
                required: true,
                min: formatDate(new Date(), -25),
                max: new Date().toISOString().split("T")[0],
              })}
            />
            {errors.birthdate && (
              <span className="error">
                {t("cats.cat.form.errors.birthdate")}
              </span>
            )}
          </div>
        </div>

        <div className="flex cat-info-box">
          <div className="box-item box-key">{t("cats.props.sterilized")}:</div>
          <div className="box-item box-value">
            <select
              {...register("sterilized", {
                required: !editMode,
              })}
              className={errors.sterilized ? "form-error" : ""}
              defaultValue={""}
            >
              <option className="disabled" value="" disabled>
                Select sterilization status
              </option>
              <option value="true">{t("general.yes")}</option>
              <option value="false">{t("general.no")}</option>
            </select>
            {errors.sterilized && (
              <span className="error">
                {t("cats.cat.form.errors.sterilization")}
              </span>
            )}
          </div>
        </div>

        {(watchedValue.sterilized === "true" ||
          watchedValue.dateOfsterilization) && (
          <div className="flex cat-info-box">
            <div className="box-item box-key">
              {t("cats.cat.form.dateOfsterilization")}
            </div>
            <div className="box-item box-value">
              <input
                type="date"
                className={errors.dateOfsterilization ? "form-error" : ""}
                {...register("dateOfsterilization", {
                  required: watchedValue.sterilized === "true",
                  min: watchedValue.birthdate
                    ? formatDate(new Date(watchedValue.birthdate), undefined, 3)
                    : 0,
                  max: new Date().toISOString().split("T")[0],
                })}
              />
              {errors.dateOfsterilization && (
                <span className="error">
                  {t("cats.cat.form.errors.sterilizationDate")}
                </span>
              )}
            </div>
          </div>
        )}
        <div className="flex cat-info-box">
          <div className="box-item box-key">{t("cats.props.vaccinated")}:</div>
          <div className="box-item box-value">
            <select
              {...register("vaccinated", {
                required: !editMode,
              })}
              className={errors.vaccinated ? "form-error" : ""}
              defaultValue={""}
            >
              <option className="disabled" value="" disabled>
                {t("cats.cat.form.vaccination")}
              </option>
              <option value="true">{t("general.yes")}</option>
              <option value="false">{t("general.no")}</option>
            </select>
            {errors.vaccinated && (
              <span className="error">
                {t("cats.cat.form.errors.vaccination")}
              </span>
            )}
          </div>
        </div>

        {(watchedValue.vaccinated === "true" || watchedValue.dateOfVaccine) && (
          <div className="flex cat-info-box">
            <div className="box-item box-key">
              {t("cats.cat.form.dateOfVaccination")}:
            </div>
            <div className="box-item box-value">
              <input
                type="date"
                className={errors.dateOfVaccine ? "form-error" : ""}
                {...register("dateOfVaccine", {
                  required: watchedValue.vaccinated === "true",
                  min: watchedValue.birthdate
                    ? formatDate(new Date(watchedValue.birthdate), undefined, 1)
                    : 0,
                  max: new Date().toISOString().split("T")[0],
                })}
              />
              {errors.dateOfVaccine && (
                <span className="error">
                  {t("cats.cat.form.errors.vaccinationDate")}
                </span>
              )}
            </div>
          </div>
        )}
        <div className="flex cat-info-box">
          <div className="box-item box-key">{t("cats.props.dewormed")}:</div>
          <div className="box-item box-value">
            <select
              {...register("dewormed", {
                required: !editMode,
              })}
              className={errors.dewormed ? "form-error" : ""}
              defaultValue={""}
            >
              <option className="disabled" value="" disabled>
                {t("cats.cat.form.deworming")}
              </option>
              <option value="true">{t("general.yes")}</option>
              <option value="false">{t("general.no")}</option>
            </select>
            {errors.dewormed && (
              <span className="error">
                {t("cats.cat.form.errors.deworming")}
              </span>
            )}
          </div>
        </div>

        {(watchedValue.dewormed === "true" || watchedValue.dateOfDeworm) && (
          <div className="flex cat-info-box">
            <div className="box-item box-key">
              {" "}
              {t("cats.cat.form.dateOfDeworming")}
            </div>
            <div className="box-item box-value">
              <input
                type="date"
                className={errors.dateOfDeworm ? "form-error" : ""}
                placeholder="date of deworming"
                {...register("dateOfDeworm", {
                  required: watchedValue.dewormed === "true",
                  min: watchedValue.birthdate
                    ? formatDate(new Date(watchedValue.birthdate))
                    : 0,
                  max: new Date().toISOString().split("T")[0],
                })}
              />
              {errors.dateOfDeworm && (
                <span className="error">
                  {t("cats.cat.form.errors.dewormingDate")}
                </span>
              )}
            </div>
          </div>
        )}

        <input
          type="submit"
          className="general-button"
          value={t("general.submit")}
        />
      </form>
    </div>
  );
};

export default AddEditCat;
