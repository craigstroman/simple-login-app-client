import { LoginValues, RegisterValues } from '../shared/interfaces';

const API_URL = 'http://localhost:9001';

async function handleResponse(response: Response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export async function login(values: LoginValues) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(values),
  });

  return handleResponse(response);
}

export async function register(values: RegisterValues) {
  const { confirmPassword, ...userData } = values;

  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(userData),
  });

  return handleResponse(response);
}

export async function checkAuth(): Promise<boolean> {
  const response = await fetch(`${API_URL}/me`, {
    credentials: 'include',
  });

  return response.ok;
}

export async function logout(): Promise<void> {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
}
