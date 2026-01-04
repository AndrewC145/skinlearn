/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { createApi } from "../../api";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  customProductSchema,
  type customProductFormValues,
} from "../../types/formTypes";
import { type RoutineProductType } from "../../types/RoutineProductType";
import { useRoutine } from "../../context/RoutineContext";

function CustomProduct({
  day,
  setRoutineProducts,
}: {
  day: boolean;
  setRoutineProducts?: React.Dispatch<
    React.SetStateAction<Set<RoutineProductType>>
  >;
}) {
  const { token, user } = useAuth();
  const {
    dayProductIds,
    nightProductIds,
    setDayProductIds,
    setNightProductIds,
  } = useRoutine();
  const [success, setSuccess] = useState<string | null>(null);
  const [customErr, setCustomErr] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<customProductFormValues>({
    resolver: zodResolver(customProductSchema),
    defaultValues: {
      name: "",
      brand: "",
      ingredients: "",
      category: "Cleanser",
      day: day,
    },
  });

  const onSubmit = async (data: customProductFormValues) => {
    if (user) {
      try {
        const response = await createApi(token).post(
          "api/products/submit/custom/",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          },
        );

        if (response.status === 201) {
          setSuccess("Custom product added successfully!");
          setCustomErr(null);

          const product = response.data.product;

          if (day) {
            setDayProductIds(
              new Set([...Array.from(dayProductIds), product.id]),
            );
          } else {
            setNightProductIds(
              new Set([...Array.from(nightProductIds), product.id]),
            );
          }

          setRoutineProducts?.(
            (prev) => new Set([...Array.from(prev), product]),
          );
        }
      } catch (error: any) {
        console.error(error);
        setCustomErr(
          error.response?.data?.error || "An error occurred. Please try again.",
        );
        setSuccess(null);
      }
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Add Custom Product</Button>
        </DialogTrigger>
        {user ? (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Custom Product</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a custom product.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  placeholder="Enter brand name"
                  {...register("brand")}
                />
                {errors.brand && (
                  <p className="text-sm text-red-500">{errors.brand.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ingredients">Ingredients</Label>
                <Textarea
                  rows={5}
                  id="ingredients"
                  placeholder="List ingredients separated by commas"
                  {...register("ingredients")}
                />
                {errors.ingredients && (
                  <p className="text-sm text-red-500">
                    {errors.ingredients.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Controller
                  name="category"
                  control={control}
                  defaultValue="Cleanser"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="category" className="w-2/5">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cleanser">Cleanser</SelectItem>
                        <SelectItem value="Moisturizer">Moisturizer</SelectItem>
                        <SelectItem value="Toner">Toner</SelectItem>
                        <SelectItem value="Sunscreen">Sunscreen</SelectItem>
                        <SelectItem value="Serum">Serum</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-sm text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>
              {success && <p className="text-sm text-green-500">{success}</p>}
              {customErr && <p className="text-sm text-red-500">{customErr}</p>}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        ) : null}
      </form>
    </Dialog>
  );
}

export default CustomProduct;
