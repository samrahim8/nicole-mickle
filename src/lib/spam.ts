// Lightweight, dependency-free spam filtering for /api/lead.
//
// Layers: (1) honeypot field humans never see, (2) a render-time stamp so
// instant submissions are rejected, (3) link-stuffing check, (4) per-IP rate
// limit. A rejected submission gets a normal success response so bots don't
// learn what tripped them. The rate limit is in-memory per serverless instance,
// so it is best-effort rather than a hard guarantee.

const MIN_FILL_MS = 3000;
const MAX_AGE_MS = 1000 * 60 * 60 * 6;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_LINKS = 2;

const hits = new Map<string, number[]>();

export type SpamVerdict = { spam: false } | { spam: true; reason: string };

export function checkLeadSpam(
  payload: Record<string, unknown>,
  ip: string,
  now = Date.now(),
): SpamVerdict {
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return { spam: true, reason: "honeypot" };
  }

  const stamp = Number(payload._t);
  if (!Number.isFinite(stamp)) return { spam: true, reason: "missing-stamp" };
  const age = now - stamp;
  if (age < MIN_FILL_MS) return { spam: true, reason: "too-fast" };
  if (age > MAX_AGE_MS) return { spam: true, reason: "stale-stamp" };

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { spam: true, reason: "bad-email" };
  }

  const text = ["message", "firstName", "lastName"]
    .map((k) => (typeof payload[k] === "string" ? (payload[k] as string) : ""))
    .join(" ");
  const links = text.match(/https?:\/\/|www\./gi)?.length ?? 0;
  if (links > MAX_LINKS) return { spam: true, reason: "links" };

  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return { spam: true, reason: "rate-limit" };
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return { spam: false };
}
