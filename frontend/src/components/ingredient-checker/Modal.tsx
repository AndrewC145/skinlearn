/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { X, SendHorizontal } from "lucide-react";
import type { MouseEventHandler, SetStateAction } from "react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { createApi } from "../../api";
import { type AxiosResponse } from "axios";

type ModalProps = {
  personalIngredients: string[];
  setPersonalIngredients: React.Dispatch<SetStateAction<string[]>>;
  trigger: React.ReactNode;
};

function Modal({
  personalIngredients,
  setPersonalIngredients,
  trigger,
}: ModalProps) {
  const [ingredientValue, setIngredientValue] = useState<string>("");
  const [submitted, setIsSubmitted] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { user, token } = useAuth();

  const originalIngredients = useRef<string[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      if (user) {
        try {
          const response: AxiosResponse = await createApi(token).get(
            `api/users/ingredients/${user.id}/`,
          );

          if (response.status === 200) {
            setPersonalIngredients(response.data.ingredients.avoid_ingredients);
          }
        } catch (error: any) {
          console.error(error);
        }
      }
    };

    fetchIngredients();
  }, [user, token, setPersonalIngredients]);

  const onSubmit = async () => {
    if (user) {
      try {
        const response: AxiosResponse = await createApi(token).patch(
          `api/users/ingredients/${user.id}/`,
          { avoid_ingredients: personalIngredients },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );

        console.log(response);
      } catch (error: any) {
        console.error(error);
      }
    }

    setIsSubmitted(false);
    setOpen(false);
  };

  const addIngredient = (ingredient: string) => {
    if (personalIngredients && !personalIngredients.includes(ingredient)) {
      setPersonalIngredients((prev) => [...prev, ingredient]);
    }
    setIngredientValue("");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientValue(e.currentTarget.value);
  };

  const deleteIngredient = (ingredient: string) => {
    setPersonalIngredients((prev) => prev.filter((ing) => ing !== ingredient));
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      originalIngredients.current = [...personalIngredients];
    } else {
      if (!submitted) {
        setPersonalIngredients(originalIngredients.current);
      }
      setIsSubmitted(false);
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-[#fffbf3]">
        <DialogHeader>
          <DialogTitle>Add Comedogenic Ingredients</DialogTitle>
          <DialogDescription>
            Add any ingredients that you personally react to for additional
            checking
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="personal-ingredients">Ingredient</Label>
            <div className="flex items-center gap-3">
              <Input
                onChange={onChange}
                id="personal-ingredients"
                name="personal-ingredients"
                placeholder="Ex: Niacinamide"
                value={ingredientValue}
              />
              <Button
                className="cursor-pointer bg-[#fffbf3]"
                variant="outline"
                aria-label="add-ingredient"
                size="icon"
                onClick={() => addIngredient(ingredientValue)}
              >
                <SendHorizontal />
              </Button>
            </div>
          </div>
          <div className="grid gap-3">
            <Label>Ingredient List</Label>
            <div className="flex flex-wrap gap-4">
              {personalIngredients.length > 0 ? (
                personalIngredients.map((ingredient, index) => (
                  <IngredientItem
                    onClick={() => deleteIngredient(ingredient)}
                    name={ingredient}
                    key={index}
                  />
                ))
              ) : (
                <span className="text-sm text-gray-500">
                  No ingredients added
                </span>
              )}
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onSubmit} className="cursor-pointer" type="submit">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function IngredientItem({
  name,
  onClick,
}: {
  name: string;
  onClick: MouseEventHandler;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-sm border-1 border-black px-2 py-1.5">
      <p className="text-sm">{name}</p>
      <X className="cursor-pointer" size={20} onClick={onClick}></X>
    </div>
  );
}

export default Modal;
