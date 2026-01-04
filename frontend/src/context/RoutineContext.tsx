import { useContext, createContext, type SetStateAction } from "react";
import { type RoutineProductType } from "../types/RoutineProductType";
import { type RoutineInfoType } from "../types/RoutineInfoType";
import { type BadComboType } from "../types/BadComboType";
import { type SuggestionType } from "../types/Suggestion";

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
  dayRoutineIssues: Record<string, BadComboType>;
  nightRoutineIssues: Record<string, BadComboType>;
  setDayRoutineIssues: React.Dispatch<
    SetStateAction<Record<string, BadComboType>>
  >;
  setNightRoutineIssues: React.Dispatch<
    SetStateAction<Record<string, BadComboType>>
  >;
  daySuggestions?: SuggestionType[];
  nightSuggestions?: SuggestionType[];
  setDaySuggestions?: React.Dispatch<SetStateAction<SuggestionType[]>>;
  setNightSuggestions?: React.Dispatch<SetStateAction<SuggestionType[]>>;
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
  dayRoutineIssues: {},
  nightRoutineIssues: {},
  setDayRoutineIssues: () => {},
  setNightRoutineIssues: () => {},
  daySuggestions: undefined,
  nightSuggestions: undefined,
  setDaySuggestions: () => {},
  setNightSuggestions: () => {},
});

export const useRoutine = () => {
  return useContext(RoutineContext);
};
