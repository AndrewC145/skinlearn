import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

type ProductProps = {
  productName: string;
  image: string;
  tag: string;
  onClick?: () => void;
  icon: React.ReactNode;
  className?: string;
};

function Product({
  productName,
  image,
  tag,
  onClick,
  icon,
  className,
}: ProductProps) {
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
              {icon}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Product;
