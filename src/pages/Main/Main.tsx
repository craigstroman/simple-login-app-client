import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Index } from '../Index/Index';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { ForgotPassword } from '../ForgotPassword/ForgotPassword';
import Dashboard from '../Dashboard/Dashboard';

export const Main: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
