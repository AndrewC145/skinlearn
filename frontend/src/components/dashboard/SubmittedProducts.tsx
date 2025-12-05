import { Button } from "../../components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import DeleteAlert from "./DeleteAlert";
import ProductOverview from "./ProductOverview";

export const title = "Standard Card";

function SubmittedProducts({
  title,
  brand,
  username,
  ingredients,
  onClick,
}: {
  title: string;
  brand: string;
  username: string;
  ingredients: string[];
  onClick: () => Promise<void>;
}) {
  return (
    <Card className="font-figtree w-[350px]">
      <CardHeader>
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription>
          Brand: {brand} <br /> Submitted by: {username}
        </CardDescription>
      </CardHeader>
      <div className="flex-grow"></div>
      <CardFooter className="flex justify-between">
        <DeleteAlert
          children={
            <Button variant="outline" className="cursor-pointer">
              Delete
            </Button>
          }
          onClick={onClick}
        />
        <ProductOverview
          title={title}
          brand={brand}
          ingredients={ingredients}
          children={
            <Button variant="default" className="cursor-pointer">
              View
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
}

export default SubmittedProducts;
