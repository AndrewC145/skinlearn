import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export const title = "Standard Card";

function SubmittedProducts({
  title,
  brand,
  ingredients,
}: {
  title: string;
  brand: string;
  ingredients: string;
}) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Brand {brand}</CardDescription>
      </CardHeader>
      <CardContent>
        <span>Ingredients</span>
        <p>{ingredients}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
      </CardFooter>
    </Card>
  );
}

export default SubmittedProducts;
