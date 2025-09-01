import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes: React.FC = () => {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
