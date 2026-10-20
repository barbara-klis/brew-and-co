"use client";

import { createContext, useContext, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ReservationForm } from "@/components/reservation-form";

const ReservationContext = createContext<(() => void) | null>(null);

/** Renders the single reservation dialog and lets any ReserveButton open it. */
export function ReservationProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [session, setSession] = useState(0);

  function open() {
    setSession((value) => value + 1); // remount the form so it starts empty
    dialogRef.current?.showModal();
  }

  return (
    <ReservationContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="reserve-title"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto w-[min(32rem,calc(100%-2rem))] rounded-cup bg-surface p-6 text-foreground shadow-lift backdrop:bg-ink/60 md:p-8"
      >
        <ReservationForm key={session} onClose={() => dialogRef.current?.close()} />
      </dialog>
    </ReservationContext.Provider>
  );
}

export function ReserveButton({
  children = "Reserve a table",
  onClick,
  ...props
}: {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "quiet";
  size?: "md" | "lg";
  className?: string;
  /** Runs before the dialog opens, e.g. to close a menu that is in the way. */
  onClick?: () => void;
}) {
  const open = useContext(ReservationContext);
  return (
    <Button
      {...props}
      onClick={() => {
        onClick?.();
        open?.();
      }}
    >
      {children}
    </Button>
  );
}
