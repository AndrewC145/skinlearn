type FormInputType = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  label: string;
};

function FormInput({ id, name, type, placeholder, label }: FormInputType) {
  return (
    <label htmlFor={id}>
      {label}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required
      />
    </label>
  );
}

export default FormInput;
