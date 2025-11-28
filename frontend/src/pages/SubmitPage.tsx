/* eslint-disable @typescript-eslint/no-explicit-any */
import { productSchema, type productFormValues } from "../types/formTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import productImg from "../assets/images/product-bg.jpg";
import FormInput from "../components/FormInput";
import { createApi } from "../api";
import type { AxiosResponse } from "axios";
import { useAuth } from "../context/AuthContext";

function SubmitPage() {
  const { token } = useAuth();
  const [customErr, setCustomErr] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

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
      }
    } catch (error: any) {
      console.error(error);
      setCustomErr(error.response.data);
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
          action=""
        >
          <div className="space-y-6 rounded-md">
            <h1 className="text-2xl font-semibold">Submit a Product</h1>
            <FormInput
              id="name"
              name="name"
              placeholder="Product Name"
              register={register}
              errors={errors.name}
              label="Product Name"
              type="text"
            />
            <FormInput
              id="brand"
              name="brand"
              placeholder="Brand"
              register={register}
              errors={errors.brand}
              label="Brand"
              type="text"
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
              {errors.ingredients && (
                <p className="text-sm text-red-500">
                  {errors.ingredients.message}
                </p>
              )}
            </div>
            {success && <p className="text-sm text-green-500">{success}</p>}
            {customErr && <p className="text-sm text-red-500">{customErr}</p>}
            <Button type="submit" className="w-full cursor-pointer">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SubmitPage;
