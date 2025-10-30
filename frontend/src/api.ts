import axios from "axios";

export function createApi(token: string | null) {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: unknown) => {
      return Promise.reject(error);
    },
  );
  return api;
}
