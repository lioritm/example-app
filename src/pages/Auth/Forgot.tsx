import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { showError } from "../../utils/utils";
import AuthForm from "../../pagesComponents/AuthComps/AuthForm/AuthForm";
import AuthContainer from "../../pagesComponents/AuthComps/AuthContainer/AuthContainer";

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
    <AuthContainer type="forgot">
      <AuthForm
        type="forgot"
        handleSubmit={handleSubmit}
        error={error}
        authenticating={submitting}
        setAuthenticating={setSubmitting}
      />
    </AuthContainer>
  );
};

export default Forgot;
