import Image from "next/image";
import { Suspense } from "react";
import { connection } from "next/server";
import { EventCard } from "@/components/event-card";
import { ReserveButton } from "@/components/reservation-provider";
import { hours } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { ProductTile } from "@/components/ui/product-tile";
import { Section, SectionHeading } from "@/components/ui/section";
import { getUpcomingEvents } from "@/lib/events";
import { getPopularItems } from "@/lib/menu";

export default function Home() {
  const popular = getPopularItems();

  return (
    <>
      <div className="relative isolate flex min-h-[min(calc(100svh-4.5rem),56rem)] flex-col justify-end overflow-hidden">
        <Image
          src="/images/hero.webp"
          alt="Leather armchairs and wooden tables in a bright café with framed prints on a dark wall"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-ink/65" />

        <span
          aria-hidden
          className="pointer-events-none absolute -left-[0.06em] top-[6%] -z-5 select-none font-display text-mega font-semibold tracking-[-0.04em] whitespace-nowrap text-accent motion-safe:animate-[slide-in-left_var(--duration-slow)_var(--ease-pour)_both]"
        >
          brew&amp;co
        </span>

        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 pb-16 text-cup md:px-8 xl:px-12">
          <h1 className="max-w-[14ch] font-display text-h1 font-semibold tracking-[-0.03em]">
            Fresh-roasted. Ready when you are.
          </h1>
          <p className="max-w-prose text-lead">
            Specialty coffee, pastries baked each morning and light lunches, on a Brooklyn corner.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <ReserveButton size="lg" />
            <Button href="/menu" variant="quiet" size="lg" className="border-cup/60! text-cup! hover:bg-cup/15!">
              See the menu
            </Button>
          </div>
        </div>
      </div>

      <Section aria-labelledby="popular-title">
        <SectionHeading
          id="popular-title"
          title="What people order most"
          intro="The drinks and bakes that regulars come back for."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((item) => (
            <ProductTile key={item.name} item={item} />
          ))}
        </div>
        <div className="mt-12">
          <Button href="/menu" variant="secondary" size="lg">
            See the full menu
          </Button>
        </div>
      </Section>

      <Section aria-labelledby="events-title" className="pt-0 lg:pt-0">
        <SectionHeading
          id="events-title"
          title="Upcoming events"
          intro="Open mic every Friday evening. Coffee tasting every Saturday morning."
        />
        <Suspense fallback={<p className="text-muted">Loading events</p>}>
          <UpcomingEvents />
        </Suspense>
      </Section>

      <Section aria-labelledby="visit-title" className="pt-0 lg:pt-0">
        <div className="grid gap-12 rounded-cup bg-surface p-8 shadow-lift md:grid-cols-2 md:p-12">
          <div className="flex flex-col items-start gap-4">
            <h2 id="visit-title" className="font-display text-h2 font-semibold tracking-[-0.02em]">
              Save a seat
            </h2>
            <p className="max-w-prose text-muted">
              Walk-ins are always welcome. If you&apos;re coming with friends or for an event night, reserve a table and we&apos;ll hold it.
            </p>
            <ReserveButton size="lg" />
          </div>
          <dl className="flex flex-col gap-2 tabular-nums">
            {hours.map(({ days, time }) => (
              <div key={days} className="flex justify-between gap-4 border-b border-line pb-2">
                <dt>{days}</dt>
                <dd className="text-muted">{time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </>
  );
}

async function UpcomingEvents() {
  await connection(); // reads the clock, so render at request time
  const events = getUpcomingEvents(4);
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
