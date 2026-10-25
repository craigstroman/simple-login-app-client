import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkAuth } from '../../services/authService';

const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    const verifySession = async () => {
      try {
        const result = await checkAuth();

        if (active) {
          setAuthenticated(result);
        }
      } catch {
        if (active) {
          setAuthenticated(false);
        }
      }
    };

    verifySession();

    return () => {
      active = false;
    };
  }, []);

  if (authenticated === null) {
    return <p>Checking authentication...</p>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
