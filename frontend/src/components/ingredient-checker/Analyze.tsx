import { useState } from "react";
import {
  ingredientsSchema,
  type ingredientsValues,
} from "../../types/formTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createApi } from "../../api";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import Modal from "./Modal";
import ComedogenicList from "./ComedogenicList";
import Error from "../Error";
import type { MouseEventHandler } from "react";
import { useAuth } from "../../context/AuthContext";

function Analyze() {
  const { token } = useAuth();
  const [personalIngredients, setPersonalIngredients] = useState<string[]>([]);
  const [comedogenicIngredients, setComedogenicIngredients] = useState<
    string[]
  >([]);
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
    try {
      const response = await createApi(token).post(
        "ingredients/analyze/",
        { data, personalIngredients },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        setComedogenicIngredients(response.data.comedogenic_ingredients);
      }
    } catch (error: unknown) {
      console.error(error);
      setComedogenicIngredients([]);
    }
  };

  const onReset = () => {
    setComedogenicIngredients([]);
    reset({ ingredients: "" });
  };
  return (
    <section className="flex items-center justify-center">
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <form
          className="mx-auto flex w-1/2 flex-col items-center justify-center space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full space-y-4">
            <h1 className="text-center text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl xl:text-[56px]">
              Pore Clogging Checker
            </h1>
            <p className="text-center text-base">
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
              className="max-w-full overflow-y-auto placeholder:text-base xl:max-h-56 2xl:max-h-64"
            ></Textarea>
            {errors && <Error err={errors.ingredients} />}
          </div>
          <div className="mt-5 flex w-full items-center justify-center space-x-6">
            <TemplateButton type="submit" text="Check" />
            <TemplateButton
              type="reset"
              className="bg-gray-600 hover:bg-gray-700"
              text="Clear"
              onClick={onReset}
            />
            <Modal
              personalIngredients={personalIngredients}
              setPersonalIngredients={setPersonalIngredients}
            />
          </div>
        </form>
        {comedogenicIngredients.length > 0 ? (
          <ComedogenicList comedogenicIngredients={comedogenicIngredients} />
        ) : null}
      </div>
    </section>
  );
}

export function TemplateButton({
  text,
  className,
  onClick,
  type,
}: {
  text: string;
  className?: string;
  type: "reset" | "button" | "submit" | undefined;
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
