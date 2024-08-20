export async function GET(req: Request): Promise<Response> {
    return new Response("Hello, world!", {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}