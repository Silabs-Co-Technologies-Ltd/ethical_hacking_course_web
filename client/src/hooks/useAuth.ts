import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { useCallback } from "react";

export function useAuth() {
  const { data: user, isLoading: loading } = trpc.auth.me.useQuery();
  const logoutMutation = trpc.auth.logout.useMutation();

  const isAuthenticated = !!user;
  const error = null;

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
      // Redirect to home after logout
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }, [logoutMutation]);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    logout,
  };
}
