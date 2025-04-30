import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {ROLES} from '../config/roles'

export default function ProtectedRoutes({ redirectTo = "/" }) {
    // Obtener el estado de autenticación y usuario del store de Redux
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    // Si no está autenticado, redirigir a la página de inicio
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} />;
    }
    
    // Redirigir al dashboard para clientes
    if (user.roleId === ROLES.client) {
        return <Navigate to="/dashboard" />;
    }

    // Redirigir a la página de admin
    if (user.roleId === ROLES.admin) {
        return <Navigate to="/admin" />;
    }


    return <Outlet />;
}
