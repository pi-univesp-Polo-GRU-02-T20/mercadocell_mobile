import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { login } from "../../application/services";

interface AuthContextData {
  isAuthenticated: boolean;
  loading: boolean;
  statusCodeLogin: null | number; 
  login: (user: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  loading: false,
  statusCodeLogin: null,
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

      AsyncStorage.setItem('@MercadoCell:jwt', jwt.token)
    }

    setLoading(false)
  };

  const autoLogin = async () => {
    const jwt = await AsyncStorage.getItem("@MercadoCell:jwt");

    if (jwt) {
      setJwtToken(jwt);
    }
  };

  const logout = async () => {
    AsyncStorage.clear()
    setJwtToken(undefined)
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!jwtToken,
        loading,
        statusCodeLogin,
        login: loginUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};