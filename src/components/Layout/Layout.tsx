import React from 'react';
import { NavBar } from '../Navbar/Navbar';
import { BaseLayoutProps } from '../../shared/interfaces';

export const Layout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="container">
      <NavBar />
      {children}
    </div>
  );
};
