"use client";

import { useLiff } from "@/contexts/line-liff-context";
import { getLineUserId } from "@/server/actions/line";
import { useEffect, useState } from "react";

export default function Page(): JSX.Element {
  const { liff, error } = useLiff();
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (!error && liff) {
      const handleLiff = async (): Promise<void> => {
        if (liff.isLoggedIn()) {
          const accessToken = liff.getAccessToken();
          if (accessToken) {
            const res = await getLineUserId(accessToken);
            setUserId(res);
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
