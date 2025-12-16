/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { RoutineContext } from "./RoutineContext";
import { type RoutineProductType } from "../types/RoutineProductType";
import { useAuth } from "./AuthContext";
import { type AxiosResponse } from "axios";
import { createApi } from "../api";
import { type RoutineInfoType } from "../types/RoutineInfoType";

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
  const [dayProductInfo, setDayProductInfo] = useState<
    RoutineInfoType[] | undefined
  >(undefined);
  const [nightProductInfo, setNightProductInfo] = useState<
    RoutineInfoType[] | undefined
  >(undefined);
  const { user, token } = useAuth();

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
          }
        } catch (error: any) {
          console.error(error);
        }
      } else {
        const dayProds = localStorage.getItem("dayProducts");
        const nightProds = localStorage.getItem("nightProducts");
        const dayIds = localStorage.getItem("dayProductIds");
        const nightIds = localStorage.getItem("nightProductIds");

        setDayProducts(dayProds ? new Set(JSON.parse(dayProds)) : new Set([]));
        setNightProducts(
          nightProds ? new Set(JSON.parse(nightProds)) : new Set([]),
        );
        setDayProductIds(dayIds ? new Set(JSON.parse(dayIds)) : new Set([]));
        setNightProductIds(
          nightIds ? new Set(JSON.parse(nightIds)) : new Set([]),
        );
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
  }, [
    dayProducts,
    nightProducts,
    hydrated,
    user,
    dayProductIds,
    nightProductIds,
  ]);

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
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
}

export default RoutineProvider;
