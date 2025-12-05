/* eslint-disable @typescript-eslint/no-explicit-any */
import { productSchema, type productFormValues } from "../types/formTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import productImg from "../assets/images/product-bg.jpg";
import { createApi } from "../api";
import type { AxiosResponse } from "axios";
import { SubmitInput, SubmitError } from "../components/forms/SubmitInput";
import { useAuth } from "../context/AuthContext";

function SubmitPage() {
  const { token } = useAuth();
  const [fieldErrors, setFieldErrors] = useState<Record<
    string,
    string[]
  > | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [customErr, setCustomErr] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<productFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      brand: "",
      ingredients: "",
    },
  });

  const onSubmit = async (data: productFormValues) => {
    try {
      const response: AxiosResponse = await createApi(token).post(
        "ingredients/submit/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 201) {
        setSuccess(response.data.message);
        setFieldErrors(null);
        setCustomErr(null);

        setTimeout(() => {
          setSuccess(null);
        }, 2500);
      }
    } catch (error: any) {
      console.error(error);
      if (
        error.response?.data?.error &&
        typeof error.response.data.error === "object"
      ) {
        setFieldErrors(error.response.data.error);
      }

      if (error.status === 429) {
        setCustomErr(error.response?.data?.detail);
      }
    }
  };

  return (
    <section
      style={{
        backgroundImage: `url(${productImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex h-screen items-center justify-center">
        <form
          className="w-1/3 rounded-md border-1 bg-white p-8 shadow-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-6 rounded-md">
            <h1 className="text-2xl font-semibold">Submit a Product</h1>
            <SubmitInput
              id="name"
              name="name"
              placeholder="Product Name"
              register={register}
              errors={errors.name}
              label="Product Name"
              type="text"
              fieldErrors={fieldErrors?.name}
            />

            <SubmitInput
              id="brand"
              name="brand"
              placeholder="Brand"
              register={register}
              errors={errors.brand}
              label="Brand"
              type="text"
              fieldErrors={fieldErrors?.brand}
            />

            <div className="space-y-2">
              <Label htmlFor="ingredients" className="sr-only">
                Ingredients
              </Label>
              <Textarea
                id="ingredients"
                {...register("ingredients")}
                className="max-w-full rounded-sm border-none bg-[#F2EDE0] p-2.5 outline-none placeholder:text-base focus:border-2 focus:border-solid xl:max-h-56 2xl:max-h-64"
                rows={8}
                placeholder="Ingredients"
              />
              {errors.ingredients && <InlineError err={errors.ingredients} />}
              {fieldErrors?.ingredients && (
                <SubmitError err={fieldErrors.ingredients} />
              )}
              {customErr && <InlineError err={customErr} />}
            </div>
            {success && <p className="text-sm text-green-500">{success}</p>}
            <Button type="submit" className="w-full cursor-pointer">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function InlineError({ err }: { err: any }) {
  return <p className="text-sm text-red-500">{err}</p>;
}

export default SubmitPage;
