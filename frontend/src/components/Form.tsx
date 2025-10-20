function Form({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <form>
      <div>
        <h1>{title}</h1>
        {children}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
