export async function POST(req: Request): Promise<Response> {
    const res = await fetch(process.env.DISCORD_WEBHOOK_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: 'Hello, world!1',
        }),
    });
    if (!res.ok) {
        throw new Error(`Failed to send message to Discord: ${res.statusText}`);
    }
    return new Response('OK');
}
