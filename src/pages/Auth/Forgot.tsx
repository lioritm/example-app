import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { showError } from "../../utils/utils";
import { FaArrowLeft } from "react-icons/fa";
const Forgot = () => {
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const { resetPassword } = UserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    setSubmitting(true);
    event.preventDefault();
    setError("");
    try {
      await resetPassword(email);
      navigate("/");
    } catch (err) {
      const typedError = err as Error;
      const error = showError(typedError?.message, email);
      setError(error);
      setSubmitting(false);
    }
  };
  return (
    <div className="login-page">
      <h1>Welcome to my cat management app</h1>
      <div className="login-wrapper">
        <div className="login-container">
          <h2> Reset Password</h2>
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
            <div className="button-wrapper">
              <button
                className="general-button"
                disabled={submitting || !email}
              >
                Reset Password
              </button>
            </div>
          </form>
          <div style={{ color: "red" }}>{error}</div>
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

export default Forgot;
