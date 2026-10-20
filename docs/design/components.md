# Component specs

Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind v4. Components live in `components/ui/`. They are server components unless marked **client**. Class names below use the tokens from `tokens.css`; do not substitute raw values. Common to all: visible `:focus-visible` ring (global), 44px minimum touch target, no hover-only information.

## Button

Props: `variant: "primary" | "secondary" | "quiet"` (default `primary`), `size: "md" | "lg"`, `asChild`/`href` for links, `loading?: boolean`.

| Variant | Classes |
| --- | --- |
| primary | `bg-accent text-on-accent` hover `bg-crema-300`, active `shadow-press translate-y-px` |
| secondary | `bg-surface-inverse text-surface` (lid-colored) hover `bg-ink` |
| quiet | `bg-transparent text-foreground border border-line` hover `bg-surface` |

- Shape `rounded-pill`, height 44px (`md`) / 56px (`lg`), padding-x 24px / 32px, `font-display font-medium`.
- Disabled: 50% opacity, `aria-disabled`, no pointer events. Loading: keep the width, replace the label with a spinner and set `aria-busy`.
- Label is a verb. No trailing arrows.

## Link

Inline: `text-accent-text underline underline-offset-4 decoration-1`, hover `decoration-2`. Navigation links: `text-foreground`, current page has `aria-current="page"` and an underline.

## Wordmark (`Logo`)

- Marker lockup: "Brew & Co" in `font-marker`, `text-foreground`, 28px in the header. Never recolored except to white on Lid.
- **MegaWordmark** (the signature element): "brew&co" in `font-display font-semibold text-mega tracking-[-0.04em] text-accent leading-[0.82]`, `aria-hidden`, absolutely positioned behind the content, bleeding off the left edge (`-ml-[0.06em]`). One per page. Sits at z-0; the product image is z-10 and overlaps it.

## Header (client for the mobile menu)

- Height 72px, `bg-background`, no shadow. Logo left, nav right: Menu, Shops, Order ahead (primary button).
- Below `md`: nav collapses into a full-screen sheet (`bg-surface`) opened by a "Menu" button with `aria-expanded`. Opens in 240ms; the sheet traps focus and closes on Escape.
- Sticky only when scrolled up. No background change on scroll.

## ProductTile

The unit of the shop grid. A surface holding one product on a clean ground.

```
+-----------------+
|   [  image  ]   |   image: object-contain on Cup white, aspect 4/5
|                 |
| Oat flat white  |   Outfit 500, 24px
| 12 oz           |   caption, muted
| $4.80    [ Add ]|   price: tabular-nums; Add = small primary button
+-----------------+
```

- `bg-surface rounded-cup shadow-lift p-6`. The whole tile is a link to the product page; the Add button is a separate control (don't nest links in buttons or buttons in links, use a stretched-link pattern).
- Layout in the grid: 1 column on mobile, 2 on `md`, 3 on `lg`. Don't make every tile the same height if the images differ; align by top.
- Badges ("New", "Seasonal") use Blush: `bg-blush-50 text-ink rounded-pill px-3 py-1 text-caption`.

## SizeToggle (client)

A radio group styled as a pill segmented control: Small / Medium / Large with ounces under each. Selected: `bg-surface-inverse text-surface`. Unselected: `bg-surface border border-line`. Native `<input type="radio">` inside labels; arrow keys move selection. Selected state also shows a check icon (not color alone).

## Form fields

- Label above the field, `text-caption font-medium`, always visible (no placeholder-as-label).
- Input: `h-12 rounded-control bg-surface border border-line px-4`, focus: border `foreground` plus global ring. Helper text below in `muted`.
- Error: border `danger`, icon + message below in `danger`, `aria-invalid` and `aria-describedby`. Message example: "Enter a phone number with 10 digits."
- Checkbox/radio: 24px, `accent` fill when checked with Ink check mark.

## Toast (client)

Bottom-center on mobile, bottom-right from `md`. `bg-surface-inverse text-surface rounded-pill px-5 py-3 shadow-lift`, slides up 240ms, auto-dismisses after 5s (pause on hover/focus), `role="status"`. Text repeats the action: "Added to bag". Optional single text action ("Undo").

## Section

Layout wrapper that owns vertical rhythm: `py-24 lg:py-36` and the container (`mx-auto max-w-6xl px-4 md:px-8 xl:px-12`). Children never add their own outer vertical margins. Accepts an optional `heading` (H2) with a `max-w-prose` intro paragraph under it.

## Hero

Composition of Section + MegaWordmark + product image + H1 + one primary and one quiet action.
- H1 is left-aligned, `max-w-[14ch]`.
- Product image (cup on a transparent PNG/WebP, `priority`) is centered or right-aligned and overlaps the wordmark. `next/image` with explicit `sizes`.
- Entry: wordmark slides from `-8%` to 0 with opacity 0→1 over 520ms `--ease-pour`; image fades in 200ms later. Skipped under reduced motion.

## EmptyState

Centered single column, `max-w-sm`: a 160px line illustration, H3, one sentence, one primary button. Example: "Your bag is empty." / "Pick a drink to start." / **Browse the menu**.

## Footer

`bg-surface-inverse text-surface` (the lid), 64px padding. Marker lockup left; link groups in Hanken 400; opening hours as a plain list. Orange appears only on the focus ring and links' hover underline.

## States checklist (every component)

Default, hover, focus-visible, active, disabled, loading, error, empty. Check at 360px, 768px and 1280px wide, in light and dark.

## EventCard

Surface (`bg-surface rounded-cup shadow-lift`) with the photo on the left (2/5 width from `sm`, stacked 4:3 on mobile) and text on the right: date in `accent-text` Outfit 500 24px, title H3, time in caption `muted` with `tabular-nums`, one-sentence description. Dates come from `lib/events.ts` and render at request time inside `<Suspense>` (Cache Components).

## MenuList (menu page)

Category heading (H2) per section, then a two-column list from `md`. Each item: 112 to 128px square photo (`rounded-control`), name and price on one line joined by a dotted leader, description in `muted`, optional Badge. A sticky pill nav jumps between categories. Data is read from `content/menu-items.csv` by `lib/menu.ts`.

## ReservationDialog

Native `<dialog>` opened by `ReserveButton` from anywhere (one instance, mounted by `ReservationProvider` in the root layout). Fields: name, party size (1 to 10), preferred date (today onward), preferred time (8:00am to 8:00pm, 30-minute steps). The form is submitted with `startTransition` so fields keep their values after an error. Errors show an icon and specific text, and focus moves to the first invalid field. Success replaces the form with "Request received" and the entered details. The server action in `app/actions/reserve.ts` validates only; it doesn't store or send anything yet.

## Badge

Pill, caption size, Ink text. "Popular" uses `bg-accent`; every other badge uses `bg-blush-50`.
