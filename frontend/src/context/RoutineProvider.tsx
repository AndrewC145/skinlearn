/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type SetStateAction } from "react";
import { RoutineContext } from "./RoutineContext";
import { type RoutineProductType } from "../types/RoutineProductType";
import { useAuth } from "./AuthContext";
import { type AxiosResponse } from "axios";
import { createApi } from "../api";
import { type RoutineInfoType } from "../types/RoutineInfoType";
import { type BadComboType } from "../types/BadComboType";
import { usePersonalIngredients } from "./PersonalIngredientsContext";

function RoutineProvider({ children }: { children: React.ReactNode }) {
  const [dayProducts, setDayProducts] = useState<Set<RoutineProductType>>(
    new Set([]),
  );
  const [nightProducts, setNightProducts] = useState<Set<RoutineProductType>>(
    new Set([]),
  );
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [dayProductIds, setDayProductIds] = useState<Set<number>>(new Set([]));
  const [nightProductIds, setNightProductIds] = useState<Set<number>>(
    new Set([]),
  );
  const [dayProductInfo, setDayProductInfo] = useState<RoutineInfoType[]>([]);
  const [nightProductInfo, setNightProductInfo] = useState<RoutineInfoType[]>(
    [],
  );
  const [dayRoutineIssues, setDayRoutineIssues] = useState<BadComboType[]>([]);
  const [nightRoutineIssues, setNightRoutineIssues] = useState<BadComboType[]>(
    [],
  );
  const { user, token } = useAuth();
  const { personalIngredients } = usePersonalIngredients();

  useEffect(() => {
    const fetchProducts = async () => {
      if (user) {
        try {
          const response: AxiosResponse = await createApi(token).get(
            `api/users/products/${user.id}/`,
          );

          const dayProds: RoutineProductType[] = response.data.dayProducts;
          const nightProds: RoutineProductType[] = response.data.nightProducts;

          const dayIds = dayProds.map((p) => p.id);
          const nightIds = nightProds.map((p) => p.id);

          if (response.status === 200) {
            setDayProducts(new Set(dayProds));
            setNightProducts(new Set(nightProds));
            setDayProductIds(new Set(dayIds));
            setNightProductIds(new Set(nightIds));

            await Promise.all([
              analyzeRoutine(
                dayProds,
                true,
                setDayProductInfo,
                setDayRoutineIssues,
              ),
              analyzeRoutine(
                nightProds,
                false,
                setNightProductInfo,
                setNightRoutineIssues,
              ),
            ]);
          }
        } catch (error: any) {
          console.error(error);
        }
      } else {
        const dayProds = localStorage.getItem("dayProducts");
        const nightProds = localStorage.getItem("nightProducts");
        const dayIds = localStorage.getItem("dayProductIds");
        const nightIds = localStorage.getItem("nightProductIds");
        const dayInfo = localStorage.getItem("dayProductInfo");
        const nightInfo = localStorage.getItem("nightProductInfo");

        setDayProducts(dayProds ? new Set(JSON.parse(dayProds)) : new Set([]));
        setNightProducts(
          nightProds ? new Set(JSON.parse(nightProds)) : new Set([]),
        );
        setDayProductIds(dayIds ? new Set(JSON.parse(dayIds)) : new Set([]));
        setNightProductIds(
          nightIds ? new Set(JSON.parse(nightIds)) : new Set([]),
        );
        setDayProductInfo(dayInfo ? JSON.parse(dayInfo) : []);
        setNightProductInfo(nightInfo ? JSON.parse(nightInfo) : []);
      }
      setHydrated(true);
    };

    fetchProducts();
  }, [token, user]);

  useEffect(() => {
    if (!hydrated || user) return;

    localStorage.setItem("dayProducts", JSON.stringify([...dayProducts]));
    localStorage.setItem("nightProducts", JSON.stringify([...nightProducts]));
    localStorage.setItem("dayProductIds", JSON.stringify([...dayProductIds]));
    localStorage.setItem(
      "nightProductIds",
      JSON.stringify([...nightProductIds]),
    );
    localStorage.setItem("dayProductInfo", JSON.stringify(dayProductInfo));
    localStorage.setItem("nightProductInfo", JSON.stringify(nightProductInfo));
  }, [
    dayProducts,
    nightProducts,
    hydrated,
    user,
    dayProductIds,
    nightProductIds,
    dayProductInfo,
    nightProductInfo,
  ]);

  const analyzeRoutine = async (
    products: RoutineProductType[],
    day: boolean,
    setInfo: React.Dispatch<SetStateAction<RoutineInfoType[]>>,
    setIssues: React.Dispatch<SetStateAction<BadComboType[]>>,
  ) => {
    const infos: RoutineInfoType[] = [];
    const issues: BadComboType[] = [];
    await Promise.all(
      products.map(async (product: RoutineProductType) => {
        try {
          const response: AxiosResponse = await createApi(token).post(
            "api/products/save/",
            {
              product: product,
              day_routine: day,
              personalIngredients: personalIngredients,
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            },
          );

          console.log(response);

          if (response.status === 200) {
            const analysis = response.data.analysis;
            const routineIssues = response.data.routineIssues;
            if (analysis.comedogenic_ingredients.length > 0) {
              infos.push({
                id: product.id,
                name: product.name,
                comedogenic_ingredients: analysis.comedogenic_ingredients,
              });
            }

            if (routineIssues) {
              const badCombos = routineIssues.bad_combinations;
              const productsInvolved: string[] =
                routineIssues.products_involved;

              issues.push({
                combination: badCombos,
                productNames: productsInvolved,
                involved_ingredients: routineIssues.involved_ingredients,
              });
            }
          }
        } catch (error: any) {
          console.error(error);
        }
      }),
    );

    setInfo(infos);
    setIssues(issues);
  };

  return (
    <RoutineContext.Provider
      value={{
        dayProducts,
        setDayProducts,
        nightProducts,
        setNightProducts,
        setDayProductIds,
        setNightProductIds,
        dayProductIds,
        nightProductIds,
        dayProductInfo,
        setDayProductInfo,
        nightProductInfo,
        setNightProductInfo,
        dayRoutineIssues,
        nightRoutineIssues,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
}

export default RoutineProvider;
