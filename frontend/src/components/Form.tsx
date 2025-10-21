import { type FormEventHandler } from "react";

function Form({
  title,
  children,
  onSubmit,
}: {
  title: string;
  children: React.ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <h1>{title}</h1>
        {children}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
