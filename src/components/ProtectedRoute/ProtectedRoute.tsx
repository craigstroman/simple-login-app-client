import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

export const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:9001/api/is-logged-in', {
          withCredentials: true,
        });

        if (active) {
          setIsAuthenticated(response.data.isLoggedIn === true);
        }
      } catch (error) {
        if (active) {
          setIsAuthenticated(false);
        }
      }
    };

    checkAuth();

    return () => {
      active = false;
    };
  }, []);

  if (isAuthenticated === null) {
    return <div>Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
