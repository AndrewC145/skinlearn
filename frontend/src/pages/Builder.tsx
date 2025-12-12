/* eslint-disable @typescript-eslint/no-explicit-any */
import RoutineTitle from "../components/RoutineTitle";
import Routine from "../components/Routine";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { type RoutineProductType } from "../types/RoutineProductType";
import type { AxiosResponse } from "axios";
import { createApi } from "../api";
import { useAuth } from "../context/AuthContext";

function Builder() {
  const [dayProducts, setDayProducts] = useState<Set<RoutineProductType>>(
    new Set([]),
  );
  const [nightProducts, setNightProducts] = useState<Set<RoutineProductType>>(
    new Set([]),
  );
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      if (user) {
        try {
          const response: AxiosResponse = await createApi(token).get(
            `api/users/products/${user.id}/`,
          );

          console.log(response);
        } catch (error: any) {
          console.error(error);
        }
      } else {
        const dayProds = localStorage.getItem("day_products");
        const nightProds = localStorage.getItem("night_products");

        if (dayProds === null) {
          setDayProducts(new Set([]));
        } else {
          setDayProducts(JSON.parse(dayProds));
        }
      }
    };

    fetchProducts();
  }, [token, user]);

  return (
    <section className="flex min-h-screen items-center justify-center py-8">
      <div className="flex flex-col gap-20">
        <RoutineTitle />
        <div className="flex justify-between gap-8 px-8">
          <Routine
            day={true}
            products={dayProducts}
            setProducts={setDayProducts}
            icon={<Sun />}
          />
          <Routine
            day={false}
            products={nightProducts}
            setProducts={setNightProducts}
            icon={<Moon />}
          />
        </div>
      </div>
    </section>
  );
}

export default Builder;
