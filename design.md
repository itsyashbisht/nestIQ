# Design System: Editorial Luxury Discovery

## 1. Overview & Creative North Star

### The Creative North Star: "The Digital Curator"
This design system is not a utility tool; it is a high-end concierge. It rejects the "busy" density of traditional travel booking sites in favor of an **Editorial Luxury** approach. We treat every hotel listing like a feature in a boutique travel magazine.

The system moves beyond the standard grid by embracing **Atmospheric Asymmetry**. By utilizing generous white space (referencing the `spacing-20` and `spacing-24` tokens), overlapping imagery, and a radical hierarchy of typography, we create an experience that feels intentional, calm, and curated. We prioritize "Discovery" over "Search," leading users through a narrative of hospitality rather than a database of entries.

---

## 2. Colors

The palette is rooted in warmth and "Serenity-like" neutrals, designed to let high-quality photography take center stage.

### Surface Hierarchy & Nesting
We define depth through tonal shifts rather than structural lines.
- **Base:** `surface` (#f9f9f7) serves as our canvas.
- **The Layering Principle:** To create hierarchy, stack containers. A `surface-container-lowest` (#ffffff) card should sit atop a `surface-container-low` (#f2f4f2) section. This creates a soft, natural lift that mimics fine paper resting on a stone tabletop.
- **The Dark Mode AI (Dark Surface):** For AI-driven chat or exclusive membership sections, use `on_surface` (#2d3432) or the Dark Surface (#0F0F0F) to pivot the mood instantly to a "private lounge" atmosphere.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Boundaries must be defined solely through background color shifts. Use the `surface-container` tiers to create "zones."

### The "Glass & Gradient" Rule
Floating elements (like navigation bars or quick-action AI widgets) must utilize **Glassmorphism**.
- **Effect:** Apply `surface_container_lowest` at 80% opacity with a `24px` backdrop blur.
- **Signature Texture:** Primary CTAs should not be flat. Apply a subtle linear gradient from `primary` (#5f5e5e) to `primary_dim` (#535252) at a 145-degree angle to provide a satin-like finish.

---

## 3. Typography

The typography strategy is a dialogue between the bold authority of **Poppins** and the functional elegance of **Inter**.

- **Display & Headline (Poppins):** Use `display-lg` and `headline-lg` with **tight tracking (-2% to -4%)**. This creates a "masthead" feel. Headlines are not just labels; they are the voice of the brand.
- **The Body/UI (Inter):** All functional text (descriptions, UI labels) uses Inter. This ensures high legibility against the sophisticated backdrop.
- **The Signature Amber:** Use the `secondary` (#9b4701 / Accent Amber) exclusively for high-value data: Star ratings, "AI-Recommended" highlights, and subtle interactive emphases.

---

## 4. Elevation & Depth

We eschew traditional "Drop Shadows" for a more natural, ambient approach to elevation.

- **Tonal Layering:** Most components should feel "inset" or "flush." Use `surface_container_high` to pull an element forward visually without adding weight.
- **Ambient Shadows:** When a "floating" effect is required (e.g., a high-level modal), use an extra-diffused shadow:
- `Box-shadow: 0px 20px 40px rgba(45, 52, 50, 0.06);`
- The shadow is tinted with the `on_surface` color, not pure black, to mimic natural light.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline_variant` token at **15% opacity**. Never use 100% opaque borders.
- **Large Media Blocks:** To emphasize the "Photography-First" approach, use `roundedness-xl` (3rem) for hero imagery and `roundedness-lg` (2rem) for standard media blocks.

---

## 5. Components

### Buttons
- **Primary:** Full pill radius (`roundedness-full`). Background: Signature Satin Gradient. Text: `on_primary`.
- **Secondary:** Ghost style. No background. `Ghost Border` (outline-variant at 20%). Text: `primary`.
- **Icon Buttons:** Always circular. Use for "next/prev" actions as seen in the reference image, with high-contrast `on_surface` icons.

### Inputs & Search
- **Search Bar:** Instead of a simple box, use a wide `surface_container_lowest` pill with a `12px` corner radius for the internal fields.
- **Focus State:** Shift background to `surface_bright` and apply a `2px` signature amber (`secondary`) outer glow at 20% opacity.

### Cards & Lists
- **The Rule of Zero Dividers:** Forbid the use of divider lines. Separate list items using the spacing scale (e.g., `spacing-4` for tight lists, `spacing-8` for editorial lists).
- **Editorial Cards:** Cards should have a `roundedness-md` (1.5rem). The image should occupy at least 60% of the card area. Use `title-md` for hotel names to maintain an upscale feel.

### AI Concierge Highlights (Custom Component)
- **Style:** A glassmorphic container with an `Accent Amber` left-border accent (3px). This signals "AI Intelligence" without breaking the minimal aesthetic.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical margins. If a text block is left-aligned, allow the imagery to bleed off the right edge of the grid.
- **Do** prioritize "Breathing Room." If you think there is enough white space, add `spacing-4` more.
- **Do** use the `surface_dim` color for footer areas to create a grounded, "weighted" end to the digital experience.

### Don't
- **Don't** use pure black (#000000) for text. Always use `on_surface` (#2d3432) to keep the contrast soft and "ink-on-paper" like.
- **Don't** use standard "Material Design" shadows. They are too aggressive for this editorial mood.
- **Don't** use sharp 90-degree corners. Even the smallest UI elements should have at least `roundedness-sm` (0.5rem) to maintain the "calm" brand personality.
