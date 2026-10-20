import type { ComponentProps } from "react";

/** Owns the page container and vertical rhythm so children never add outer margins. */
export function Section({ className = "", ...props }: ComponentProps<"section">) {
  return (
    <section
      className={`mx-auto w-full max-w-6xl px-4 py-24 md:px-8 lg:py-36 xl:px-12 ${className}`}
      {...props}
    />
  );
}

export function SectionHeading({
  title,
  intro,
  id,
}: {
  title: string;
  intro?: string;
  id?: string;
}) {
  return (
    <div className="mb-12 flex max-w-prose flex-col gap-4">
      <h2 id={id} className="font-display text-h2 font-semibold tracking-[-0.02em]">
        {title}
      </h2>
      {intro && <p className="text-lead text-muted">{intro}</p>}
    </div>
  );
}
