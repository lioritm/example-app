import { Navbar } from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import CatProvider from "./context/CatContext";
import AddCatPage from "./pages/AddEditCat/AddEditCatPage";
import Forgot from "./pages/Auth/Forgot";
import Login from "./pages/Auth/Login";
import Cat from "./pages/Cat/Cat";
import Cats from "./pages/Cats/Cats";
import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <AuthContextProvider>
      <CatProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/reset-password" element={<Forgot />} />
            <Route path="cats" element={<Cats />}></Route>
            <Route path="cats/:catId" element={<Cat />} />
            <Route path="addeditcat" element={<AddCatPage />} />
          </Routes>
        </BrowserRouter>
      </CatProvider>
    </AuthContextProvider>
  );
}

export default App;
