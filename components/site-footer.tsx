import Link from "next/link";

export const hours = [
  { days: "Monday to Thursday", time: "7am to 6pm" },
  { days: "Friday", time: "7am to 10pm" },
  { days: "Saturday", time: "8am to 6pm" },
  { days: "Sunday", time: "8am to 4pm" },
];

export function SiteFooter() {
  return (
    <footer className="bg-surface-inverse text-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 md:grid-cols-3 md:px-8 xl:px-12">
        <div className="flex flex-col gap-3">
          <p className="font-marker text-3xl">Brew &amp; Co</p>
          <p className="max-w-xs opacity-80">
            Specialty coffee, fresh pastries and light lunches on a Brooklyn corner.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lead font-medium">Hours</h2>
          <dl className="flex flex-col gap-1 opacity-80">
            {hours.map(({ days, time }) => (
              <div key={days} className="flex justify-between gap-4 tabular-nums">
                <dt>{days}</dt>
                <dd>{time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lead font-medium">Explore</h2>
          <ul className="flex flex-col gap-2">
            <li><Link href="/menu" className="underline-offset-4 hover:underline">Menu</Link></li>
            <li><Link href="/about" className="underline-offset-4 hover:underline">About</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
