"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { PageTransition } from "./page-transition";

// Hides site Navbar/Footer/PageTransition when rendering Sanity Studio
// so Studio can own the full viewport.
export function SiteChrome({
  navbar,
  footer,
  children,
}: {
  navbar: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      {footer}
    </>
  );
}
