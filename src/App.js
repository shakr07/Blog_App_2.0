import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Regsiter } from './pages/login/Regsiter'
import { DetailsPages } from "./pages/details/DetailsPages";
import { Account } from "./pages/account/Account";
import { Create } from "./components/create/Create";
import axios from "axios";
import { Toaster } from "react-hot-toast";

// Set up axios defaults
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Regsiter/>} />
          <Route path="/details/:id" element={<DetailsPages />} />
          <Route path="/account" element={<Account />} />
          <Route path="/create" element={<Create />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
