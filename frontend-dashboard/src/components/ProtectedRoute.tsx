import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

function ProtectedRoute() {

  const token = localStorage.getItem("token")
  const currentDate = Date.now() / 1000
  if (token) {
    const decodeToken = jwtDecode(token)
    if (decodeToken.exp && (decodeToken.exp > currentDate)) {
      return <Outlet />;
    }
  }
  return <Navigate to="/login" replace />;

}

export default ProtectedRoute;