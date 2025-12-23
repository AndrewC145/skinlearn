import { useContext, createContext, type SetStateAction } from "react";
import { type RoutineProductType } from "../types/RoutineProductType";
import { type RoutineInfoType } from "../types/RoutineInfoType";
import { type BadComboType } from "../types/BadComboType";

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
  dayProductInfo?: RoutineInfoType[];
  setDayProductInfo?: React.Dispatch<SetStateAction<RoutineInfoType[]>>;
  nightProductInfo?: RoutineInfoType[];
  setNightProductInfo?: React.Dispatch<SetStateAction<RoutineInfoType[]>>;
  dayRoutineIssues?: Set<BadComboType>;
  nightRoutineIssues?: Set<BadComboType>;
  setDayRoutineIssues?: React.Dispatch<SetStateAction<Set<BadComboType>>>;
  setNightRoutineIssues?: React.Dispatch<SetStateAction<Set<BadComboType>>>;
  identifiers?: Set<string[]>;
  setIdentifiers?: React.Dispatch<SetStateAction<Set<string[]>>>;
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
  dayProductInfo: undefined,
  setDayProductInfo: () => {},
  nightProductInfo: undefined,
  setNightProductInfo: () => {},
  dayRoutineIssues: undefined,
  nightRoutineIssues: undefined,
  setDayRoutineIssues: () => {},
  setNightRoutineIssues: () => {},
  identifiers: new Set([]),
  setIdentifiers: () => {},
});

export const useRoutine = () => {
  return useContext(RoutineContext);
};
