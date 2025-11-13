/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import { type registerFormValues, registerSchema } from "../types/formTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Register() {
  const { handleSignup } = useAuth();
  const [customErr, setCustomErr] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: registerFormValues) => {
    try {
      await handleSignup(data);
      setCustomErr("");
    } catch (err: any) {
      setCustomErr(err.message);
    }
  };

  return (
    <Form
      customErr={customErr}
      onSubmit={handleSubmit(onSubmit)}
      route="register"
      title="Create an account"
    >
      <FormInput
        id="username"
        name="username"
        type="text"
        placeholder="Username"
        label="Username"
        register={register}
        errors={errors.username}
      />
      <FormInput
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="Email"
        register={register}
        errors={errors.email}
      />
      <FormInput
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        label="Password"
        register={register}
        errors={errors.password}
      />
      <FormInput
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        label="Confirm Password"
        register={register}
        errors={errors.confirmPassword}
      />
      <label htmlFor="skin_type" className="sr-only">
        Skin Type
      </label>
      <select {...register("skin_type")} name="skinType" id="skinType">
        <option value="">Choose a Skin Type</option>
        <option value="Dry">Dry</option>
        <option value="Normal">Normal</option>
        <option value="Combination">Combination</option>
        <option value="Oily">Oily</option>
        <option value="Sensitive">Sensitive</option>
        <option value="Acne">Acne</option>
      </select>
      {errors.skin_type && (
        <p className="text-sm text-red-500">{errors.skin_type?.message}</p>
      )}
    </Form>
  );
}

export default Register;
