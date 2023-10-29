import axios from "axios";
import { createContext, useState, ReactNode, useEffect } from "react";

import UserRole from "../types/enums/UserRole";
import config from "../config/config";

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
 * Create a provider for the auth context.
 *
 * Login and logout functions utilize axios interceptors to add/remove
 * the access token from the Authorization header of all axios requests
 * made by the application.
 *
 * The refreshAuth function is called when the application is first
 * loaded to check if the user has a valid access token. If they do,
 * the access token is added to the Authorization header of all axios
 * requests made by the application.
 *
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

  useEffect(() => {
    refreshAuth();

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          await refreshAuth();
          return axios(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

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

    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    axios.interceptors.request.use((config) => {
      config.headers.Authorization = null;
      return config;
    });
  };

  // TODO: Verify this works and use real API endpoint.
  const refreshAuth = async () => {
    try {
      const response = await axios.post(`${config.API_URL}/auth/refresh`);
      setAuthState({
        isAuthenticated: true,
        accessToken: response.data.accessToken,
        role: response.data.role,
      });
    } catch (error) {
      console.error(error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
