export async function POST(req: Request): Promise<Response> {
    const { test } = await req.json() as { test: string };
    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: 'Hello, world!',
        }),
    });
    return new Response(JSON.stringify(test), { status: 204 });
}
