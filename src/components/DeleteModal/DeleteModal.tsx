import React from "react";
import Modal from "../Modal/Modal";
import { IModal } from "../../interfaces/general";
import { CatContext } from "../../context/CatContext";
import { IDeleteModal } from "../../interfaces/cat";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const DeleteModal = ({ id, closeModal }: IDeleteModal) => {
  const { deleteCat } = React.useContext(CatContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleDelete = (id: string) => {
    deleteCat(id).then(
      () => {
        navigate("/");
      },
      (err) => {
        alert(err);
      }
    );
  };
  const DeleteModalProps: IModal = {
    cancelModal: closeModal,
    okModal: () => {
      handleDelete(id);
      closeModal();
    },
    okText: t("general.approve"),
    cancelText: t("general.cancel"),
    title: t("cats.actions.deleteModal.title"),
    content: t("cats.actions.deleteModal.content"),
  };

  return <Modal {...DeleteModalProps} />;
};
