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

// Set up axios defaults
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/jwt_check")
      .then(({ data }) => {
        if (data.user) {
          setIsAuth(true);
        } else {
          setIsAuth(true);
        }
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
        setIsAuth(false);
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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Regsiter />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/details/:id" element={<DetailsPages />} />
          <Route
            path="/account"
            element={isAuth ? <Account /> : <Navigate to="/login" />}
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
