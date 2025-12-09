import { useEffect, type SetStateAction } from "react";
import Product from "./Product";
import EmptyRoutine from "./EmptyRoutine";
import SearchModal from "./forms/SearchModal";
import { PackageSearch } from "lucide-react";
import { type RoutineProductType } from "../types/RoutineProductType";
import { type ProductType } from "../types/ProductType";

function Routine({
  day,
  icon,
  products,
  setProducts,
}: {
  day: string;
  icon: React.ReactNode;
  products: Set<RoutineProductType>;
  setProducts: React.Dispatch<SetStateAction<Set<RoutineProductType>>>;
}) {
  const removeProduct = async (p: ProductType) => {
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
        <SearchModal setRoutineProducts={setProducts} />
      </div>
      <div className={`mt-4 ${products.size && "grid grid-cols-3 gap-4"}`}>
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
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Routine;
