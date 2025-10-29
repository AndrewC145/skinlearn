import { useContext, createContext, type SetStateAction } from "react";
import {
  type loginFormValues,
  type registerFormValues,
} from "../types/formTypes";

export type User = {
  id: number;
  username: string;
  avoid_ingredients: string[];
};

export type AuthContextType = {
  handleLogin: (data: loginFormValues) => Promise<void>;
  handleSignup: (data: registerFormValues) => Promise<void>;
  handleLogout: () => Promise<void>;
  setUser: React.Dispatch<SetStateAction<User | null>>;
  user: User | null;
};

export const AuthContext = createContext<AuthContextType>({
  handleLogin: async () => {},
  handleSignup: async () => {},
  handleLogout: async () => {},
  setUser: () => {},
  user: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};
