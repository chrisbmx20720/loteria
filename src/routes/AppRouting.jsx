// AppRouting.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Register from '../pages/Register';


export default function AppRouting() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Register/>} />
      </Routes>
    </div>
  );
}
