// AppRouting.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Register from '../pages/Register';


export default function AppRouting() {
  return (
    <div>
      <Routes>
        {/* Rutas públicas */}
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Register/>} />
      </Routes>
    </div>
  );
}
