/* eslint-disable @typescript-eslint/no-explicit-any */
import SubmittedProducts from "../components/dashboard/SubmittedProducts";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { createApi } from "../api";
import type { AxiosResponse } from "axios";

function Dashboard() {
  const { token } = useAuth();
  const [submitted, setSubmitted] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: AxiosResponse = await createApi(token).get(
          "ingredients/dashboard",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          },
        );

        console.log(response);
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
    <section>
      <h1>Submitted Products</h1>
      <div></div>
    </section>
  );
}

export default Dashboard;
