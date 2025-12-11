/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Search, CirclePlus, CircleQuestionMark, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import EmptyRoutine from "../EmptyRoutine";
import { EmptyContent } from "../ui/empty";
import { Link } from "react-router";
import { createApi } from "../../api";
import { useState, useEffect, type SetStateAction } from "react";
import type { AxiosResponse } from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Product from "../../components/Product";
import useDebounce from "../../hooks/useDebounce";
import { type RoutineProductType } from "../../types/RoutineProductType";
import { useAuth } from "../../context/AuthContext";
import { type ProductType } from "../../types/ProductType";

function SearchModal({
  routineProducts,
  setRoutineProducts,
}: {
  routineProducts: Set<RoutineProductType>;
  setRoutineProducts: React.Dispatch<SetStateAction<Set<RoutineProductType>>>;
}) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { user, token } = useAuth();

  const debounce = useDebounce(searchText, 450);

  useEffect(() => {
    if (!hasMore) return;
    fetchData();
  }, [page, debounce, hasMore]);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [debounce]);

  const fetchData = async () => {
    const endpoint = `api/products/?page=${page}&search=${searchText}`;
    try {
      const response: AxiosResponse = await createApi(null).get(endpoint, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        const { results, next } = response.data;

        setProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newProducts = results.filter(
            (p: ProductType) => !existingIds.has(p.id),
          );
          return [...prev, ...newProducts];
        });

        setHasMore(!!next);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const addProduct = async (p: ProductType) => {
    setRoutineProducts((prev) => new Set(prev.add(p)));
    if (!user)
      localStorage.setItem("products", JSON.stringify(routineProducts));

    try {
      const response: AxiosResponse = await createApi(token).post(
        "api/products/save/",
        {
          product: p,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      console.log(response);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer" size="sm">
            <CirclePlus />
            Add new product
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-1/3 xl:min-w-1/2">
          <DialogHeader>
            <DialogTitle>Search Products</DialogTitle>
            <DialogDescription>
              Search for popular skincare products for your routine
            </DialogDescription>
          </DialogHeader>
          <div className="w-full space-y-2">
            <Label htmlFor="search-input">Search</Label>
            <div className="relative flex gap-3">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                className="bg-background pl-9"
                id="search-input"
                type="search"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
          <div id="scroll-container" className="h-[400px] overflow-y-scroll">
            <InfiniteScroll
              className={`${products.length > 0 ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" : "flex items-center justify-center"}`}
              dataLength={products.length}
              next={() => setPage((prev) => prev + 1)}
              hasMore={hasMore}
              loader={<h4>Loading... </h4>}
              scrollableTarget="scroll-container"
            >
              {products.length > 0 ? (
                products.map((p: ProductType) => (
                  <Product
                    key={p.id}
                    productName={p.brand + " " + p.name}
                    image={p.image}
                    tag={p.category}
                    icon={<Plus />}
                    onClick={() => addProduct(p)}
                  />
                ))
              ) : (
                <EmptyRoutine
                  icon={<CircleQuestionMark />}
                  title="No product was found"
                  description="There are no products with this name. If you want to add it, please submit a request"
                  children={<EmptyRoutineChildren />}
                />
              )}
            </InfiniteScroll>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}

function EmptyRoutineChildren() {
  return (
    <EmptyContent className="flex flex-row items-center justify-center">
      <Link to="/submit-product">
        <Button className="cursor-pointer">Submit Product</Button>
      </Link>
      <Button variant="outline" className="cursor-pointer">
        Add custom product
      </Button>
    </EmptyContent>
  );
}

export default SearchModal;
