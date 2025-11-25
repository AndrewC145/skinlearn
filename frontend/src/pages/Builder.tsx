import RoutineTitle from "../components/RoutineTitle";
import Routine from "../components/Routine";
import { Sun, Moon } from "lucide-react";

function Builder() {
  return (
    <section className="flex h-screen items-center justify-center">
      <div className="flex flex-col gap-20">
        <RoutineTitle />
        <div className="flex">
          <Routine day="Day" icon={<Sun />} />
          <Routine day="Night" icon={<Moon />} />
        </div>
      </div>
    </section>
  );
}

export default Builder;
