"use client";

import Dashboard from "./Dashboard";
import { useAuth } from "./contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // If the user is not logged in, redirect to the login page
      router.push("/login");
    }
  }, [loading, user, router]);

  // If loading, you can display a loading spinner or some placeholder content
  if (loading) return <div>Loading...</div>;

  // Render the Dashboard component if the user is logged in
  return user ? <Dashboard /> : null;
}
