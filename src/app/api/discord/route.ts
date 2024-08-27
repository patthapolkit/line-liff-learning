const env = {
  DISCORD_BOT_FORM_TEST_URL: process.env["WEB_APP_DISCORD_BOT_FORM_TEST_URL"],
};

export async function POST(req: Request): Promise<Response> {
  const { data } = await req.json();
  const discordChannel = req.headers.get("Discord-Channel");

  console.log("discordChannel", discordChannel);

  if (!discordChannel) {
    return new Response(
      JSON.stringify({ error: "Discord channel not provided" }),
      { status: 400 }
    );
  }

  const discordChannelEnv = `DISCORD_${discordChannel
    .toUpperCase()
    .replace(/-/g, "_")}_URL` as keyof typeof env;

  if (!env[discordChannelEnv]) {
    return new Response(JSON.stringify({ error: "Invalid discord channel" }), {
      status: 400,
    });
  }

  const message = `${data.rows[0].Name} has submitted a new form!`;

  const response = await fetch(env[discordChannelEnv], {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: message,
    }),
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Failed to send message" }), {
      status: response.status,
    });
  }

  return new Response(null, { status: 204 });
}
