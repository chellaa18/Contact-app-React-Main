import React, { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import Login from "./components/login/Login";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./components/registerForm/Registration";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import Otp from "./components/otp/Otp";
import AllContact from "./components/allContact/AllContact";
import AddContact from "./components/addContact/AddContact";
import ViewContact from "./components/viewContact/ViewContact";
import EditContact from "./components/editContact/EditContact";

//private route
const PrivateRoute = ({ component }) => {
  const isAuthenticated = localStorage.getItem("loggedInUser");
  if (isAuthenticated) {
    return component;
  } else {
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <div className="App">
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />

        <Route path="/registration" element={<Registration />} />

        <Route path="/otp" element={<Otp />} />
        <Route path="/viewcontact/:id" element={<ViewContact />} />
        {/* <Route path="/editcontact/:id" element={<EditContact />} /> */}
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute component={<Dashboard />} />}
        />
        <Route
          path="/allcontact"
          element={<PrivateRoute component={<AllContact />} />}
        />
        <Route
          path="/addcontact"
          element={<PrivateRoute component={<AddContact />} />}
        />
        <Route
          path="/editcontact/:id"
          element={<PrivateRoute component={<EditContact />} />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
