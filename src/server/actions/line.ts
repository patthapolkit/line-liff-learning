"use server";

export async function getLineUserID(accessToken: string): Promise<Response> {
  try {
    const verifyResponse = await fetch(
      `https://api.line.me/oauth2/v2.1/verify?access_token=${accessToken}`
    );
    if (!verifyResponse.ok) {
      return new Response(JSON.stringify({ error: "Verification failed" }), {
        status: verifyResponse.status,
      });
    }

    const profileResponse = await fetch("https://api.line.me/v2/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!profileResponse.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch profile" }),
        { status: profileResponse.status }
      );
    }

    const { userId } = (await profileResponse.json()) as { userId: string };
    // TODO: Save the user id to the database if it doesn't exist
    return new Response(JSON.stringify({ userId }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
