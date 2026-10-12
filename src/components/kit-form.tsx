"use client";

import { useEffect, useRef } from "react";

const KIT_HOST = /(^|\.)(kit\.com|ck\.page|convertkit\.com)$/i;

/** Pull the script src and data-uid out of the pasted Kit embed snippet. */
export function parseKitEmbed(code: string): { src: string; uid?: string } | null {
  const src = code.match(/src=["'](https:\/\/[^"']+)["']/i)?.[1];
  if (!src) return null;
  try {
    if (!KIT_HOST.test(new URL(src).hostname)) return null;
  } catch {
    return null;
  }
  return { src, uid: code.match(/data-uid=["']([^"']+)["']/i)?.[1] };
}

// Kit's embed script inserts the form where the <script> tag sits, so the
// script is appended inside this container rather than into <head>.
export function KitForm({ embedCode }: { embedCode: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const parsed = parseKitEmbed(embedCode);
  const src = parsed?.src;
  const uid = parsed?.uid;

  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    if (uid) script.setAttribute("data-uid", uid);
    el.appendChild(script);
    return () => {
      el.innerHTML = "";
    };
  }, [src, uid]);

  if (!parsed) return null;
  return <div ref={ref} className="my-12 mx-auto max-w-xl" />;
}
