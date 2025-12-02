import type { JSX } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Link } from "react-router";

function Protected({
  children,
  superuserOnly = false,
}: {
  children: JSX.Element;
  superuserOnly?: boolean;
}) {
  const { user } = useAuth();

  if (!user) {
    return <RequireLogin />;
  }

  if (superuserOnly && !user.is_superuser) {
    return <NoSuperuserAccess />;
  }

  return children;
}

function RequireLogin() {
  return (
    <section className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold">
          You do not have access to this page.
        </h1>
        <p>Please login to your account to be able to access this page</p>
        <Link to="/login">
          <Button className="cursor-pointer p-4 px-6" variant="default">
            Login
          </Button>
        </Link>
      </div>
    </section>
  );
}

function NoSuperuserAccess() {
  return (
    <section className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-4xl font-bold">
          You do not have permission to access this page.
        </h1>
        <Link to="/">
          <Button className="cursor-pointer p-4 px-6" variant="default">
            Return Home
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default Protected;
