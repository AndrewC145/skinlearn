import RoutineTitle from "../components/RoutineTitle";
import Routine from "../components/Routine";
import { Sun, Moon } from "lucide-react";
import { useRoutine } from "../context/RoutineContext";

function Builder() {
  const { dayProducts, nightProducts, setDayProducts, setNightProducts } =
    useRoutine();

  return (
    <section className="flex min-h-screen items-center justify-center py-8">
      <div className="flex flex-col gap-20">
        <RoutineTitle />
        <div className="flex justify-between gap-8 px-8">
          <Routine
            day={true}
            products={dayProducts}
            setProducts={setDayProducts}
            icon={<Sun />}
          />
          <Routine
            day={false}
            products={nightProducts}
            setProducts={setNightProducts}
            icon={<Moon />}
          />
        </div>
      </div>
    </section>
  );
}

export default Builder;
