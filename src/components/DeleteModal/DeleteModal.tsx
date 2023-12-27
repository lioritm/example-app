import React from "react";
import Modal from "../Modal/Modal";
import { IModal } from "../../interfaces/general";
import { CatContext } from "../../context/CatContext";
import { IDeleteModal } from "../../interfaces/cat";
import { useNavigate } from "react-router-dom";
export const DeleteModal = ({ id, closeModal }: IDeleteModal) => {
  const { deleteCat } = React.useContext(CatContext);
  const navigate = useNavigate();
  const handleDelete = (id: string) => {
    deleteCat(id).then(
      () => {
        navigate("/");
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const DeleteModalProps: IModal = {
    cancelModal: closeModal,
    okModal: () => {
      handleDelete(id);
      closeModal();
    },
    okText: "Approve",
    cancelText: "Cancel",
    title: "Delete cat",
    content: "Are you sure you want to delete this cat from the system?",
  };

  return <Modal {...DeleteModalProps} />;
};
