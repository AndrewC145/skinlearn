function ComedogenicList({
  comedogenicIngredients,
}: {
  comedogenicIngredients: string[];
}) {
  return (
    <div className="space-y-4 pt-10 text-center">
      <p className="text-lg">
        This product contains pore-clogging ingredients or ingredients that you
        personally avoid.
      </p>
      <div className="flex flex-wrap items-center justify-center space-x-4 pt-3">
        {comedogenicIngredients.map((ing: string, index: number) => (
          <div
            className="inline rounded-xs border-1 border-red-400 p-2.5 text-red-500"
            key={index}
          >
            {ing}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComedogenicList;
