import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

function ProductOverview({
  title,
  brand,
  ingredients,
  children,
}: {
  title: string;
  brand: string;
  ingredients: string[];
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <div>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:h-80 xl:h-[60vh] 2xl:h-1/2">
          <DialogHeader>
            <DialogTitle className="capitalize">{title}</DialogTitle>
            <DialogDescription>Brand: {brand}</DialogDescription>
          </DialogHeader>
          <div className="overflow-scroll">
            <h3 className="mb-4">Ingredients:</h3>
            <ul className="grid grid-cols-3 gap-3">
              {ingredients.map((ing, index) => (
                <li key={index} className="flex items-center text-sm">
                  {ing}
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}

export default ProductOverview;
