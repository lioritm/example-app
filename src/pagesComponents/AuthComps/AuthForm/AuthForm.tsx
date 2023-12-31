import React from "react";
import { IAuthCred, IAuthForm } from "../../../interfaces/general";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AuthForm = ({
  type,
  handleSubmit,
  error,
  authenticating,
  setAuthenticating,
}: IAuthForm) => {
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
          <label htmlFor="userName">User Name</label>
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
            <label htmlFor="password">Password</label>
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
      <div className="error">{error}</div>
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
            ? "Log in"
            : type === "signup"
            ? "Sign up"
            : "Reset Password"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
