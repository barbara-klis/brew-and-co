"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import { reserve, type ReserveField, type ReserveState } from "@/app/actions/reserve";
import { Button } from "@/components/ui/button";
import { formatEventDate } from "@/lib/events";

const initialState: ReserveState = {
  ok: false,
  errors: {},
  values: { name: "", partySize: "", date: "", time: "" },
};

// 8:00am to 8:00pm in 30-minute steps
const times = Array.from({ length: 25 }, (_, index) => {
  const minutes = 8 * 60 + index * 30;
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return {
    value: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    label: `${hour > 12 ? hour - 12 : hour}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "pm" : "am"}`,
  };
});

const fieldClass =
  "h-12 w-full rounded-control border border-line bg-background px-4 text-foreground aria-invalid:border-danger";

export function ReservationForm({ onClose }: { onClose: () => void }) {
  const [state, formAction, pending] = useActionState(reserve, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.ok && Object.keys(state.errors).length > 0) {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    }
  }, [state]);

  if (state.ok) {
    const { name, partySize, date, time } = state.values;
    const timeLabel = times.find((slot) => slot.value === time)?.label ?? time;
    return (
      <div role="status" className="flex flex-col items-start gap-4">
        <h2 id="reserve-title" className="font-display text-h3 font-medium">
          Request received
        </h2>
        <p className="max-w-prose">
          We&apos;ll hold a table for {name}, party of {partySize}, on{" "}
          {formatEventDate(date, { weekday: "long", month: "long", day: "numeric" })} at {timeLabel}.
        </p>
        <Button onClick={onClose}>Close</Button>
      </div>
    );
  }

  function describe(field: ReserveField) {
    return state.errors[field] ? `${field}-error` : undefined;
  }

  function error(field: ReserveField) {
    return state.errors[field] ? (
      <p id={`${field}-error`} className="flex items-center gap-2 text-caption text-danger">
        <svg aria-hidden viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v6M12 16.5v.01" />
        </svg>
        {state.errors[field]}
      </p>
    ) : null;
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={(event) => {
        // Dispatch manually so React doesn't reset the fields after a failed submit.
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(() => formAction(data));
      }}
      className="flex flex-col gap-5"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 id="reserve-title" className="font-display text-h3 font-medium">
          Reserve a table
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid size-11 shrink-0 place-items-center rounded-pill hover:bg-background"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-caption font-medium">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          defaultValue={state.values.name}
          aria-invalid={!!state.errors.name}
          aria-describedby={describe("name")}
          className={fieldClass}
        />
        {error("name")}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="partySize" className="text-caption font-medium">Party size</label>
        <select
          id="partySize"
          name="partySize"
          defaultValue={state.values.partySize}
          aria-invalid={!!state.errors.partySize}
          aria-describedby={describe("partySize")}
          className={fieldClass}
        >
          <option value="" disabled>Choose</option>
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1} {index === 0 ? "person" : "people"}
            </option>
          ))}
        </select>
        <p className="text-caption text-muted">Parties of 11 or more? Call us.</p>
        {error("partySize")}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-caption font-medium">Preferred date</label>
          <input
            id="date"
            name="date"
            type="date"
            ref={(element) => {
              // Set on the client only, so the page can still be prerendered.
              if (element) element.min = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
            }}
            defaultValue={state.values.date}
            aria-invalid={!!state.errors.date}
            aria-describedby={describe("date")}
            className={fieldClass}
          />
          {error("date")}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="time" className="text-caption font-medium">Preferred time</label>
          <select
            id="time"
            name="time"
            defaultValue={state.values.time}
            aria-invalid={!!state.errors.time}
            aria-describedby={describe("time")}
            className={fieldClass}
          >
            <option value="" disabled>Choose</option>
            {times.map((slot) => (
              <option key={slot.value} value={slot.value}>{slot.label}</option>
            ))}
          </select>
          {error("time")}
        </div>
      </div>

      <Button type="submit" size="lg" disabled={pending} aria-busy={pending}>
        {pending ? "Sending request" : "Request a table"}
      </Button>
    </form>
  );
}
