import { useEffect, type SetStateAction } from "react";
import Product from "./Product";
import EmptyRoutine from "./EmptyRoutine";
import SearchModal from "./forms/SearchModal";
import { PackageSearch } from "lucide-react";
import { type RoutineProductType } from "../types/RoutineProductType";
import { Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Routine({
  day,
  icon,
  products,
  setProducts,
}: {
  day: boolean;
  icon: React.ReactNode;
  products: Set<RoutineProductType>;
  setProducts: React.Dispatch<SetStateAction<Set<RoutineProductType>>>;
}) {
  const { user } = useAuth();

  const removeProduct = async (p: RoutineProductType) => {
    setProducts((prev) => {
      prev.delete(p);
      return new Set(prev);
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold">{day} Skincare Routine</h2>
      <div className="mt-2 flex items-center space-x-4">
        <div className="flex space-x-2">
          {icon}
          <span>Routine</span>
        </div>
        <SearchModal
          day={day}
          routineProducts={products}
          setRoutineProducts={setProducts}
        />
      </div>
      <div
        className={`mt-8 ${products.size && "grid max-h-[350px] grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2"}`}
      >
        {!products.size ? (
          <EmptyRoutine
            icon={<PackageSearch />}
            title="No Products Yet"
            description="You haven't added any projects yet for this routine. Get started
          by adding your first product."
          />
        ) : (
          Array.from(products).map((p: RoutineProductType, index: number) => (
            <Product
              key={index}
              productName={p.name}
              image={p.image}
              tag={p.category}
              icon={<Trash2 />}
              onClick={() => removeProduct(p)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Routine;
