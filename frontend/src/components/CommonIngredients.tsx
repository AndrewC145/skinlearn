import { useState, useEffect } from "react";
import { createApi } from "../api";
import { useAuth } from "../context/AuthContext";

function CommonIngredients() {
  const { token } = useAuth();
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await createApi(token).get("ingredients/", {});

        console.log(response);

        if (response.status === 200) setIngredients(response.data.ingredients);
      } catch (error: unknown) {
        console.error(error);
        setIngredients([]);
      }
    };

    fetchIngredients();
  }, [token]);
  return (
    <section className="flex items-center justify-center">
      <div className="my-10 w-3/4 space-y-4">
        <h2 className="self-start text-3xl font-semibold">
          List of common pore-clogging ingredients
        </h2>
        <p>
          This is a list of the most common pore clogging ingredients out there.
          If you have sensitive or acne-prone skin, be wary about putting any of
          these ingredients on your skin. However, everyone's skin is different,
          an ingredient here may or may not work for you regardless if you are
          acne prone or not. Always check the ingredient list before applying
          any products on your body or skin, and if you are unsure, always
          consult a dermatologist or doctor.
        </p>
        <div className="rounded-sm border-1 border-black p-4 shadow-lg">
          <h3 className="mb-3 font-semibold">Ingredients</h3>
          <ul className="grid grid-cols-3 gap-y-2">
            {ingredients &&
              ingredients.map((ing, index) => (
                <li className="h-auto w-full text-sm break-words" key={index}>
                  {ing}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default CommonIngredients;
