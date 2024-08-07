"use client";

import { createContext, useContext, useState, useEffect } from "react";
import liff, { Liff } from "@line/liff";

const LIFFContext = createContext<{
  liff: Liff | null;
  profile: any;
  error: Error | null;
} | null>(null);

export const useLIFF = () => useContext(LIFFContext);

export const LIFFProvider = ({ children }: { children: React.ReactNode }) => {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        if (!process.env.LIFF_ID) {
          throw new Error("LIFF_ID is not defined");
        }

        await liff.init({ liffId: process.env.LIFF_ID! as string });
        setLiffObject(liff);
        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          setProfile(profile);
        } else {
          liff.login();
        }
      } catch (err) {
        if (err instanceof Error) setError(err);
      }
    };
    initializeLiff();
  }, []);

  return (
    <LIFFContext.Provider value={{ liff: liffObject, profile, error }}>
      {children}
    </LIFFContext.Provider>
  );
};
