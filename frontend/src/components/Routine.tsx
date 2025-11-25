import { useState, useEffect } from "react";
import Product from "./Product";
import EmptyRoutine from "./EmptyRoutine";
import SearchModal from "./SearchModal";
import { PackageSearch } from "lucide-react";
type ProductTypes = {
  productName: string;
  tag: string;
};

function Routine({ day, icon }: { day: string; icon: React.ReactNode }) {
  const [products, setProducts] = useState<ProductTypes | null>(null);
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold">{day} Skincare Routine</h2>
      <div className="mt-2 flex items-center space-x-4">
        <div className="flex space-x-2">
          {icon}
          <span>Routine</span>
        </div>
        <SearchModal />
      </div>
      <div className="mt-4">
        {!products ? (
          <EmptyRoutine
            icon={<PackageSearch />}
            title="No Products Yet"
            description="You haven't added any projects yet for this routine. Get started
          by adding your first product."
          />
        ) : null}
      </div>
    </div>
  );
}

export default Routine;
