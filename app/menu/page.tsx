import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { formatPrice, getMenuByCategory } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu | Brew & Co",
  description: "Espresso drinks, cold drinks, pastries and sandwiches at Brew & Co in Brooklyn.",
};

export default function MenuPage() {
  const categories = getMenuByCategory();

  return (
    <>
      <Section className="pb-0 lg:pb-0">
        <h1 className="max-w-[14ch] font-display text-h1 font-semibold tracking-[-0.03em]">Menu</h1>
        <p className="mt-6 max-w-prose text-lead text-muted">
          Coffee roasted for us in small batches. Pastries baked each morning. Lunch made to order.
        </p>
      </Section>

      <nav
        aria-label="Menu categories"
        className="sticky top-0 z-20 bg-background/95 backdrop-blur"
      >
        <ul className="mx-auto flex w-full max-w-6xl gap-3 overflow-x-auto px-4 py-4 md:px-8 xl:px-12">
          {categories.map(({ name, slug }) => (
            <li key={slug} className="shrink-0">
              <a
                href={`#${slug}`}
                className="inline-flex h-11 items-center rounded-pill border border-line bg-surface px-5 font-display font-medium hover:bg-accent hover:text-on-accent"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {categories.map(({ name, slug, items }, index) => (
        <Section
          key={slug}
          id={slug}
          aria-labelledby={`${slug}-title`}
          className="scroll-mt-20 py-12 lg:py-16"
        >
          <h2
            id={`${slug}-title`}
            className="mb-10 font-display text-h2 font-semibold tracking-[-0.02em]"
          >
            {name}
          </h2>
          <ul className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {items.map((item) => (
              <li key={item.name} className="flex gap-5">
                <div className="relative size-28 shrink-0 overflow-hidden rounded-control sm:size-32">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    priority={index === 0}
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-lead font-medium tracking-[-0.01em]">
                      {item.name}
                    </h3>
                    <span aria-hidden className="min-w-4 flex-1 border-b border-dotted border-muted" />
                    <p className="font-display text-lead font-medium tabular-nums">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="text-muted">{item.description}</p>
                  {item.badge && (
                    <div className="mt-1">
                      <Badge>{item.badge}</Badge>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ))}
    </>
  );
}
