/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "../components/forms/Form";
import FormInput from "../components/forms/FormInput";
import { loginSchema, type loginFormValues } from "../types/formTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Login() {
  const [customErr, setCustomErr] = useState<string | undefined>("");
  const { handleLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: loginFormValues) => {
    try {
      await handleLogin(data);
      setCustomErr("");
    } catch (err: any) {
      setCustomErr(err.message);
    }
  };

  return (
    <Form
      customErr={customErr}
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
      route="login"
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
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        label="Password"
        register={register}
        errors={errors.password}
      />
    </Form>
  );
}

export default Login;
