import React from "react";
import { IModal } from "../../interfaces/general";
import { FaTimes } from "react-icons/fa";
import "./Modal.css";
const Modal = ({
  cancelModal,
  okModal,
  title,
  content,
  okText,
  cancelText,
}: IModal) => {
  return (
    <div>
      <div className="overlay"></div>
      <div className="modal-content">
        <div className="close-button" onClick={cancelModal}>
          <FaTimes />
        </div>
        {title && <div className="modal-title">{title}</div>}
        {content && <div className="modal-text ">{content} </div>}
        {((okModal && okText) || cancelText) && (
          <div className="buttons">
            {okModal && okText && (
              <button onClick={okModal} className="general-button  ok-button">
                {okText}
              </button>
            )}
            {cancelText && (
              <button
                onClick={cancelModal}
                className="general-button cancel-button"
              >
                {cancelText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
