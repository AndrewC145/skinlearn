import { CirclePlus } from "lucide-react";
import { useState, useEffect } from "react";
import Product from "./Product";
import { Button } from "../components/ui/button";
import EmptyRoutine from "./EmptyRoutine";

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
        <Button variant="outline" className="cursor-pointer" size="sm">
          <CirclePlus />
          Add new product
        </Button>
      </div>
      <div className="mt-4">{!products ? <EmptyRoutine /> : null}</div>
    </div>
  );
}

export default Routine;
