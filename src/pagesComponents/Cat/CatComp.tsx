import React from "react";
import { ICatComp } from "../../interfaces/cat";
import { returnDate } from "../../utils/utils";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import "./CatComp.css";
import { DeleteModal } from "../../components/DeleteModal/DeleteModal";
import { useTranslation } from "react-i18next";

const CatComp = ({ selectedCat, setEditMode }: ICatComp) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const handleDelete = (id: string) => {
    setOpenModal(true);
  };
  return (
    <>
      <div className="flex action-buttons">
        <span
          role="button"
          className="flex action-button edit"
          onClick={() => setEditMode(true)}
        >
          <FaRegEdit /> <span className="action">{t("cats.actions.edit")}</span>
        </span>
        <span
          role="button"
          className="flex action-button delete"
          onClick={() => handleDelete(selectedCat.id)}
        >
          <FaTrash /> <span className="action">{t("cats.actions.delete")}</span>
        </span>
      </div>
      <div className="cat-info-container">
        <div className="flex cat-info-box">
          <div className="box-item box-key">{t("cats.props.name")}:</div>
          <div className="box-item box-value">{selectedCat.name}</div>
        </div>
        <div className="flex cat-info-box">
          <div className="box-item box-key">{t("cats.props.ownerName")}:</div>
          <div className="box-item box-value">{selectedCat.ownerName}</div>
        </div>
        <div className="flex cat-info-box">
          <div className="box-item box-key">{t("cats.props.gender")}:</div>
          <div className="box-item box-value">{selectedCat.gender}</div>
        </div>
        <div className="flex cat-info-box">
          <div className="box-item box-key">{t("cats.props.birthdate")}:</div>
          <div className="box-item box-value">
            {returnDate(selectedCat.birthdate.seconds)}
          </div>
        </div>
        <div className="flex cat-info-box">
          <div className="box-item box-key">{t("cats.props.sterilized")}:</div>
          <div className="box-item box-value">
            {selectedCat.sterilized ? "Yes" : "No"}
          </div>
        </div>

        {selectedCat.dateOfsterilization && (
          <div className="flex cat-info-box">
            <div className="box-item box-key">
              {t("cats.props.dateOfsterilization")}:
            </div>
            <div className="box-item box-value">
              {returnDate(selectedCat.dateOfsterilization.seconds)}
            </div>
          </div>
        )}
        <div className="flex cat-info-box">
          <div className="box-item box-key">{t("cats.props.vaccinated")}:</div>
          <div className="box-item box-value">
            {selectedCat.vaccinated ? "Yes" : "No"}
          </div>
        </div>
        {selectedCat.dateOfVaccine && (
          <div className="flex cat-info-box">
            <div className="box-item box-key">
              {t("cats.props.dateOfVaccination")}:
            </div>
            <div className="box-item box-value">
              {returnDate(selectedCat.dateOfVaccine.seconds)}
            </div>
          </div>
        )}
        <div className="flex cat-info-box">
          <div className="box-item box-key">{t("cats.props.dewormed")}:</div>
          <div className="box-item box-value">
            {selectedCat.dewormed ? "Yes" : "No"}
          </div>
        </div>
        {selectedCat.dateOfDeworm && (
          <div className="flex cat-info-box">
            <div className="box-item box-key">
              {t("cats.props.dateOfDeworming")}:
            </div>
            <div className="box-item box-value">
              {returnDate(selectedCat.dateOfDeworm.seconds)}
            </div>
          </div>
        )}
      </div>
      {openModal && (
        <DeleteModal
          id={selectedCat.id}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default CatComp;
