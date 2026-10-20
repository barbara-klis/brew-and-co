"use server";

export type ReserveField = "name" | "partySize" | "date" | "time";

export type ReserveState = {
  ok: boolean;
  errors: Partial<Record<ReserveField, string>>;
  values: Record<ReserveField, string>;
};

const OPEN_TIME = "08:00";
const LAST_SEATING = "20:00";
const MAX_PARTY = 10;

export async function reserve(_previous: ReserveState, formData: FormData): Promise<ReserveState> {
  const values: ReserveState["values"] = {
    name: String(formData.get("name") ?? "").trim(),
    partySize: String(formData.get("partySize") ?? ""),
    date: String(formData.get("date") ?? ""),
    time: String(formData.get("time") ?? ""),
  };
  const errors: ReserveState["errors"] = {};

  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
  const size = Number(values.partySize);

  if (!values.name) errors.name = "Enter a name for the reservation.";
  if (!Number.isInteger(size) || size < 1 || size > MAX_PARTY) {
    errors.partySize = `Choose a party size from 1 to ${MAX_PARTY}. For larger groups, call us.`;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date)) {
    errors.date = "Pick a date.";
  } else if (values.date < today) {
    errors.date = "Pick a date from today onward.";
  }
  if (!/^\d{2}:\d{2}$/.test(values.time)) {
    errors.time = "Pick a time.";
  } else if (values.time < OPEN_TIME || values.time > LAST_SEATING) {
    errors.time = "Pick a time between 8:00am and 8:00pm.";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors, values };

  // TODO: store or send the request (email, database) once a destination is chosen.
  return { ok: true, errors: {}, values };
}
