import { ReactNode } from 'react';

export interface LoginValues {
  emailOrUsername: string;
  password: string;
}

export interface RegisterValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface BaseLayoutProps {
  children?: ReactNode;
}
