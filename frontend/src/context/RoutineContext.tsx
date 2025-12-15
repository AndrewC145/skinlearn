import { useContext, createContext, type SetStateAction } from "react";
import { type RoutineProductType } from "../types/RoutineProductType";

type RoutineContextType = {
  dayProducts: Set<RoutineProductType>;
  setDayProducts: React.Dispatch<SetStateAction<Set<RoutineProductType>>>;
  nightProducts: Set<RoutineProductType>;
  setNightProducts: React.Dispatch<SetStateAction<Set<RoutineProductType>>>;
  hydrated?: boolean;
  setHydrated?: React.Dispatch<SetStateAction<boolean>>;
  dayProductIds: Set<number>;
  setDayProductIds: React.Dispatch<SetStateAction<Set<number>>>;
  nightProductIds: Set<number>;
  setNightProductIds: React.Dispatch<SetStateAction<Set<number>>>;
};

export const RoutineContext = createContext<RoutineContextType>({
  dayProducts: new Set([]),
  setDayProducts: () => {},
  nightProducts: new Set([]),
  setNightProducts: () => {},
  hydrated: false,
  setHydrated: () => {},
  dayProductIds: new Set([]),
  setDayProductIds: () => {},
  nightProductIds: new Set([]),
  setNightProductIds: () => {},
});

export const useRoutine = () => {
  return useContext(RoutineContext);
};
