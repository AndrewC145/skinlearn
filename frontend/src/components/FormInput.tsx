/* eslint-disable @typescript-eslint/no-explicit-any */ type FormInputType = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  register: any;
  errors: any;
};

function FormInput({
  id,
  name,
  type,
  placeholder,
  label,
  register,
  errors,
}: FormInputType) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        {...register(name, { required: true })}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="rounded-sm border-none bg-[#F2EDE0] p-3 outline-none focus:border-2 focus:border-solid"
      />
      {errors && <p className="text-sm text-red-500">{errors.message}</p>}
    </div>
  );
}

export default FormInput;
