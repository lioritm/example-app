import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import AuthForm from "../../pagesComponents/AuthComps/AuthForm/AuthForm";
import { showError } from "../../utils/utils";
import "./css/Auth.css";
const Login = () => {
  const { signIn, user } = UserAuth();
  const [error, setError] = React.useState<string>("");
  const [authenticating, setAuthenticating] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    setError("");
    try {
      await signIn(email, password!);
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
          <AuthForm
            type="login"
            handleSubmit={handleSubmit}
            error={error}
            authenticating={authenticating}
            setAuthenticating={setAuthenticating}
          />

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
