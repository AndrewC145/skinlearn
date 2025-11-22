/* eslint-disable @typescript-eslint/no-explicit-any */

import Error from "./Error";

type FormInputType = {
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
        {...register(name)}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="rounded-sm border-none bg-[#F2EDE0] p-2.5 outline-none placeholder:text-base focus:border-2 focus:border-solid"
      />
      {errors && <Error err={errors} />}
    </div>
  );
}

export default FormInput;
