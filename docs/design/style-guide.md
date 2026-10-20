# Brew & Co style guide

## 1. Direction

Brew & Co looks like a good paper cup held up against a clean wall. The two references (`references/male_coffee_cup.PNG`, `references/female_coffee_cup.PNG`) agree on four things, and the system is built from them:

| Observed in the references | Rule it becomes |
| --- | --- |
| One object, lots of empty space | Pages show one thing at a time. Space is a feature, not leftover. |
| Crème: giant orange wordmark that the cup and hand overlap | The signature move: oversized type that bleeds off the edge and is overlapped by product. Used once per page. |
| Roasta: rough hand-marker mark beside a plain grotesque tagline | A rough, human mark paired with small, calm, neutral text. |
| Cool grey-white backdrop, charcoal lid, one hot color | A cool neutral ground plus one orange. Nothing else competes. |

**Voice:** plain, warm, short. Sentence case. Say what the thing is ("Oat flat white, 12 oz"), not how great it is.

**Memorable thing:** the *mega* orange wordmark with product overlap. Everything else stays quiet. If a screen has two loud things, remove one.

## 2. Color

All values live in `tokens.css`. Components use the **semantic** names (`bg-background`, `text-foreground`), never raw hex.

| Role | Token | Light | Dark |
| --- | --- | --- | --- |
| Page ground | `background` | Mist `#e9eaec` | `#121213` |
| Raised surface (the "cup") | `surface` | Cup `#ffffff` | `#1d1d1f` |
| Text | `foreground` | Ink `#161617` | `#f3f3f1` |
| Secondary text | `muted` | `#55575c` | `#a9abb0` |
| Borders | `line` | `#d5d7db` | `#2f3033` |
| Brand fill | `accent` | Crema `#ff7a3d` | same |
| Orange text/links | `accent-text` | `#c74a12` | `#ff9a67` |
| Inverse surface (lid) | `surface-inverse` | Lid `#2b2b2d` | `#f3f3f1` |

**Rules**
- Crema `#ff7a3d` is 2.6:1 on white. Use it for **fills and display-size type (24px+) only**. Text on it is always Ink (6.7:1). For orange text at body size, use `accent-text`.
- Blush `#d9a99b` is a rare secondary accent (a tag, a seasonal drink, an illustration fill). Never next to Crema in the same component.
- Orange is the only saturated color in any view. Feedback colors (success/warning/danger) appear only in messages and field states.
- No gradients and no tinted washes. Flat color, like printed cups.

## 3. Typography

Loaded with `next/font/google` (see §9). Three faces, three jobs.

| Role | Family | Use |
| --- | --- | --- |
| Display | **Outfit** (geometric, round terminals, closest free match to the Crème wordmark) | Headlines, the mega wordmark, prices, buttons |
| Text | **Hanken Grotesk** (neutral grotesque, like the Roasta tagline) | Body, UI, forms, captions |
| Marker | **Permanent Marker** | The hand-made mark only: logo lockup, one tagline flourish per page, drink-name stickers. Never body text, never more than ~4 words. |

**Scale**

| Style | Token | Size | Line height | Weight | Tracking |
| --- | --- | --- | --- | --- | --- |
| Mega | `text-mega` | 72–352px fluid | 0.82 | Outfit 600 | -0.04em |
| H1 | `text-h1` | 44–88px fluid | 0.98 | Outfit 600 | -0.03em |
| H2 | `text-h2` | 32–52px fluid | 1.08 | Outfit 600 | -0.02em |
| H3 | `text-h3` | 24px | 1.25 | Outfit 500 | -0.01em |
| Lead | `text-lead` | 20px | 1.5 | Hanken 400 | 0 |
| Body | `text-body` | 16px | 1.6 | Hanken 400 | 0 |
| Caption | `text-caption` | 13px | 1.4 | Hanken 500 | 0.01em |

**Rules**
- Sentence case everywhere. No all-caps labels and no eyebrow above every heading. Add a label only when it carries information (a roast level, an allergen, a price).
- Body line length: 45–70 characters (`max-w-prose`, about 65ch).
- Headlines are left-aligned and tight. Only the mega wordmark may be cropped by the viewport edge.
- Do not accent one word of a headline with color or italics. If a headline needs emphasis, rewrite it.
- Use `font-variant-numeric: tabular-nums` on prices and quantities.

## 4. Layout and spacing

