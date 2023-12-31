import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { showError } from "../../utils/utils";
import AuthForm from "../../pagesComponents/AuthComps/AuthForm/AuthForm";

const CreateNewUser = () => {
  const { signUp } = UserAuth();
  const [error, setError] = React.useState<string>("");
  const [authenticating, setAuthenticating] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    setAuthenticating(true);
    setError("");
    try {
      await signUp(email, password!);
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
          <AuthForm
            type="signup"
            handleSubmit={handleSubmit}
            error={error}
            authenticating={authenticating}
            setAuthenticating={setAuthenticating}
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

export default CreateNewUser;
