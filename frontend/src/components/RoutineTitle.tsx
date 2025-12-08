import Modal from "../components/ingredient-checker/Modal";
import { usePersonalIngredients } from "../context/PersonalIngredientsContext";
import { Button } from "../components/ui/button";

function RoutineTitle() {
  const { personalIngredients, setPersonalIngredients } =
    usePersonalIngredients();
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h1 className="text-center text-5xl font-semibold">Routine Builder</h1>
      <Modal
        setPersonalIngredients={setPersonalIngredients}
        personalIngredients={personalIngredients}
        trigger={
          <Button className="cursor-pointer">
            Add Comedogenic Ingredients
          </Button>
        }
      />
    </div>
  );
}

export default RoutineTitle;
