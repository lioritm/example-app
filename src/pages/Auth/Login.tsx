import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { showError } from "../../utils/utils";

const Login = () => {
  const { signIn, user } = UserAuth();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [authenticating, setAuthenticating] = React.useState<boolean>(false);
  const navigate = useNavigate();
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="User Name"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
        />
        <button disabled={authenticating || !email || !password}>
          sign in
        </button>
      </form>
      <div style={{ color: "red" }}>{error}</div>
      <Link to="/reset-password">Forgot password?</Link>
    </div>
  );
};

export default Login;
