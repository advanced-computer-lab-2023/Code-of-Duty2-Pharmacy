import axios from "axios";
import { createContext, useState, ReactNode } from "react";

import UserRole from "../types/enums/UserRole";

interface IAuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  role: UserRole;
}

interface IAuthContext {
  authState: IAuthState;
  login: (accessToken: string, role: UserRole) => void;
  logout: () => void;
  refreshAuth: () => void;
}

/**
 * Create the auth context with default values.
 *
 * */
const AuthContext = createContext<IAuthContext>({
  authState: {
    isAuthenticated: false,
    accessToken: null,
    role: UserRole.GUEST,
  },
  login: () => {},
  logout: () => {},
  refreshAuth: () => {},
});

/**
 * Create a provider for the auth context, and pass down
 * an object that adheres to the IAuthContext interface,
 * with all the IAuthContext props and functions.
 *
 * Login and logout functions utilize axios interceptors to add/remove
 * the access token from the Authorization header of all axios requests
 * made by the application.
 *
 * */
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<IAuthState>({
    isAuthenticated: false,
    accessToken: null,
    role: UserRole.GUEST,
  });

  const login = (accessToken: string, role: UserRole) => {
    setAuthState({
      isAuthenticated: true,
      accessToken,
      role,
    });

    axios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      accessToken: null,
      role: UserRole.GUEST,
    });

    axios.interceptors.request.use((config) => {
      config.headers.Authorization = null;
      return config;
    });
  };

  const refreshAuth = () => {
    /* 
        TODO: Implement refresh token logic here. 
    */
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
