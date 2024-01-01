import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import { IAuthContainer } from "../../../interfaces/auth";
const AuthContainer = ({ type, children }: IAuthContainer) => {
  const { t } = useTranslation();
  const pageTitle = `auth.${type}`;
  return (
    <div className="login-page">
      <h1>{t("auth.title")}</h1>
      <div className="login-wrapper">
        <div className="login-container">
          <h2>{t(pageTitle)}</h2>
          {children}
          {type === "login" && (
            <>
              <div className="forgot-wrapper">
                <Link className="forgot" to="/reset-password">
                  {t("auth.forgotLink")}
                </Link>
              </div>
              <div className="forgot-wrapper">
                <Link className="forgot" to="/create-new-user">
                  {t("auth.newUserLink")}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      {type !== "login" && (
        <div className="back-to-login">
          <Link to="/">
            <span className="back">
              <FaArrowLeft />
              <span>{t("auth.backToLogin")}</span>
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthContainer;
