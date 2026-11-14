import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Index } from '../Index/Index';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Dashboard } from '../Dashboard/Dashboard';
import { ForgotPassword } from '../ForgotPassword/ForgotPassword';
import { ProtectedRoute } from '../../components/ProtectedRoute/ProtectedRoute';

export const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
