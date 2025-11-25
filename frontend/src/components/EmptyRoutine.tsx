import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../components/ui/empty";
import { PackageSearch } from "lucide-react";

function EmptyRoutine() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageSearch />
        </EmptyMedia>
        <EmptyTitle>No Products Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t added any projects yet for this routine. Get started
          by adding your first product.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

export default EmptyRoutine;
