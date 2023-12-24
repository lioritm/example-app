import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
export const Navbar = () => {
  const location = useLocation();
  const { logout } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      const typedError = err as Error;
      console.log(typedError?.message);
    }
  };
  if (location.pathname === "/" || location.pathname === "/reset-password") {
    return <></>;
  }
  return (
    <nav>
      <div>
        <div>
          <Link to="/cats">Home</Link>

          <Link to="/addeditcat">Add new cat</Link>
          <button
            className="w-full text-center mb-5 sidebar-icons"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
