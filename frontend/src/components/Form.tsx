/* eslint-disable @typescript-eslint/no-explicit-any */
import { type SubmitHandler } from "react-hook-form";
import formImg from "../assets/images/form.jpg";
import bg from "../assets/images/form-bg.jpg";
import { Link } from "react-router";

function Form({
  title,
  children,
  onSubmit,
  route,
}: {
  title: string;
  children: React.ReactNode;
  onSubmit: SubmitHandler<any>;
  route: string;
}) {
  const btnName = route === "login" ? "Log in" : "Register";
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="mx-auto flex h-screen items-center justify-center"
    >
      <form
        className="font-figtree flex max-w-5xl items-center justify-center rounded-lg bg-white text-black"
        onSubmit={onSubmit}
      >
        <div className="h-full w-1/2 p-4">
          <img
            src={formImg}
            className="size-full rounded-lg object-cover"
            alt="Face Cream"
          />
        </div>
        <div className="flex h-full w-1/2 flex-col px-12">
          <div className="space-y-4">
            <h1 className="mb-0 text-6xl font-semibold">{title}</h1>
            <FormSubheader route={route} />
            {children}
          </div>
          <button
            className="mt-12 cursor-pointer rounded-sm bg-[#000000] px-2 py-3 text-white hover:bg-gray-900"
            type="submit"
          >
            {btnName}
          </button>
        </div>
      </form>
    </div>
  );
}

function FormSubheader({ route }: { route: string }) {
  const name =
    route === "login" ? "Don't have an account?" : "Already have an account?";
  const redirectName = route === "login" ? "Register" : "Log in";
  const nav = route === "login" ? "/register" : "/login";

  return (
    <div className="my-8 flex space-x-2">
      <p>{name}</p>
      <Link className="underline" to={nav}>
        {redirectName}
      </Link>
    </div>
  );
}

export default Form;
