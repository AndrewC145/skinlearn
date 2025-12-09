import { Badge } from "../components/ui/badge";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";

function Product({
  productName,
  image,
  tag,
  onClick,
}: {
  productName: string;
  image: string;
  tag: string;
  onClick?: () => void;
}) {
  return (
    <div className="rounded-xl border-1 border-black p-4">
      <div className="flex h-full flex-col">
        <h3 className="mb-4 text-sm">{productName}</h3>
        <div className="flex flex-grow items-center justify-center">
          <img className="size-40 object-cover" src={image} />
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <Badge variant="default">{tag}</Badge>
          {onClick ? (
            <Button
              onClick={onClick}
              aria-label="add"
              variant="outline"
              size="icon"
              className="cursor-pointer"
            >
              <Plus />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Product;
