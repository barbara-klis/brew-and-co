import Image from "next/image";
import { formatEventDate, type ShopEvent } from "@/lib/events";

export function EventCard({ event }: { event: ShopEvent }) {
  return (
    <article className="grid overflow-hidden rounded-cup bg-surface shadow-lift sm:grid-cols-[2fr_3fr]">
      <div className="relative aspect-[4/3] sm:aspect-auto">
        <Image
          src={event.image}
          alt={event.imageAlt}
          fill
          sizes="(min-width: 640px) 25vw, 100vw"
          className="object-cover object-[50%_30%]"
        />
      </div>
      <div className="flex flex-col items-start gap-3 p-6 md:p-8">
        <p className="font-display text-h3 font-medium text-accent-text">
          {formatEventDate(event.date, { weekday: "long", month: "short", day: "numeric" })}
        </p>
        <h3 className="font-display text-h3 font-medium tracking-[-0.01em]">{event.title}</h3>
        <p className="text-caption font-medium tabular-nums text-muted">{event.time}</p>
        <p className="text-muted">{event.description}</p>
      </div>
    </article>
  );
}
