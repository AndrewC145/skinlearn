import { useState } from "react";
import { useNavigate, type NavigateFunction } from "react-router";
import { AuthContext, type User } from "./AuthContext";
import {
  type loginFormValues,
  type registerFormValues,
} from "../types/formTypes";
import api from "../api";
import type { AxiosResponse } from "axios";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const navigate: NavigateFunction = useNavigate();

  const handleLogin = async (data: loginFormValues) => {
    try {
      const response: AxiosResponse = await api.post("api/token/", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        setUser({
          id: response.data.id,
          username: response.data.username,
          avoid_ingredients: response.data.avoid_ingredients,
        });
        setToken(response.data.token.access);
        navigate("/");
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const handleSignup = async (data: registerFormValues) => {
    try {
      const response: AxiosResponse = await api.post("api/register/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setUser(response.data.user);
        setToken(response.data.accessToken);
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };
  const handleLogout = async () => {
    try {
      const response: AxiosResponse = await api.post(
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
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleSignup, handleLogout, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
