"use client";

import { useLiff } from "@/contexts/line-liff-context";
import { getLineUserId } from "@/server/actions/line";
import { useEffect, useState } from "react";
import type { Liff } from "@line/liff";

export default function Page(): JSX.Element {
  const { liff, error } = useLiff();
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (!error && liff) {
      const handleLiff = async (): Promise<void> => {
        if (liff.isLoggedIn()) {
          const accessToken = liff.getAccessToken();
          setUserId("loading...");
          if (accessToken) {
            const res = await getLineUserId(accessToken);
            if (res.ok) {
              const { userId } = await res.json();
              setUserId(userId);
            }
          }
        } else {
          setUserId("not logged in");
        }
      };
      handleLiff();
    }
  }, [liff, error]);

  return (
    <main>
      <div>
        <p className="bg-neutral-500 text-3xl">esc website</p>
        <button>test</button>
        <p>{userId}</p>
      </div>
    </main>
  );
}
