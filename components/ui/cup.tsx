/** Placeholder product illustration until real photography exists. */
export function Cup({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 320"
      role="img"
      aria-label="A takeaway coffee cup with a charcoal lid"
      className={className}
    >
      <path d="M36 92h168l-20 212a12 12 0 0 1-12 11H68a12 12 0 0 1-12-11z" fill="#ffffff" />
      <path d="M36 92h168l-6 64H42z" fill="#161617" fillOpacity="0.04" />
      <rect x="24" y="52" width="192" height="24" rx="12" fill="#2b2b2d" />
      <path d="M40 76h160l-4 16H44z" fill="#2b2b2d" />
      <text
        x="120"
        y="214"
        textAnchor="middle"
        fontSize="30"
        fill="#161617"
        style={{ fontFamily: "var(--font-marker)" }}
      >
        Brew &amp; Co
      </text>
    </svg>
  );
}
