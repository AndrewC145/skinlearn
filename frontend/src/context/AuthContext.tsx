import { useContext, createContext, type SetStateAction } from "react";
import {
  type loginFormValues,
  type registerFormValues,
} from "../types/formTypes";

export type User = {
  id: number;
  username: string;
  avoid_ingredients: string[];
  is_superuser: boolean;
};

export type AuthContextType = {
  handleLogin: (data: loginFormValues) => Promise<void>;
  handleSignup: (data: registerFormValues) => Promise<void>;
  handleLogout: () => Promise<void>;
  setUser: React.Dispatch<SetStateAction<User | null>>;
  user: User | null;
  token: string | null;
  setToken: React.Dispatch<SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  handleLogin: async () => {},
  handleSignup: async () => {},
  handleLogout: async () => {},
  setUser: () => {},
  user: null,
  token: null,
  setToken: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};
