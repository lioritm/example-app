import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { showError } from "../../utils/utils";
import { FaArrowLeft } from "react-icons/fa";
import AuthForm from "../../pagesComponents/AuthComps/AuthForm/AuthForm";
const Forgot = () => {
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const { resetPassword } = UserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (email: string) => {
    setSubmitting(true);
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
          <AuthForm
            type="forgot"
            handleSubmit={handleSubmit}
            error={error}
            authenticating={submitting}
            setAuthenticating={setSubmitting}
          />
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
