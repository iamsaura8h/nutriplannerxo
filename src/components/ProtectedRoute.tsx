
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Authentication is temporarily disabled, so we just render the children
  return <>{children}</>;
};

export default ProtectedRoute;
