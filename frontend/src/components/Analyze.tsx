import { ingredientsSchema, type ingredientsValues } from "../types/formTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function Analyze() {
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

  const onSubmit = (data: ingredientsValues) => {
    const parsed = data.ingredients.split(/,(?!\d+-)/).map((s) => s.trim());
    console.log(parsed);
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
