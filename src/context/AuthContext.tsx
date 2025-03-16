
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  user: { email: string } | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mock authenticated user
  const [user] = useState<{ email: string } | null>({ email: 'user@example.com' });
  const navigate = useNavigate();
  const { toast } = useToast();

  const signOut = async () => {
    // Mock sign out function
    toast({
      title: "Info",
      description: "Authentication is currently disabled.",
    });
  };

  const value = {
    user,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
