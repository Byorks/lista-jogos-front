import axios, { AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos (boa práticas para UX)
});

// --- Interceptors (futuro-proof) ---
// Request: aqui você pode injetar token JWT quando tiver auth
api.interceptors.request.use((config) => {
  // Exemplo futuro: config.headers.Authorization = `Bearer ${token}`;
  console.log(`🚀 [API] ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Response: aqui você pode tratar erros globais
api.interceptors.response.use(
  (response) => {
    console.log(
      `✅ [API] ${response.config.method?.toUpperCase()} ${response.config.url}`,
    );
    return response;
  },
  (error: AxiosError) => {
    console.error(`❌ [API]`, error.response?.status, error.message);
    return Promise.reject(error);
  },
);

// Helper com generics (services vão utilizar)
export const apiClient = {
  get: async <T>(url: string, params?: Record<string, unknown>): Promise<T> => {
    const response = await api.get<T>(url, { params });
    return response.data;
  },

  post: async <T>(url: string, data?: unknown): Promise<T> => {
    const response = await api.post<T>(url, data);
    return response.data;
  },

  put: async <T>(url: string, data?: unknown): Promise<T> => {
    const response = await api.put<T>(url, data);
    return response.data;
  },

  patch: async <T>(url: string, data?: unknown): Promise<T> => {
    const response = await api.patch<T>(url, data);
    return response.data;
  },

  delete: async <T>(
    url: string,
    params?: Record<string, unknown>,
  ): Promise<T> => {
    const response = await api.delete<T>(url, { params });
    return response.data;
  },
};

// export default apiClient;
