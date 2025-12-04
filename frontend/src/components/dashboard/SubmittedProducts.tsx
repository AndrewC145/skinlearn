import { Button } from "../../components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

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
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription>
          Brand: {brand} <br /> Submitted by: {username}
        </CardDescription>
      </CardHeader>
      <div className="flex-grow"></div>
      <CardFooter className="flex justify-between">
        <Button onClick={onClick} variant="outline" className="cursor-pointer">
          Delete
        </Button>
        <Button variant="default" className="cursor-pointer">
          View
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SubmittedProducts;
