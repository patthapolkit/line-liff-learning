"use client";

import { useLIFF } from "@/contexts/line-liff-context";

const Home = () => {
  const { liff, profile, error }: any = useLIFF();

  if (error) return <div>Error: {error.message}</div>;
  if (!liff) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome to LINE LIFF</h1>
      {profile && (
        <div>
          <p>Name: {profile.displayName}</p>
          <img src={profile.pictureUrl} alt="Profile" />
        </div>
      )}
    </div>
  );
};

export default Home;
