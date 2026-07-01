import { useState } from "react";
import axios from "axios";

// HOW TO USE ------------------------------------------------------------

// import useApiRequest from "../hooks/useApiRequest";

// const { loading, error, response, request } = useApiRequest();

// useEffect(() => {
//   request({ method: "GET", url: ApiConfig.GET_ALL_BLOGS });
// }, []);

export default function useApiRequest() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");

  const request = async (
    method = "GET",
    url,
    data = null,
    params = null,
    config = {}
  ) => {
    try {
      setLoading(true);
      const response = await axios({ method, url, data, params, ...config });
      setData(response.data);
      setLoading(false);
      setError(null);
      setStatus("success");
      return response.data;
    } catch (error) {
      setError(error);
      setLoading(false);
      setStatus("error");
    }
  };

  return { data, loading, error, status, request };
}
