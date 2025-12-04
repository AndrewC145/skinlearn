/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, type NavigateFunction } from "react-router";
import { AuthContext, type User } from "./AuthContext";
import {
  type loginFormValues,
  type registerFormValues,
} from "../types/formTypes";
import { createApi } from "../api";
import { type AxiosResponse } from "axios";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const navigate: NavigateFunction = useNavigate();

  const handleLogin: (data: loginFormValues) => Promise<void> = async (
    data: loginFormValues,
  ) => {
    try {
      const response: AxiosResponse = await createApi(token).post(
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
          is_superuser: response.data.superuser,
        });
        setToken(response.data.token.access);
      }
    } catch (error: any) {
      throw new Error(error.response.data.detail);
    }
  };

  const handleSignup: (data: registerFormValues) => Promise<void> = async (
    data: registerFormValues,
  ) => {
    try {
      const response: AxiosResponse = await createApi(token).post(
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
      const response: AxiosResponse = await createApi(token).post(
        "api/logout/",
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

  useEffect(() => {
    const rehydrateToken = async () => {
      try {
        const response = await createApi(null).post(
          "api/refresh/",
          {},
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );

        if (response.status === 200) {
          setToken(response.data.access);
          setUser(response.data.user);
        }
      } catch (error: any) {
        console.error("Refresh token failed", error);
        setToken(null);
        setUser(null);
      }
    };

    rehydrateToken();
  }, []);

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
