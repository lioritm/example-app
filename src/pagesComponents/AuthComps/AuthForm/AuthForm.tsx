import React from "react";
import { IAuthCred, IAuthForm } from "../../../interfaces/general";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const AuthForm = ({
  type,
  handleSubmit,
  error,
  authenticating,
  setAuthenticating,
}: IAuthForm) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [credentials, setCredentials] = React.useState<IAuthCred>({
    email: "",
    password: "",
  });
  const toggleView = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setAuthenticating(true);
        handleSubmit(credentials.email, credentials.password);
      }}
    >
      <div className="form-element">
        <div className="label">
          <label htmlFor="userName">{t("auth.userName")}</label>
        </div>
        <div>
          <input
            type="email"
            placeholder="User Name"
            id="userName"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setCredentials({
                ...credentials,
                email: event.target.value,
              })
            }
          />
        </div>
      </div>
      {(type === "login" || type === "signup") && (
        <div className="form-element">
          <div className="label">
            <label htmlFor="password">{t("auth.password")}</label>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setCredentials({
                  ...credentials,
                  password: event.target.value,
                })
              }
            />
            <div
              role="button"
              className="show-pass"
              onClick={toggleView}
              tabIndex={0}
            >
              {showPassword ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
            </div>
          </div>
        </div>
      )}
      <div className="error">{t(error)}</div>
      <div className="button-wrapper">
        <button
          className="general-button"
          disabled={
            authenticating || !credentials.email || type !== "forgot"
              ? !credentials.password
              : false
          }
        >
          {type === "login"
            ? t("auth.loginButton")
            : type === "signup"
            ? t("auth.signUp")
            : t("auth.reset")}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
