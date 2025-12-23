import RoutineTitle from "../components/RoutineTitle";
import Routine from "../components/Routine";
import { Sun, Moon } from "lucide-react";
import { useRoutine } from "../context/RoutineContext";

function Builder() {
  const {
    dayProducts,
    nightProducts,
    setDayProducts,
    setNightProducts,
    dayProductInfo,
    setDayProductInfo,
    nightProductInfo,
    setNightProductInfo,
    dayRoutineIssues,
    nightRoutineIssues,
  } = useRoutine();

  return (
    <section className="flex min-h-screen items-center justify-center py-8">
      <div className="flex flex-col gap-20">
        <RoutineTitle />
        <div className="flex justify-between gap-8 px-8">
          <Routine
            day={true}
            products={dayProducts}
            setProducts={setDayProducts}
            productInfo={dayProductInfo}
            setProductInfo={setDayProductInfo}
            routineIssues={dayRoutineIssues}
            icon={<Sun />}
          />
          <Routine
            day={false}
            products={nightProducts}
            setProducts={setNightProducts}
            productInfo={nightProductInfo}
            setProductInfo={setNightProductInfo}
            routineIssues={nightRoutineIssues}
            icon={<Moon />}
          />
        </div>
      </div>
    </section>
  );
}

export default Builder;
