export const runtime = "nodejs";

export async function POST(request: Request) {
  const url = process.env.SHEETS_URL;
  if (!url) {
    return Response.json(
      { ok: false, error: "Lead receiver not configured" },
      { status: 500 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    if (!res.ok) {
      return Response.json(
        { ok: false, error: `Upstream returned ${res.status}` },
        { status: 502 }
      );
    }

    const body = await res.json().catch(() => null);
    if (!body || body.ok !== true) {
      return Response.json(
        { ok: false, error: body?.error || "Upstream rejected submission" },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "Network error" },
      { status: 502 }
    );
  }
}
