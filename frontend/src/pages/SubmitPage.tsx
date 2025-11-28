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

function SubmitPage() {
  const [customErr, setCustomErr] = useState<string | undefined>("");

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
    console.log(data);
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
            <Label htmlFor="ingredients" className="sr-only">
              Ingredients
            </Label>
            <Textarea
              id="ingredients"
              {...register("ingredients")}
              className="rounded-sm border-none bg-[#F2EDE0] p-2.5 outline-none placeholder:text-base focus:border-2 focus:border-solid"
              rows={8}
              placeholder="Ingredients"
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SubmitPage;
