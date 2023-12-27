import { Navbar } from "./components/Navbar/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import CatProvider from "./context/CatContext";
import AddCatPage from "./pages/AddCat/AddCatPage";
import CreateNewUser from "./pages/Auth/CreateNewUser";
import Forgot from "./pages/Auth/Forgot";
import Login from "./pages/Auth/Login";
import Cat from "./pages/Cat/Cat";
import Cats from "./pages/Cats/Cats";
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
            <Route path="/create-new-user" element={<CreateNewUser />} />
            <Route path="cats" element={<Cats />}></Route>
            <Route path="cats/:catId" element={<Cat />} />
            <Route path="addcat" element={<AddCatPage />} />
          </Routes>
        </BrowserRouter>
      </CatProvider>
    </AuthContextProvider>
  );
}

export default App;
