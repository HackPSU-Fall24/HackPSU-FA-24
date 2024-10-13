"use client";

import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Signup from "./SignUp";
import Login from "./Login";

export default function AppLayout() {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      {router.pathname === "/signup" ? (
        <Signup key="signup" />
      ) : (
        <Login key="login" />
      )}
    </AnimatePresence>
  );
}
