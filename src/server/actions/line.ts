"use server";

import type { ServerActionResponse } from "@/types/server";

export async function getLineUserId(
  accessToken: string
): Promise<ServerActionResponse<string | null>> {
  try {
    const verifyResponse = await fetch(
      `https://api.line.me/oauth2/v2.1/verify?access_token=${accessToken}`
    );

    if (!verifyResponse.ok) {
      return {
        data: null,
        error: "Failed to verify access token",
      };
    }

    const profileResponse = await fetch("https://api.line.me/v2/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!profileResponse.ok) {
      return {
        data: null,
        error: "Failed to fetch LINE user profile",
      };
    }

    const { userId: _userId } = (await profileResponse.json()) as {
      userId: string;
    };

    // TODO: Save the user id to the database if it doesn't exist

    return {
      data: _userId,
      message: "Successfully retrieved LINE user ID",
    };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error
          ? "An unexpected error occurred. Please try again later."
          : "Internal Server Error",
    };
  }
}
