import { ingredientsSchema, type ingredientsValues } from "../types/formTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createApi } from "../api";
import { useAuth } from "../context/AuthContext";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import type { MouseEventHandler } from "react";

function Analyze() {
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
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
    <section className="font-figtree flex h-[80vh] items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <form
          className="mx-auto flex w-1/2 flex-col items-center justify-center space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full space-y-4">
            <h1 className="text-center text-6xl font-semibold">
              Pore Clogging Checker
            </h1>
            <p className="text-center">
              Checking for pore-clogging ingredients in your skincare before you
              buy have never been easier. In fact, you can even check if the
              product contains any ingredients you know that you react to.
              Please paste the ingredient list and ensure it is comma separated.
            </p>
          </div>
          <div className="grid w-full gap-3">
            <Label className="text-base font-bold" htmlFor="ingredients">
              Ingredients
            </Label>
            <Textarea
              rows={8}
              aria-rowspan={8}
              placeholder="Type ingredients separated by comma"
              {...register("ingredients")}
              name="ingredients"
              id="ingredients"
              className="placeholder:text-base"
            ></Textarea>
          </div>
          <div className="mt-5 flex w-full items-center justify-center space-x-6">
            <TemplateButton type="submit" text="Check" />
            <TemplateButton
              type="reset"
              className="bg-gray-600 hover:bg-gray-700"
              text="Clear"
              onClick={() => reset({ ingredients: "" })}
            />
            <TemplateButton
              type="button"
              className="bg-blue-600 hover:bg-blue-700"
              text="Add Your Own Ingredients"
            />
          </div>
        </form>
      </div>
    </section>
  );
}

function TemplateButton({
  text,
  className,
  onClick,
  type,
}: {
  text: string;
  className?: string;
  type: string;
  onClick?: MouseEventHandler;
}) {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`w-2/6 cursor-pointer px-4 py-6 text-base ${className}`}
    >
      {text}
    </Button>
  );
}

export default Analyze;
