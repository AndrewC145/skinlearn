import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { CirclePlus, SendHorizontal, CircleQuestionMark } from "lucide-react";
import EmptyRoutine from "../EmptyRoutine";
import { EmptyContent } from "../ui/empty";
import { Link } from "react-router";

function SearchModal() {
  return (
    <Dialog>
      <form action="">
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer" size="sm">
            <CirclePlus />
            Add new product
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Search Products</DialogTitle>
            <DialogDescription>
              Search for popular skincare products for your routine
            </DialogDescription>
          </DialogHeader>
          <div className="w-full max-w-sm space-y-2">
            <Label htmlFor="search-input">Search</Label>
            <div className="relative flex gap-3">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                className="bg-background pl-9"
                id="search-input"
                type="search"
                placeholder="Search..."
              />
              <Button variant="outline" className="cursor-pointer" size="icon">
                <SendHorizontal />
              </Button>
            </div>
          </div>
          <EmptyRoutine
            icon={<CircleQuestionMark />}
            title="No product was found"
            description="There are no products with this name. If you want to add it, please submit a request"
            children={<EmptyRoutineChildren />}
          />
        </DialogContent>
      </form>
    </Dialog>
  );
}

function EmptyRoutineChildren() {
  return (
    <EmptyContent>
      <Link to="/submit-product">
        <Button className="cursor-pointer">Add Product</Button>
      </Link>
    </EmptyContent>
  );
}

export default SearchModal;
