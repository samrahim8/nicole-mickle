import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook target. Any publish, edit or delete in the Studio refreshes
 * every cached page at once, so pages can keep a long (daily) revalidate
 * window without edits waiting a day to show up.
 *
 * The webhook is signed with SANITY_REVALIDATE_SECRET (set in Vercel and in
 * the Sanity webhook settings); unsigned or wrongly signed calls are refused.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ error: "not configured" }, { status: 500 });
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret);
    if (!isValidSignature) return NextResponse.json({ error: "invalid signature" }, { status: 401 });
    revalidatePath("/", "layout");
    return NextResponse.json({ revalidated: true, type: body?._type ?? null, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
