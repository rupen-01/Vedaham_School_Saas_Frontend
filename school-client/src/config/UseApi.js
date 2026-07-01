
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

// ===========================================================
// 🔹 Base API URL from .env
// ===========================================================
const BaseUrl = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

// 🔹 Axios instance
const api = axios.create({
  baseURL: BaseUrl,
});

// ===========================================================
// 🔹 Helper: Normalize Error Message
// ===========================================================
const formatError = (error) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error.message ||
    "Unknown error occurred"
  );
};

// ===========================================================
// 🔹 Helper: Build Headers
// ===========================================================
const getHeader = ({ requireAuth = true, multiPart = false }) => {
  const token = Cookies.get("accessToken");

  if (requireAuth && !token) {
    throw new Error("Please log in again.");
  }

  return {
    ...(requireAuth && { Authorization: `Bearer ${token}` }),
    ...(multiPart ? {} : { "Content-Type": "application/json" }),
  };
};

// ===========================================================
// 🔹 Hook for GET (useQuery)
// ===========================================================
export const useGetApi = ({
  key,
  url,
  requireAuth = true,
  options = {},
  params = {},
}) => {
  return useQuery({
    queryKey: [key, params],
    queryFn: async () => {
      try {
        if (typeof url !== "string") {
          throw new Error(`❌ Invalid URL provided for query [${key}]. Got: ${typeof url}`);
        }

        const res = await api.get(url, {
          headers: getHeader({ requireAuth }),
          params,
        });
        return res.data;
      } catch (error) {
        const message = formatError(error);
        console.error(`❌ API Error [${key}] →`, message);
        throw new Error(message);
      }
    },
    enabled: true,
    ...options,
  });
};

// ===========================================================
// 🔹 Hook for Mutations (POST, PUT, PATCH, DELETE)
// ===========================================================
export const useMutationApi = ({
  key,
  url,
  method = "POST",
  requireAuth = true,
  multiPart = false,
  options = {},
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [key],
    mutationFn: async ({ id = null, payload = {}, params = {} } = {}) => {
      try {
        if (typeof url !== "string") {
          throw new Error(`❌ Invalid URL provided for mutation [${key}]. Got: ${typeof url}`);
        }

        // ✅ remove trailing slash before appending ID
        let requestedUrl = id ? `${url.replace(/\/$/, "")}/${id}` : url;

        const config = {
          headers: getHeader({ requireAuth, multiPart }),
          params,
        };

        switch (method.toUpperCase()) {
          case "POST":
            return (await api.post(requestedUrl, payload, config)).data;
          case "PUT":
            return (await api.put(requestedUrl, payload, config)).data;
          case "PATCH":
            return (await api.patch(requestedUrl, payload, config)).data;
          case "DELETE":
            return (await api.delete(requestedUrl, config)).data;
          default:
            throw new Error(`Invalid HTTP method: ${method}`);
        }
      } catch (error) {
        const message = formatError(error);
        console.error(`❌ Mutation Error [${key}] →`, message);
        throw new Error(message);
      }
    },
    onSuccess: (data, variables, context) => {
      // ✅ Invalidate all queries for this key
      queryClient.invalidateQueries({ queryKey: [key], exact: false });
      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error(`⚠️ Mutation Failed [${key}] →`, error.message);
      options.onError?.(error, variables, context);
    },
  });
};
const mutationFn = async (data) => {
  if (method === "DELETE") {
    return axios.delete(url, {
      data, // ✅ send { id: ... } in body
      headers: requireAuth ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  if (method === "PUT" || method === "PATCH") {
    return axios[method.toLowerCase()](`${url}/${data.id}`, data, {
      headers: requireAuth ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  if (method === "POST") {
    return axios.post(url, data, {
      headers: requireAuth ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  return axios({ method, url, data });
};
