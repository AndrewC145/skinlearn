import { ingredientsSchema, type ingredientsValues } from "../types/formTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createApi } from "../api";
import { useAuth } from "../context/AuthContext";

function Analyze() {
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ingredientsValues>({
    resolver: zodResolver(ingredientsSchema),
    defaultValues: {
      ingredients: "",
    },
  });

  const onSubmit = async (data: ingredientsValues) => {
    // const parsed = data.ingredients.split(/,(?!\d+-)/).map((s) => s.trim());

    try {
      const response = await createApi(token).post(
        "ingredients/analyze/",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log(response);
    } catch (error: unknown) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Please separate ingredients by commas</p>
      <label htmlFor="ingredients">Ingredients</label>
      <textarea
        {...register("ingredients")}
        name="ingredients"
        id="ingredients"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Analyze;
