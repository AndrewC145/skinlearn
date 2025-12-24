/* eslint-disable @typescript-eslint/no-explicit-any */
import { type SetStateAction } from "react";
import Product from "./Product";
import EmptyRoutine from "./EmptyRoutine";
import SearchModal from "./forms/SearchModal";
import { PackageSearch } from "lucide-react";
import { type RoutineProductType } from "../types/RoutineProductType";
import { Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import type { AxiosResponse } from "axios";
import { createApi } from "../api";
import { useRoutine } from "../context/RoutineContext";
import { type RoutineInfoType } from "../types/RoutineInfoType";
import { type BadComboType } from "../types/BadComboType";

function Routine({
  day,
  icon,
  products,
  setProducts,
  productInfo,
  setProductInfo,
  routineIssues,
  setRoutineIssues,
}: {
  day: boolean;
  icon: React.ReactNode;
  products: Set<RoutineProductType>;
  setProducts: React.Dispatch<SetStateAction<Set<RoutineProductType>>>;
  productInfo?: RoutineInfoType[];
  setProductInfo?: React.Dispatch<SetStateAction<RoutineInfoType[]>>;
  routineIssues: Record<string, BadComboType>;
  setRoutineIssues: React.Dispatch<
    SetStateAction<Record<string, BadComboType>>
  >;
}) {
  const { user, token } = useAuth();
  const { dayProductIds, nightProductIds } = useRoutine();

  const removeProduct = async (p: RoutineProductType) => {
    const productId = p.id;
    if (user) {
      try {
        const response: AxiosResponse = await createApi(token).delete(
          `api/users/products/delete/${user.id}/`,
          {
            data: { id: p.id, day },
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );

        if (response.status === 200) {
          removeFromProductIds(productId, day);
          setProducts((prev) => {
            prev.delete(p);
            return new Set(prev);
          });

          setProductInfo?.((prev: RoutineInfoType[]) => {
            if (prev) {
              const updatedInfo = prev.filter((info) => info.id !== productId);
              return updatedInfo;
            }
            return prev;
          });
        }
      } catch (error: any) {
        console.error(error);
      }
    } else {
      removeFromProductIds(productId, day);
      setProducts((prev) => {
        prev.delete(p);
        return new Set(prev);
      });

      setProductInfo?.((prev) => {
        if (prev) {
          const updatedInfo = prev.filter((info) => info.id !== productId);
          return updatedInfo;
        }
        return prev;
      });
    }
  };

  function removeFromProductIds(id: number, day: boolean) {
    if (day) {
      dayProductIds.delete(id);
    } else {
      nightProductIds.delete(id);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold">{day} Skincare Routine</h2>
      <div className="mt-2 flex items-center space-x-4">
        <div className="flex space-x-2">
          {icon}
          <span>Routine</span>
        </div>
        <SearchModal
          day={day}
          setRoutineProducts={setProducts}
          setProductInfo={setProductInfo}
          setRoutineIssues={setRoutineIssues}
        />
      </div>
      <RoutineAlert productInfo={productInfo} />
      <RoutineIssueAlert routineIssues={routineIssues} />
      <div
        className={`mt-8 ${products.size && "grid max-h-[350px] grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2"}`}
      >
        {!products.size ? (
          <EmptyRoutine
            icon={<PackageSearch />}
            title="No Products Yet"
            description="You haven't added any projects yet for this routine. Get started
          by adding your first product."
          />
        ) : (
          Array.from(products).map((p: RoutineProductType, index: number) => (
            <Product
              key={index}
              productName={p.name}
              image={p.image}
              tag={p.category}
              icon={<Trash2 />}
              onClick={() => removeProduct(p)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function InnerRoutineAlert({ text }: { text: string }) {
  return (
    <div className="mb-2 flex items-center justify-center text-red-700">
      <svg
        className="mr-2 h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="font-semibold">{text}</h3>
    </div>
  );
}

function RoutineAlert({ productInfo }: { productInfo?: RoutineInfoType[] }) {
  return (
    <>
      {productInfo && productInfo.length > 0 && (
        <div className="mt-4 w-full max-w-md rounded-lg border border-red-300 bg-red-50 p-4 text-center shadow">
          <InnerRoutineAlert text="Comedogenic or Personalized Ingredients found:" />
          <ul className="space-y-1 text-sm text-red-800">
            {productInfo.map((info: RoutineInfoType, idx: number) => (
              <li key={idx}>
                <span className="font-bold">{info.name}:</span>{" "}
                <span className="inline-block rounded bg-red-100 px-2 py-0.5 capitalize">
                  {info.comedogenic_ingredients.join(", ")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function RoutineIssueAlert({
  routineIssues,
}: {
  routineIssues?: Record<string, BadComboType>;
}) {
  if (!routineIssues || Object.keys(routineIssues).length === 0) return null;
  console.log(routineIssues);
  return (
    <div className="mt-4 w-full max-w-md rounded-lg border border-red-300 bg-red-50 p-4 text-center shadow">
      <InnerRoutineAlert text="Conflicting Ingredients Found:" />
      <ul className="space-y-1 text-sm text-red-800">
        {Object.values(routineIssues).map((issue: any, idx: number) => (
          <li key={idx}>
            <span>
              {issue.combination.map((obj: any) => (
                <div key={obj.identifier} className="mb-1">
                  <span className="font-bold capitalize">
                    {obj.combination.join(" + ")}{" "}
                  </span>
                  {"in "}
                  <span>{obj.productsInvolved.join(", ")} </span>
                </div>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Routine;
