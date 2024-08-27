"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { Liff } from "@line/liff";
import { liff } from "@line/liff";

interface LiffContextType {
  liff: Liff | null;
  error: unknown;
}

export const LiffContext = createContext<LiffContextType | null>(null);

export function useLiff(): LiffContextType {
  const context = useContext(LiffContext);

  if (!context) {
    throw new Error("useLiff must be used within a LiffProvider");
  }

  return context;
}

export function LiffProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<unknown>(null);

  useEffect(() => {
    liff
      .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
      .then(() => {
        setLiffObject(liff);
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          console.log("logged in");
        } else {
          console.log("not logged in");
          liff.login();
        }
      })
      .catch((error) => {
        setLiffError(error);
      });
  }, []);

  return (
    <LiffContext.Provider value={{ liff: liffObject, error: liffError }}>
      {children}
    </LiffContext.Provider>
  );
}
