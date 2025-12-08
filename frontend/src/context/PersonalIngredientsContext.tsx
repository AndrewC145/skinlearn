import { useContext, createContext, type SetStateAction } from "react";

type PersonalIngredientsContextType = {
  personalIngredients: string[];
  setPersonalIngredients: React.Dispatch<SetStateAction<string[]>>;
};

export const PersonalIngredientsContext =
  createContext<PersonalIngredientsContextType>({
    personalIngredients: [],
    setPersonalIngredients: () => {},
  });

export const usePersonalIngredients = () => {
  return useContext(PersonalIngredientsContext);
};
