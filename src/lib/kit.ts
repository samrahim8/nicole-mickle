// Kit (ConvertKit) integration for website leads.
//
// Subscribes contact + quiz leads into Nicole's existing Kit nurture sequences so
// the website feeds her email funnels automatically. This runs as an isolated step
// AFTER lead capture (Sheet write + notification email) so a Kit failure can never
// block a lead or surface an error to the visitor — see src/app/api/lead/route.ts.
//
// Subscribing to a sequence (or a tag) also creates/updates the subscriber, so there
// is no separate "add subscriber" call. Kit dedupes by email, so enrolling one person
// in several sequences/tags is safe and expected (e.g. a multi-interest contact lead).

const KIT_API = "https://api.convertkit.com/v3";

// Quiz persona (top-matched neighborhood name) -> "Neighborhood Quiz - X" sequence id.
// Clermont+Minneola share one sequence; Sanford+Lake Mary share one. The four areas
// with no dedicated sequence (Ocoee, Oakland, Groveland, Apopka) fall back to the
// general "RE - Orlando Real Estate" sequence, per Nicole's direction.
const RE_ORLANDO_SEQUENCE = 1828056; // RE - Orlando Real Estate (also the unknown-persona fallback)

const QUIZ_SEQUENCE_BY_NEIGHBORHOOD: Record<string, number> = {
  "Winter Park": 2470215,
  "Lake Nona": 2470208,
  "Windermere": 2470312,
  "Dr. Phillips": 2470245,
  "Celebration": 2469053,
  "Baldwin Park": 2470257,
  "Horizon West": 2470231,
  "Winter Garden": 2470218, // Kit: "Historic Winter Garden"
  "Clermont": 2470237, // Kit: "Clermont and Minneola"
  "Minneola": 2470237,
  "Montverde": 2470324,
  "Sanford": 2470291, // Kit: "Sanford or Lake Mary"
  "Lake Mary": 2470291,
  "Ocoee": RE_ORLANDO_SEQUENCE,
  "Oakland": RE_ORLANDO_SEQUENCE,
  "Groveland": RE_ORLANDO_SEQUENCE,
  "Apopka": RE_ORLANDO_SEQUENCE,
};

// Contact "I'm interested in" option -> sequence + tag.
// Values mirror src/lib/contact-fallback.ts `interestOptions` exactly.
const CONTACT_MAP: Record<string, { sequence?: number; tag?: number }> = {
  "Relocating to Orlando": { sequence: 1866864, tag: 4361327 }, // RE - Relocation / tag Relocating
  "New Construction": { sequence: 1951063, tag: 4361330 }, // RE - New Construction / tag New Construction
  "Selling a Home": { sequence: 1950496, tag: 4361325 }, // RE - Staging Tips / tag Selling
  "Buying a Home": { tag: 4361326 }, // tag Buying (no dedicated sequence)
  "Something Else": { sequence: RE_ORLANDO_SEQUENCE }, // general Orlando Real Estate sequence
};

type LeadPayload = Record<string, unknown>;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

async function kitPost(
  path: string,
  apiKey: string,
  body: Record<string, unknown>
): Promise<void> {
  const res = await fetch(`${KIT_API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: apiKey, ...body }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Kit ${path} -> ${res.status} ${detail}`.trim());
  }
}

// Resolve the set of sequences + tags a lead should be enrolled in.
function resolveTargets(lead: LeadPayload): { sequences: number[]; tags: number[] } {
  const sequences = new Set<number>();
  const tags = new Set<number>();

  if (lead.formType === "Quiz") {
    const persona = str(lead.persona);
    // Unknown/empty persona still gets the general sequence so no lead is dropped.
    sequences.add(QUIZ_SEQUENCE_BY_NEIGHBORHOOD[persona] ?? RE_ORLANDO_SEQUENCE);
  } else if (lead.formType === "Contact") {
    // interest is a ", "-joined string of one or more selected options.
    const interests = str(lead.interest)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const interest of interests) {
      const entry = CONTACT_MAP[interest];
      if (!entry) continue;
      if (entry.sequence) sequences.add(entry.sequence);
      if (entry.tag) tags.add(entry.tag);
    }
  }

  return { sequences: [...sequences], tags: [...tags] };
}

// Fire-and-forget from the caller's perspective: this resolves true on success and
// false on any failure, and never throws. The route awaits it (so the serverless
// function isn't frozen mid-request) but ignores the result for the visitor response.
export async function subscribeLeadToKit(lead: LeadPayload): Promise<boolean> {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) return false; // Kit not configured — silently skip.

  const email = str(lead.email);
  if (!email) return false;

  const firstName = str(lead.firstName) || undefined;
  const { sequences, tags } = resolveTargets(lead);
  if (sequences.length === 0 && tags.length === 0) return false;

  const calls: Promise<void>[] = [
    ...sequences.map((id) =>
      kitPost(`/sequences/${id}/subscribe`, apiKey, {
        email,
        first_name: firstName,
      })
    ),
    ...tags.map((id) =>
      kitPost(`/tags/${id}/subscribe`, apiKey, { email, first_name: firstName })
    ),
  ];

  const results = await Promise.allSettled(calls);
  const failures = results.filter((r) => r.status === "rejected");
  if (failures.length > 0) {
    for (const f of failures) {
      console.error("Kit subscribe failed:", (f as PromiseRejectedResult).reason);
    }
    return false;
  }
  return true;
}
