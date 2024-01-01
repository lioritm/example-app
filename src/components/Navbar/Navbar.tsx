import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import "./Navbar.css";
export const Navbar = () => {
  const location = useLocation();
  const { logout } = UserAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      const typedError = err as Error;
      console.log(typedError?.message);
    }
  };
  if (
    location.pathname === "/" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/create-new-user"
  ) {
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
            {t("nav.home")}
          </Link>

          <Link
            to="/addcat"
            className={`${location.pathname === "/addcat" ? "selected" : ""}`}
          >
            {t("nav.addNew")}
          </Link>
        </div>
        <div className="right-nav">
          <button
            className="w-full text-center mb-5 sidebar-icons"
            onClick={handleLogout}
          >
            {t("nav.logout")}
          </button>
        </div>
      </div>
    </nav>
  );
};
