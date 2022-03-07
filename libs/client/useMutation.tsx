import axios from "axios";
import { useState } from "react";

interface UseMutation {
  loading: boolean;
  data?: undefined | any;
  error?: undefined | any;
}

type UseMutationResult = [(data: any) => void, UseMutation];

export default function useMutation(url: string): UseMutationResult {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);

  async function mutation(data: any) {
    setLoading(true);
    try {
      const response = await axios.post(url, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  return [mutation, { loading, data, error }];
}

/* fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then(setData)
  .catch(setError)
  .finally(() => setLoading(false)); */
