import type { JSX } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, type NavigateFunction } from "react-router";
function Protected({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const navigate: NavigateFunction = useNavigate();

  return user ? children : navigate("/", { replace: true });
}

export default Protected;
