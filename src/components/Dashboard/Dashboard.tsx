import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      setError('');
      await logout();
      navigate('/login', { replace: true });
    } catch {
      setError('Unable to log out');
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>You are successfully logged in!</p>

      {error && <p role="alert">{error}</p>}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
