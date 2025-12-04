import { CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

function DashboardAlert({ productName }: { productName: string }) {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Success! Your product has been deleted</AlertTitle>
        <AlertDescription>
          The product {productName} has been deleted{" "}
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default DashboardAlert;
