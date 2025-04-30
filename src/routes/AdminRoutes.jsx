import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {ROLES} from '../config/roles'

export default function AdminRoutes({children, redirectTo ="/404"}) {

    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if(isAuthenticated && user.roleId == ROLES.admin){
        return children ? children : <Outlet/>
       
    }

    else{
        return <Navigate to={redirectTo}/>
    }
  
}