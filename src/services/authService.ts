import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RegisterValues, iLoginResponseValues } from '../shared/interfaces';

const API_URL = 'http://localhost:9001';

async function handleResponse(response: iLoginResponseValues) {
  const navigate = useNavigate();
  const data = response;

  if (!data.email) {
    throw new Error('Request failed');
  }

  navigate('/dashboard', { replace: true });
}

export async function checkAuth(): Promise<boolean> {
  const response = await axios.get('http://localhost:9001/api/is-logged-in', {
    withCredentials: true,
  });

  return response.data.ok;
}

export async function logout(): Promise<void> {
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

  if (!response.data.ok) {
    throw new Error('Logout failed');
  }
}
