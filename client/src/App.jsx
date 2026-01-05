import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Layout from "./Layouts/Layout";
import SellerDashboard from "./seller/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Routes WITH Header */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Routes WITHOUT Header */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />

      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
};

export default App;
