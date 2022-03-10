import axios from "axios";
import { useState } from "react";

export interface MutationResult {
  ok: boolean;
}

interface UseMutation<T> {
  loading: boolean;
  data?: T;
  error?: T | any;
}

type UseMutationResult<T> = [(data: any) => void, UseMutation<T>];

export default function useMutation<T>(url: string): UseMutationResult<T> {
  const [state, setState] = useState<UseMutation<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  async function mutation(data: T) {
    setState((pre) => ({ ...pre, loading: true }));
    try {
      const response = await axios.post(url, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
      setState((prev) => ({ ...prev, data: response.data }));
    } catch (e) {
      e && setState((prev) => ({ ...prev, error: e }));
    } finally {
      setState((pre) => ({ ...pre, loading: false }));
    }
  }
  return [mutation, { ...state }];
}
