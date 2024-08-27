import { useLiff } from "@/contexts/line-liff-context";
import { getLineUserID } from "@/server/actions/line";

export default async function Page(): Promise<JSX.Element> {
  const { liff, error: _error } = useLiff();
  let userId;

  const getAccessToken = async (): Promise<void> => {
    if (liff?.isLoggedIn) {
      const accessToken = liff.getAccessToken();
      if (accessToken) {
        const res = await getLineUserID(accessToken);
        if (res.ok) {
          const { userId: _userId } = await res.json();
          userId = _userId;
          console.log(userId);
        }
      }
    }
  };

  await getAccessToken();

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
