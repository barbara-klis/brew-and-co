"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ReserveButton } from "@/components/reservation-provider";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const sheetRef = useRef<HTMLDialogElement>(null);

  return (
    <header className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-4 md:px-8 xl:px-12">
      <Link href="/" className="font-marker text-3xl">
        Brew &amp; Co
      </Link>

      <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
            className="underline-offset-8 hover:underline aria-[current=page]:underline"
          >
            {label}
          </Link>
        ))}
        <ReserveButton />
      </nav>

      <button
        type="button"
        onClick={() => sheetRef.current?.showModal()}
        className="inline-flex h-11 items-center rounded-pill border border-line px-5 font-display font-medium md:hidden"
      >
        Menu
      </button>

      <dialog
        ref={sheetRef}
        aria-label="Site navigation"
        className="m-0 h-full max-h-none w-full max-w-none bg-surface p-6 text-foreground backdrop:bg-transparent"
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => sheetRef.current?.close()}
            className="inline-flex h-11 items-center rounded-pill border border-line px-5 font-display font-medium"
          >
            Close
          </button>
        </div>
        <nav aria-label="Mobile" className="mt-12 flex flex-col items-start gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => sheetRef.current?.close()}
              aria-current={pathname === href ? "page" : undefined}
              className="font-display text-h2 font-semibold tracking-[-0.02em] aria-[current=page]:text-accent-text"
            >
              {label}
            </Link>
          ))}
          <ReserveButton size="lg" onClick={() => sheetRef.current?.close()} />
        </nav>
      </dialog>
    </header>
  );
}
