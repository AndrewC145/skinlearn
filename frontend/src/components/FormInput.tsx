/* eslint-disable @typescript-eslint/no-explicit-any */ type FormInputType = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  register: any;
};

function FormInput({
  id,
  name,
  type,
  placeholder,
  label,
  register,
}: FormInputType) {
  return (
    <label htmlFor={id}>
      {label}
      <input
        {...register(name)}
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
