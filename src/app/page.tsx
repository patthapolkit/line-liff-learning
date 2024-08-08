"use client";

import { useLiff } from "@/contexts/line-liff-context";
import Image from "next/image";

const Home = () => {
  const { liff, profile, error }: any = useLiff();

  if (error) return <div>Error: {error.message}</div>;
  if (!liff) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome to LINE LIFF</h1>
      {profile && (
        <div>
          <p>Name: {profile.displayName}</p>
          <Image src={profile.pictureUrl} alt="Profile" />
        </div>
      )}
    </div>
  );
};

export default Home;
