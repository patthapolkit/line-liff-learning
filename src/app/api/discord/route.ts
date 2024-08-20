export async function POST(req: Request): Promise<Response> {
    const body = await req.json();

    const message = body.data.rows[0].name + ' has submitted a new form!';

    const res = await fetch(process.env.DISCORD_WEBHOOK_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: message,
        }),
    });

    if (res.ok) {
        return new Response('Success');
    } else {
        return new Response('Failed to send message', { status: 500 });
    }
}
