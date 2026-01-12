import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const SellerRoute = () => {
    const { currentUser } = useSelector((state) => state.user);

    // Check if user is logged in AND has the seller role
    if (!currentUser) {
        return <Navigate to="/sign-in" />;
    }

    if (currentUser.role !== 'seller') {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default SellerRoute;
