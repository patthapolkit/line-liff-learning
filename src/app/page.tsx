"use client";

import { useLiff } from "@/contexts/line-liff-context";
import { getLineUserId } from "@/server/actions/line";
import { useEffect, useState } from "react";

export default function Page(): JSX.Element {
  const { liff, error } = useLiff();
  const [userId, setUserId] = useState<string>("");

  const getAccessToken = async (): Promise<void> => {
    if (liff?.isLoggedIn) {
      const accessToken = liff.getAccessToken();
      if (accessToken) {
        const res = await getLineUserId(accessToken);
        if (res.ok) {
          const { userId: _userId } = (await res.json()) as { userId: string };
          setUserId(_userId);
          console.log(userId);
        }
      }
    }
  };

  useEffect(() => {
    if (!error && liff) {
      getAccessToken();
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
