import type { JSX } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
function Protected({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  if (user && user.superuser) {
    return children;
  } else if (user && !user.superuser) {
    return <Lockout children={<LockoutChildren />} />;
  } else {
    return <RequireLogin />;
  }
}

function Lockout({ children }: { children?: React.ReactNode }) {
  return (
    <section className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold">
          You do not have access to this page.
        </h1>
        {children}
      </div>
    </section>
  );
}

function LockoutChildren() {
  return (
    <Link to="/">
      <Button className="cursor-pointer p-4 px-6" variant="default">
        Return Home
      </Button>
    </Link>
  );
}

function RequireLogin() {
  return <Lockout children={<RequireLoginChildren />} />;
}

function RequireLoginChildren() {
  return (
    <>
      <p>Please login in to your account to be able to access this page</p>
      <Link to="/login">
        <Button className="cursor-pointer p-4 px-6" variant="default">
          Login
        </Button>
      </Link>
    </>
  );
}

export default Protected;
