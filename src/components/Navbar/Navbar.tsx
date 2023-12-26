import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import "./Navbar.css";
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
      <div className="container navbar">
        <div className="left-nav">
          <Link
            to="/cats"
            className={`${location.pathname === "/cats" ? "selected" : ""}`}
          >
            Home
          </Link>

          <Link
            to="/addcat"
            className={`${location.pathname === "/addcat" ? "selected" : ""}`}
          >
            Add new cat
          </Link>
        </div>
        <div className="right-nav">
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
