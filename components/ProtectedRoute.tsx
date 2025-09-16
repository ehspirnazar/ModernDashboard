"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token === null) {
      // if not logged in, redirect
      router.replace("/");
    }
  }, [token, router]);

  // while checking, you could return null or a loader
  if (token === null) {
    return null; 
  }

  return <>{children}</>;
}
