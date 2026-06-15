/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
import { users, teamPermissions } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(users[0]);

  const hasPermission = useCallback((permission) => {
    if (!currentUser) return false;
    const rolePermissions = teamPermissions[currentUser.role]?.permissions || [];
    return rolePermissions.includes(permission) || rolePermissions.includes('view_all');
  }, [currentUser]);

  const loginAsUser = useCallback((userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const value = {
    currentUser,
    hasPermission,
    loginAsUser,
    users,
    teamPermissions,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
