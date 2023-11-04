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
  refreshAuth: () => Promise<void>;
}

/**
 * Create the auth context with default values.
 * */
const AuthContext = createContext<IAuthContext>({
  authState: {
    isAuthenticated: false,
    accessToken: null,
    role: UserRole.GUEST,
  },
  login: () => {},
  logout: () => {},
  refreshAuth: () => Promise.resolve(),
});

/**
 * Create a provider for the auth context.
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

  // Sets up axios response interceptor to automatically
  // refresh the access token if the server returns a 401 Error.
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,

      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (
            error.response.data.accessTokenExpired &&
            !originalRequest.url.endsWith("/auth/refresh-token")
          ) {
            await refreshAuth();
          } else {
            logout();
          }

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

    console.log("Set token:", accessToken);

    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  };

  const logout = async () => {
    setAuthState({
      isAuthenticated: false,
      accessToken: null,
      role: UserRole.GUEST,
    });

    try {
      axios.post(
        `${config.API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error during logout", error);
    }

    axios.interceptors.request.use((config) => {
      config.headers.Authorization = null;
      return config;
    });
  };

  const refreshAuth = async () => {
    const refreshEndpoint = import.meta.env.API_REFRESH_ENDPOINT;

    try {
      const response = await axios.post(
        `${config.API_URL}/auth/refresh-token`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Refreshed token:", response.data.accessToken);

      login(response.data.accessToken, response.data.role);
    } catch (error) {
      console.error("Error refreshing token", error);
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
