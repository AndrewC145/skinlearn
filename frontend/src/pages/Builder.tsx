import RoutineTitle from "../components/RoutineTitle";
import Routine from "../components/Routine";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { type RoutineProductType } from "../types/RoutineProductType";
import { useAuth } from "../context/AuthContext";

function Builder() {
  const [dayProducts, setDayProducts] = useState<Set<RoutineProductType>>(
    new Set([]),
  );
  const [nightProducts, setNightProducts] = useState<Set<RoutineProductType>>(
    new Set([]),
  );
  const { user } = useAuth();

  return (
    <section className="flex h-screen items-center justify-center">
      <div className="flex flex-col gap-20">
        <RoutineTitle />
        <div className="flex justify-between">
          <Routine
            day="Day"
            products={dayProducts}
            setProducts={setDayProducts}
            icon={<Sun />}
          />
          <Routine
            day="Night"
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
