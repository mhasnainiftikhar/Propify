import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ListingDetail from "./pages/ListingDetail";
import Search from "./pages/Search";
import Services from "./pages/Services";
import Community from "./pages/Community";
import Layout from "./Layouts/Layout";
import SellerLayout from "./Layouts/SellerLayout";
import SellerDashboard from "./seller/Dashboard";
import Properties from "./seller/Properties";
import Messages from "./seller/Messages";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import PrivateRoute from "./components/PrivateRoute";
import SellerRoute from "./components/SellerRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Seller Routes WITH Sidebar (Check First) */}
        <Route element={<SellerRoute />}>
          <Route element={<SellerLayout />}>
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/properties" element={<Properties />} />
            <Route path="/seller/messages" element={<Messages />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/update-listing/:listingId" element={<UpdateListing />} />
            <Route path="/seller/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Routes WITH Header (Customer Routes) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/listing/:listingId" element={<ListingDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/services" element={<Services />} />
          <Route path="/community" element={<Community />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Routes WITHOUT any Layout */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
};

export default App;
