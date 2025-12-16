/* eslint-disable @typescript-eslint/no-explicit-any */
import SubmittedProducts from "../components/dashboard/SubmittedProducts";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { createApi } from "../api";
import type { AxiosResponse } from "axios";
import DashboardAlert from "../components/dashboard/DashboardAlert";

type ProductSubmission = {
  id: number;
  name: string;
  brand: string;
  created_by: string;
  raw_ingredients: string[];
};

function Dashboard() {
  const { token } = useAuth();
  const [submitted, setSubmitted] = useState<any[] | null | undefined>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const deleteProduct = async (id: number) => {
    try {
      const response: AxiosResponse = await createApi(token).delete(
        `api/products/dashboard/delete/${id}/`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      console.log(response);

      if (response.status === 200) {
        const updatedProducts = submitted?.filter((item) => item.id !== id);
        setSubmitted(updatedProducts);
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 2500);
      }
    } catch (error: any) {
      console.error(error);
      setShowAlert(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: AxiosResponse = await createApi(token).get(
          "api/products/dashboard/",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          },
        );

        if (response.status === 200) {
          setSubmitted(response.data.submissions);
        }
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [token]);
  return (
    <section className="h-screen">
      <div className="mt-20 flex flex-col items-center gap-8">
        {showAlert && (
          <div className="fixed top-20 flex items-center justify-center">
            <DashboardAlert />
          </div>
        )}
        <h1 className="inline-block text-4xl font-semibold">
          Submitted Products
        </h1>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4">
          {submitted &&
            submitted?.map((prod: ProductSubmission) => (
              <SubmittedProducts
                key={prod.id}
                title={prod.name}
                brand={prod.brand}
                username={prod.created_by}
                ingredients={prod.raw_ingredients}
                onClick={() => deleteProduct(prod.id)}
              />
            ))}
        </div>
        {submitted?.length === 0 ? (
          <h2 className="inline-block text-xl">
            No products sent at this time.
          </h2>
        ) : null}
      </div>
    </section>
  );
}

export default Dashboard;
