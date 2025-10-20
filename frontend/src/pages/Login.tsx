import Form from "../components/Form";
import FormInput from "../components/FormInput";
import * as z from "zod";

function Login() {
  return (
    <Form title="Login">
      <FormInput
        id="username"
        name="username"
        type="text"
        placeholder="Username"
        label="Username"
      />
      <FormInput
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        label="Password"
      />
    </Form>
  );
}

export default Login;
