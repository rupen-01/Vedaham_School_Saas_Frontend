import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

// Base API URL from env
const BaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BaseUrl,
});

// 🔹 Helper to build headers
const getHeader = ({ requireAuth = true, multiPart = false }) => {
  const token = Cookies.get("authToken") || null;

  if (requireAuth && !token) {
    // Pop("error", "Please log in again.");
    throw new Error("Please log in");
  }

  const headers = {};
  if (requireAuth) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (!multiPart) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

/* ===========================================================
   🔹 Hook for GET requests (useQuery)
   =========================================================== */
export const useGetApi = ({ key, url, requireAuth = true, options = {}, params = {} }) => {
  return useQuery({
      queryKey: [key, params, requireAuth], // cache also depends on params
      queryFn: async () => {
        try {
          const res = await api.get(url, {
            headers: getHeader({ requireAuth }),
            params,
          });
          return res.data;
        } catch (error) {
          console.error(`API Error for ${key}:`, error);
          throw error;
        }
      },
      enabled: true, // Enable query by default
      ...options,
    });
};

/* ===========================================================
   🔹 Hook for Mutations (POST, PATCH, DELETE)
   =========================================================== */
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
        let requestedUrl = id ? `${url}/${id}` : url;

          
        switch (method) {
          case "POST":
            return (await api.post(requestedUrl, payload, { headers: getHeader({ requireAuth, multiPart }) })).data;
          case "PATCH":
            return (await api.patch(requestedUrl, payload, { headers: getHeader({ requireAuth, multiPart }) })).data;
          case "DELETE":
            return (await api.delete(requestedUrl, { headers: getHeader({ requireAuth, multiPart }) })).data;
          default:
            throw new Error("Invalid HTTP method");
        }
      } catch (error) {
        console.error(`Mutation Error for ${key}:`, error);
        throw error;
      }
    },
    onSuccess: (data, variables, context) => {
      // Invalidate specific queries based on the key
      queryClient.invalidateQueries({
        queryKey: variables?.params ? [key, variables.params] : [key],
      });
      
      // Call custom onSuccess if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      console.error(`Mutation Error for ${key}:`, error);
      
      // Call custom onError if provided
      if (options.onError) {
        options.onError(error, variables, context);
      }
    },
  });
};
