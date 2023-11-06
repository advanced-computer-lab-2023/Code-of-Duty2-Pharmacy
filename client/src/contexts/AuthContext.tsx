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
  refreshAuth: () => Promise<string>;
}

const AuthContext = createContext<IAuthContext>({
  authState: {
    isAuthenticated: false,
    accessToken: null,
    role: UserRole.GUEST,
  },
  login: () => {},
  logout: () => {},
  refreshAuth: () => Promise.resolve(""),
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<IAuthState>({
    isAuthenticated: false,
    accessToken: null,
    role: UserRole.GUEST,
  });

  // Used to setup a response interceptor to attempt to refresh the access token
  // if we get a 401 response from the server.
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (
            error.response.data.accessTokenExpired &&
            !originalRequest.url.endsWith(`${config.API_REFRESH_ENDPOINT}`)
          ) {
            const newToken = await refreshAuth();
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return axios(originalRequest);
          } else {
            logout();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  // Used for extra assurance that the access token being sent in the request headers
  // is always in sync with the most up to date access token.
  useEffect(() => {
    if (authState.isAuthenticated) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${authState.accessToken}`;
    }
  }, [authState]);

  const login = (accessToken: string, role: UserRole) => {
    setAuthState({
      isAuthenticated: true,
      accessToken,
      role,
    });
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  };

  const logout = async () => {
    setAuthState({
      isAuthenticated: false,
      accessToken: null,
      role: UserRole.GUEST,
    });

    try {
      await axios.post(
        `${config.API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error during logout", error);
    }

    delete axios.defaults.headers.common["Authorization"];
  };

  const refreshAuth = async () => {
    try {
      const response = await axios.post(
        `${config.API_URL}${config.API_REFRESH_ENDPOINT}`,
        {},
        {
          withCredentials: true,
        }
      );
      login(response.data.accessToken, response.data.role);
      return response.data.accessToken;
    } catch (error) {
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
