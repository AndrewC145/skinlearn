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
    setDayRoutineIssues,
    setNightRoutineIssues,
    setDaySuggestions,
    setNightSuggestions,
    daySuggestions,
    nightSuggestions,
  } = useRoutine();

  return (
    <section className="flex min-h-screen items-center justify-center py-20">
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
            setRoutineIssues={setDayRoutineIssues}
            icon={<Sun />}
            suggestions={daySuggestions}
            setSuggestions={setDaySuggestions}
          />
          <Routine
            day={false}
            products={nightProducts}
            setProducts={setNightProducts}
            productInfo={nightProductInfo}
            setProductInfo={setNightProductInfo}
            routineIssues={nightRoutineIssues}
            setRoutineIssues={setNightRoutineIssues}
            icon={<Moon />}
            suggestions={nightSuggestions}
            setSuggestions={setNightSuggestions}
          />
        </div>
      </div>
    </section>
  );
}

export default Builder;
