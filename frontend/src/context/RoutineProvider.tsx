/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { RoutineContext } from "./RoutineContext";
import { type RoutineProductType } from "../types/RoutineProductType";
import { useAuth } from "./AuthContext";
import { type AxiosResponse } from "axios";
import { createApi } from "../api";

function RoutineProvider({ children }: { children: React.ReactNode }) {
  const [dayProducts, setDayProducts] = useState<Set<RoutineProductType>>(
    new Set([]),
  );
  const [nightProducts, setNightProducts] = useState<Set<RoutineProductType>>(
    new Set([]),
  );
  const [hydrated, setHydrated] = useState<boolean>(false);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      if (user) {
        try {
          const response: AxiosResponse = await createApi(token).get(
            `api/users/products/${user.id}/`,
          );

          console.log(response);
          if (response.status === 200) {
            setDayProducts(new Set(response.data.dayProducts));
            setNightProducts(new Set(response.data.nightProducts));
          }
        } catch (error: any) {
          console.error(error);
        }
      } else {
        const dayProds = localStorage.getItem("dayProducts");
        const nightProds = localStorage.getItem("nightProducts");

        setDayProducts(dayProds ? new Set(JSON.parse(dayProds)) : new Set([]));
        setNightProducts(
          nightProds ? new Set(JSON.parse(nightProds)) : new Set([]),
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
  }, [dayProducts, nightProducts, hydrated, user]);

  return (
    <RoutineContext.Provider
      value={{ dayProducts, setDayProducts, nightProducts, setNightProducts }}
    >
      {children}
    </RoutineContext.Provider>
  );
}

export default RoutineProvider;
