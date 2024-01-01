import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import AuthForm from "../../pagesComponents/AuthComps/AuthForm/AuthForm";
import { showError } from "../../utils/utils";
import AuthContainer from "../../pagesComponents/AuthComps/AuthContainer/AuthContainer";

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
    <AuthContainer type="login">
      <AuthForm
        type="login"
        handleSubmit={handleSubmit}
        error={error}
        authenticating={authenticating}
        setAuthenticating={setAuthenticating}
      />
    </AuthContainer>
  );
};

export default Login;
