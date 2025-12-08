import { useState, useEffect } from "react";
import { PersonalIngredientsContext } from "./PersonalIngredientsContext";

function PersonalIngredientsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [personalIngredients, setPersonalIngredients] = useState<string[]>([]);

  return (
    <PersonalIngredientsContext.Provider
      value={{ personalIngredients, setPersonalIngredients }}
    >
      {children}
    </PersonalIngredientsContext.Provider>
  );
}

export default PersonalIngredientsProvider;
