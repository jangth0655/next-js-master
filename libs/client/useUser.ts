import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface User {
  ok: boolean;
  profile: {
    id: number;
    name: string;
    phone: null;
    email: string;
    avatar: null;
    createdAt: string;
    updatedAt: string;
  };
}

export default function UserUser() {
  const { data, error } = useSWR<User>("/api/users/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
