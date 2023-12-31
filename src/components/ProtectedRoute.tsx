import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { IProtectedRoutes } from "../interfaces/general";

const ProtectedRoute = (props: IProtectedRoutes) => {
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        //    navigate("/");
      }
    });

    return () => AuthCheck();
  }, [auth, navigate]);

  if (loading) return <span></span>;

  return <>{children}</>;
};

export default ProtectedRoute;