- **Base unit 4px.** Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 144. In Tailwind: `1, 2, 3, 4, 6, 8, 12, 16, 24, 36`.
- **Container:** `max-w-6xl` (72rem), side gutters 16px on mobile, 32px from `md`, 48px from `xl`.
- **Grid:** 4 columns on mobile, 8 from `md`, 12 from `lg`. Gap 16px / 24px.
- **Section rhythm:** 96px between sections on mobile, 144px from `lg`. Set it in one place (a `Section` wrapper), not by stacking margins on children.
- **Alignment:** left-aligned text, always. Center only a single object (a product, a hero cup). Never center paragraphs.
- **Whitespace:** a section holds one idea and one primary action.

**Hero concept**

```
+--------------------------------------------------+
| Brew & Co (marker)               Menu  Visit  Bag |
|                                                  |
|  brew&co   <-- mega, orange, bleeds off the left  |
|  ______   [  CUP PHOTO overlaps wordmark  ]      |
|  Fresh-roasted. Ready when you are.              |
|  [ Order ahead ]  Find a shop                    |
+--------------------------------------------------+
```

## 5. Shape, elevation and imagery

- **Radius:** `rounded-pill` for buttons, chips and the drink size toggle; `rounded-cup` (28px) for product tiles and large panels; `rounded-control` (12px) for inputs. One shape per job, never mixed on the same element.
- **Borders:** 1px `line`. Used to separate, not to decorate.
- **Elevation:** `shadow-lift` for product tiles at rest and menus; `shadow-press` while pressed. Nothing else gets a shadow.
- **Photography:** a single product or hand on a plain Mist or white ground, cut out or shot on seamless paper. Hands, not faces. Crop tight. No stock-photo cafés.
- **Text on photos:** put a flat scrim of Ink at 65% opacity (`bg-ink/65`) between the photo and any text, and keep text white (`text-cup`). Never place text directly on an unscrimmed photo.
- **Menu photos:** one dish or drink per image, shown square (`object-cover`) on the menu list and 4:5 on tiles. Stock photos stand in until real photography exists; credits are in `public/images/CREDITS.md`.
- **Illustration:** black single-weight line drawings with halftone shading (the Crème cup), used on packaging and empty states. No filled color shapes behind them.
- **Icons:** 24px, 1.75px stroke, rounded caps, `currentColor`. Use `lucide-react` if an icon set is added.

## 6. Motion

- One orchestrated moment per page: the hero wordmark slides in from the left over 520ms (`--ease-pour`) and the cup settles on top. Nothing else animates on load.
- Responses to user actions are 140–240ms: press, toggle, add to bag, open menu.
- No scroll-triggered fade-ups, no hover effects on every card. Hover is allowed on things you can click, and only changes background or shadow.
- `prefers-reduced-motion` collapses all durations (already in `tokens.css`).

## 7. Accessibility floor

- Text contrast 4.5:1 minimum (3:1 for 24px+). Checked pairs: Ink on Mist 15:1, Ink on Crema 6.7:1, `accent-text` on Cup 4.8:1, Muted on Cup 7.0:1.
- Visible 3px focus ring on every interactive element (`:focus-visible` in `tokens.css`). Never remove outlines without replacing them.
- Touch targets at least 44×44px.
- Never rely on color alone: errors get an icon and text, selected states get a check or a border change.
- Every image has meaningful `alt`, or `alt=""` if decorative. The mega wordmark is `aria-hidden` when it repeats the page title.

## 8. Writing rules

- Buttons are verbs: **Order ahead**, **Add to bag**, **Save changes**. Not "Submit" or "Click here".
- An action keeps its name through the flow: "Add to bag" produces the toast "Added to bag".
- Errors say what happened and what to do: "That card was declined. Try another card or pay at the counter." No apologies and no "Oops".
- Empty states point at the next action: "Your bag is empty. Pick a drink to start."
- Drink names are real names, not puns.

## 9. Implementation in this repo (Next.js 16, React 19, Tailwind v4)

**1. `app/layout.tsx`: swap Geist for the three brand fonts**

```tsx
import { Outfit, Hanken_Grotesk, Permanent_Marker } from "next/font/google";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["500", "600"] });
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"] });
const marker = Permanent_Marker({ variable: "--font-permanent-marker", subsets: ["latin"], weight: "400" });

// <html className={`${outfit.variable} ${hanken.variable} ${marker.variable} h-full antialiased`}>
```

**2. `app/globals.css`:** keep `@import "tailwindcss";`, add `@import "../docs/design/tokens.css";`, and remove the starter `:root`, `@theme inline`, dark-mode block and `body` rule (tokens.css replaces them, including the `Arial` body font).

**3. Components** go in `components/ui/`, are server components unless they need state, and use only token-backed utilities (`bg-accent`, `text-foreground`, `rounded-pill`). No arbitrary hex values.

**4. Update `metadata`** in `layout.tsx` from "Create Next App" to the Brew & Co title and description.

See `components.md` for component specs.
