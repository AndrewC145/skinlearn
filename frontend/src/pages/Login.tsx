import Form from "../components/Form";
import FormInput from "../components/FormInput";
import { loginSchema, type loginFormValues } from "../types/formTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<loginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: loginFormValues) => {
    console.log("Login data:", data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} title="Login" route="login">
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
