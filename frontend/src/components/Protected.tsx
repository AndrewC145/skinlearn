import type { JSX } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
function Protected({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  return user ? children : <RequireLogin />;
}

function RequireLogin() {
  return (
    <section className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold">
          You do not have access to this page.
        </h1>
        <p>Please login in to your account to be able to submit a product</p>
        <Link to="/login">
          <Button className="cursor-pointer p-4 px-6" variant="default">
            Login
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default Protected;
