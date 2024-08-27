"use server";

export async function getLineUserId(accessToken: string): Promise<string> {
  try {
    console.log("start getLineUserId");
    const verifyResponse = await fetch(
      `https://api.line.me/oauth2/v2.1/verify?access_token=${accessToken}`
    );
    if (!verifyResponse.ok) {
      return "verifyResponse not ok";
    }

    const profileResponse = await fetch("https://api.line.me/v2/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!profileResponse.ok) {
      return "profileResponse not ok";
    }

    const { userId } = (await profileResponse.json()) as { userId: string };
    // TODO: Save the user id to the database if it doesn't exist
    return userId;
  } catch (error) {
    return "error";
  }
}
