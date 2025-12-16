import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

type ProductProps = {
  productName: string;
  image: string;
  tag: string;
  onClick?: () => void;
  icon: React.ReactNode;
};

function Product({ productName, image, tag, onClick, icon }: ProductProps) {
  return (
    <div className="w-full rounded-xl border-1 border-black p-4">
      <div className="flex h-full flex-col">
        <h3 className="mb-4 max-w-[200px] text-sm">{productName}</h3>
        <div className="flex h-40 flex-grow items-center justify-center">
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
              {icon}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Product;
