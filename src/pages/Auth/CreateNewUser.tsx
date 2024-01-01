import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { showError } from "../../utils/utils";
import AuthForm from "../../pagesComponents/AuthComps/AuthForm/AuthForm";
import AuthContainer from "../../pagesComponents/AuthComps/AuthContainer/AuthContainer";
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
      const error = showError(typedError?.message, email);
      setError(error);
      setAuthenticating(false);
    }
  };
  return (
    <AuthContainer type="signup">
      <AuthForm
        type="signup"
        handleSubmit={handleSubmit}
        error={error}
        authenticating={authenticating}
        setAuthenticating={setAuthenticating}
      />
    </AuthContainer>
  );
};

export default CreateNewUser;
