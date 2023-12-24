import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { showError } from "../../utils/utils";
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
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="username"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
        />
        <button disabled={submitting || !email}>Reset Password</button>
      </form>
      <div style={{ color: "red" }}>{error}</div>
      <Link to="/">
        <div>
          <span>Back to login</span>
        </div>
      </Link>
    </>
  );
};

export default Forgot;
