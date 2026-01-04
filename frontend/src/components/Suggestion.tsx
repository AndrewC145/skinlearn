import InnerRoutineAlert from "./InnerRoutineAlert";
import { type SuggestionType } from "../types/Suggestion";

function Suggestion({ suggestions }: { suggestions: SuggestionType[] }) {
  return (
    <>
      {suggestions.length > 0 && (
        <div className="mt-4 w-full max-w-md rounded-lg border border-orange-300 bg-orange-50 p-4 text-center shadow">
          <InnerRoutineAlert text="Suggestions to improve your routine:" />
          <ul className="space-y-1 text-sm text-orange-400">
            {suggestions.map((suggestion: SuggestionType, idx: number) => (
              <li key={idx}>
                <span className="font-bold capitalize">
                  {suggestion.message}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Suggestion;
