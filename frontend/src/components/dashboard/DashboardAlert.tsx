import { CheckCircle2Icon } from "lucide-react";
import { Alert, AlertTitle } from "../ui/alert";

function DashboardAlert() {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Success! Your product has been deleted</AlertTitle>
      </Alert>
    </div>
  );
}

export default DashboardAlert;
