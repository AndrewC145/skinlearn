/* eslint-disable @typescript-eslint/no-explicit-any */
import FormInput from "./FormInput";

type SubmitInputProps = {
  id: string;
  name: string;
  placeholder: string;
  register: any;
  errors: any;
  label: string;
  type: string;
  fieldErrors: string | string[] | undefined;
};

function SubmitInput({
  id,
  name,
  placeholder,
  register,
  errors,
  label,
  type,
  fieldErrors,
}: SubmitInputProps) {
  return (
    <div className="space-y-2">
      <FormInput
        id={id}
        name={name}
        placeholder={placeholder}
        register={register}
        errors={errors}
        label={label}
        type={type}
      />
      {fieldErrors && <SubmitError err={fieldErrors} />}
    </div>
  );
}

function SubmitError({ err }: { err: any }) {
  return <p className="text-sm text-red-500">{err.join(", ")}</p>;
}

export { SubmitInput, SubmitError };
