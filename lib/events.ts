export type ShopEvent = {
  id: string;
  title: string;
  description: string;
  /** YYYY-MM-DD in New York time */
  date: string;
  time: string;
  image: string;
  imageAlt: string;
};

type Recurring = Omit<ShopEvent, "date" | "id"> & {
  weekday: number; // 0 = Sunday
  endHour: number; // local hour after which today's occurrence is over
};

const recurring: Recurring[] = [
  {
    weekday: 5,
    title: "Open mic night",
    description: "Sign up at the counter from 6:30pm. Three songs or ten minutes, whichever comes first.",
    time: "7:00 to 10:00pm",
    endHour: 22,
    image: "/images/event-open-mic.webp",
    imageAlt: "A musician in a mustard sweater singing and playing acoustic guitar at a microphone",
  },
  {
    weekday: 6,
    title: "Coffee tasting",
    description: "Taste three single-origin coffees side by side with our roaster. Eight seats, first come, first served.",
    time: "10:00 to 11:30am",
    endHour: 12,
    image: "/images/event-tasting.webp",
    imageAlt: "Cupping bowls of ground coffee and tasting spoons on a wooden table",
  },
];

const TIME_ZONE = "America/New_York";

/** Returns the next `count` event dates, soonest first. Call only at request time (it reads the clock). */
export function getUpcomingEvents(count: number, now: Date = new Date()): ShopEvent[] {
  const local = new Date(now.toLocaleString("en-US", { timeZone: TIME_ZONE }));
  const events: ShopEvent[] = [];

  for (let offset = 0; offset < 28 && events.length < count + recurring.length; offset++) {
    const day = new Date(local.getFullYear(), local.getMonth(), local.getDate() + offset);
    for (const { weekday, endHour, ...event } of recurring) {
      if (day.getDay() !== weekday) continue;
      if (offset === 0 && local.getHours() >= endHour) continue;
      const date = [
        day.getFullYear(),
        String(day.getMonth() + 1).padStart(2, "0"),
        String(day.getDate()).padStart(2, "0"),
      ].join("-");
      events.push({ ...event, id: `${event.title}-${date}`, date });
    }
  }

  return events.slice(0, count);
}

/** Formats YYYY-MM-DD without any time zone shifts. */
export function formatEventDate(date: string, options: Intl.DateTimeFormatOptions): string {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(
    new Date(Date.UTC(year, month - 1, day)),
  );
}
