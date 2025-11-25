import { Badge } from "../components/ui/badge";

function Product({ productName, tag }: { productName: string; tag: string }) {
  return (
    <div className="w-48 rounded-xl border-1 border-black p-4">
      <div className="space-y-1.5">
        <h3>{productName}</h3>
        <Badge variant="default">{tag}</Badge>
      </div>
    </div>
  );
}

export default Product;
