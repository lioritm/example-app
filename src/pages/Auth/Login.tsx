import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { showError } from "../../utils/utils";
import "./css/Auth.css";

const Login = () => {
  const { signIn, user } = UserAuth();
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
      await signIn(email, password);
      navigate("/cats");
    } catch (err) {
      const typedError = err as Error;
      console.log(typedError);
      const error = showError(typedError?.message, email);
      setError(error);
      setAuthenticating(false);
    }
  };
  React.useEffect(() => {
    if (user) {
      navigate("/cats");
    }
  }, [user, navigate]);
  return (
    <div className="login-page">
      <h1>Welcome to my cat management app</h1>
      <div className="login-wrapper">
        <div className="login-container">
          <h2>Login</h2>
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
            </div>
            <div className="error">{error}</div>
            <div className="button-wrapper">
              <button
                className="general-button"
                disabled={authenticating || !email || !password}
              >
                Log in
              </button>
            </div>
          </form>

          <div className="forgot-wrapper">
            <Link className="forgot" to="/reset-password">
              Forgot password?
            </Link>
          </div>
          <div className="forgot-wrapper">
            <Link className="forgot" to="/create-new-user">
              New user?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
