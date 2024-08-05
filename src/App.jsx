import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Regsiter } from "./pages/login/Regsiter";
import { DetailsPages } from "./pages/details/DetailsPages";
import { Account } from "./pages/account/Account";
import { Create } from "./components/create/Create";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Spinner from "./spinner/Spinner";
import { Update } from "./components/update/Update";
import {  useAuth } from "./context/AuthContext";
import Logout from "./components/logout/Logout";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const App = () => {
   const { isAuth, login } = useAuth();
  const [loading, setLoading] = useState(true);
  console.log(isAuth);
  
  useEffect(() => {
    axios
      .get("/jwt_check")
      .then(({ data }) => {
        if (data.user) {
         console.log("good");
         
          
        } else {
           console.log("error");
        }
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
        
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner/>; 
  }

  return (
    <>
      <Router>
        <Header />
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Regsiter />} />
          <Route path="/account" element={<Account />} />
          <Route
            path="/update/:id"
            element={isAuth ? <Update /> : <Navigate to="/login" />}
          />
          <Route path="/details/:id" element={<DetailsPages />} />
          <Route
            path="/"
            element={isAuth ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/create"
            element={isAuth ? <Create /> : <Navigate to="/login" />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
