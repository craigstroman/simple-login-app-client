import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Dashboard = () => {
  const API_URL = 'http://localhost:9001';
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      setError('');
      const response = await axios.post(
        `${API_URL}/logout`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        navigate('/login', { replace: true });
      }
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
