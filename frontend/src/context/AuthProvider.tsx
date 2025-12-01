/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useLayoutEffect } from "react";
import { useNavigate, type NavigateFunction } from "react-router";
import { AuthContext, type User } from "./AuthContext";
import {
  type loginFormValues,
  type registerFormValues,
} from "../types/formTypes";
import { createApi } from "../api";
import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

interface InternalAxiosRequestConfigWithRetry
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const navigate: NavigateFunction = useNavigate();

  const handleLogin: (data: loginFormValues) => Promise<void> = async (
    data: loginFormValues,
  ) => {
    try {
      const response: AxiosResponse = await createApi().post(
        "api/token/",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        setUser({
          id: response.data.id,
          username: response.data.username,
          avoid_ingredients: response.data.avoid_ingredients,
          superuser: response.data.superuser,
        });
        setToken(response.data.token.access);
        navigate("/");
      }
    } catch (error: any) {
      throw new Error(error.response.data.detail);
    }
  };

  const handleSignup: (data: registerFormValues) => Promise<void> = async (
    data: registerFormValues,
  ) => {
    try {
      const response: AxiosResponse = await createApi().post(
        "api/register/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 201) {
        setUser(response.data.user);
        setToken(response.data.accessToken);
      }
    } catch (error: any) {
      throw new Error(error.response.data.detail);
    }
  };
  const handleLogout: () => Promise<void> = async () => {
    try {
      const response: AxiosResponse = await createApi().post(
        "api/logout",
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        setToken(null);
        setUser(null);
        navigate("/");
      }
    } catch (error: any) {
      throw new Error(error.response.data.detail);
    }
  };

  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use(
      (config: InternalAxiosRequestConfigWithRetry) => {
        config.headers.Authorization =
          token && !config._retry
            ? `Bearer ${token}`
            : config.headers.Authorization;

        return config;
      },
    );

    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const authResponseInterceptor = axios.interceptors.response.use(
      function onFulfilled(response) {
        return response;
      },
      async function onRejected(error) {
        const originalRequest: InternalAxiosRequestConfigWithRetry =
          error.config;

        if (error.response?.status === 400) {
          try {
            const response: AxiosResponse = await createApi().post(
              "api/refresh",
              {},
              {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              },
            );

            if (response.status === 200) {
              setToken(response.data.accessToken);
              originalRequest._retry = true;
              return axios(originalRequest);
            }
          } catch (error: any) {
            console.error("Token refresh failed: ", error);
            setToken(null);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.response.eject(authResponseInterceptor);
    };
  });

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleSignup,
        handleLogout,
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
