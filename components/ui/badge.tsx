export function Badge({ children }: { children: React.ReactNode }) {
  const popular = children === "Popular";
  return (
    <span
      className={`inline-block rounded-pill px-3 py-1 text-caption font-medium text-ink ${
        popular ? "bg-accent" : "bg-blush-50"
      }`}
    >
      {children}
    </span>
  );
}
