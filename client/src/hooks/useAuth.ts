import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

async function fetchUserWithJWT(): Promise<User | null> {
  const token = localStorage.getItem("jwt");
  if (!token) return null;
  const res = await fetch("/api/auth/user", {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "same-origin",
  });
  if (!res.ok) return null;
  return res.json();
}

export function useAuth() {
  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    queryFn: fetchUserWithJWT,
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
  };
}