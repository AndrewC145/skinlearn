import { useContext, createContext } from "react";
import {
  type loginFormValues,
  type registerFormValues,
} from "../types/formTypes";

export type AuthContextType = {
  handleLogin: (data: loginFormValues) => Promise<void>;
  handleSignup: (data: registerFormValues) => Promise<void>;
  handleLogout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  handleLogin: async () => {},
  handleSignup: async () => {},
  handleLogout: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};
