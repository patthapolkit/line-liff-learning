"use client";

import { useEffect, useState } from "react";
import { useLiff } from "@/contexts/line-liff-context";

export default function Page(): JSX.Element {
  const { liff, error } = useLiff();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const getAccessToken = async (): Promise<void> => {
    if (liff?.isLoggedIn()) {
      const accessToken = liff.getAccessToken();
      if (accessToken) {
        // await fetch("/api/line", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ accessToken }),
        // });
        setAccessToken(accessToken);
      }
    }
  };

  useEffect(() => {
    console.log("liff", liff);
    getAccessToken();
  }, []);

  return (
    <main>
      <div>
        <p className="bg-neutral-500 text-3xl">esc website</p>
        <button>test</button>
        {accessToken && <p>{accessToken}</p>}
      </div>
    </main>
  );
}
