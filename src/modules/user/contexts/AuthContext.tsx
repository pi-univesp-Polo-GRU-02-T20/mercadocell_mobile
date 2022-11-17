import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { STORAGE_JWT, STORAGE_USER } from "../../../lib/helpers/constants";
import { login } from "../../application/services";

interface AuthContextData {
  isAuthenticated: boolean;
  loading: boolean;
  statusCodeLogin: null | number;
  user: string | undefined; 
  login: (user: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  loading: false,
  statusCodeLogin: null,
  user: undefined,
  login: () => {
    throw Error('Auth provider not set');
  },
  logout: () => {
    throw Error('Logout error');
  },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [jwtToken, setJwtToken] = useState<undefined | string>(undefined)
  const [user, setUser] = useState<undefined | string>(undefined)
  const [loading, setLoading] = useState<boolean>(false);
  const [statusCodeLogin, setStatusCodeLogin] = useState<number | null>(null);

  useEffect(() => {
    autoLogin();
  }, []);

  const loginUser = async (user: string, password: string) => {
    setStatusCodeLogin(null)
    setLoading(true)
    
    const {data: jwt, status} = await login(user, password)
    
    setStatusCodeLogin(status)

    if (status === 200 && jwt && jwt.token) {
      setJwtToken(jwt.token)
      setUser(user)
      AsyncStorage.setItem(STORAGE_JWT, jwt.token)
      AsyncStorage.setItem(STORAGE_USER, user)
    }

    setLoading(false)
  };

  const autoLogin = async () => {
    const jwt = await AsyncStorage.getItem(STORAGE_JWT);
    const user = await AsyncStorage.getItem(STORAGE_USER);

    if (jwt && user) {
      setJwtToken(jwt);
      setUser(user)
    }
  };

  const logout = async () => {
    AsyncStorage.clear()
    setJwtToken(undefined)
    setUser(undefined)
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!jwtToken,
        user,
        loading,
        statusCodeLogin,
        login: loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};