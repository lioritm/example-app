import React from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { showError } from "../../utils/utils";

const CreateNewUser = () => {
  const { signUp } = UserAuth();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [authenticating, setAuthenticating] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const toggleView = () => {
    setShowPassword((prevValue) => !prevValue);
  };
  const handleSubmit = async (event: React.SyntheticEvent) => {
    setAuthenticating(true);
    event.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/cats");
    } catch (err) {
      const typedError = err as Error;
      console.log(typedError);
      const error = showError(typedError?.message, email);
      setError(error);
      setAuthenticating(false);
    }
  };
  return (
    <div className="login-page">
      <h1>Welcome to my cat management app</h1>
      <div className="login-wrapper">
        <div className="login-container">
          <h2>Sign up</h2>
          <form onSubmit={handleSubmit}>
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
                    setEmail(event.target.value)
                  }
                />
              </div>
            </div>
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
                    setPassword(event.target.value)
                  }
                />
                <div
                  role="button"
                  className="show-pass"
                  onClick={toggleView}
                  tabIndex={0}
                >
                  {showPassword ? (
                    <FaEyeSlash size={25} />
                  ) : (
                    <FaEye size={25} />
                  )}
                </div>
              </div>
              <div className="error">{error}</div>
            </div>

            <div className="button-wrapper">
              <button
                className="general-button"
                disabled={authenticating || !email || !password}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="back-to-login">
        <Link to="/">
          <span className="back">
            <FaArrowLeft />
            <span>Back to login</span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CreateNewUser;
