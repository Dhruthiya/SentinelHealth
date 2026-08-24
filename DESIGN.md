# DESIGN.md — Futuristic UI Redesign

## Goal

Redesign the existing website with a **premium dark futuristic tech aesthetic**.

Keep the existing functionality exactly as it is. Change only the visual design and surrounding HTML structure when necessary.

## DO NOT BREAK

* Do not change JavaScript logic.
* Do not change API calls/routes.
* Do not change event listeners.
* Do not change existing form behavior.
* Do not change existing `id` attributes.
* Preserve existing `name`, `data-*`, and JS-related attributes.
* Do not create duplicate interactive elements.
* Do not add unnecessary libraries or dependencies.

## Color Palette — STRICT

Use only these colors:

* Background: `#2C3531`
* Teal accent: `#116466`
* Sand accent: `#D9B08C`
* Peach highlight: `#FFCB9A`
* Text/borders: `#D1E8E2`

Do not introduce other neon colors.

## Visual Style

Make the UI feel:

* Dark
* Futuristic
* Premium
* Minimal
* High-tech
* Geometric

Avoid generic cyberpunk, excessive glassmorphism, excessive gradients, or clutter.

Use uppercase headings and labels with generous letter spacing.

## Layout

### Navigation

Minimal dark navbar with:

* Logo/branding on the left
* Existing navigation/actions preserved
* `SHOP NOW` as the main right-side CTA if applicable
* Thin borders and subtle teal glow

### Hero

Create a dramatic hero using a charcoal → teal gradient.

Left side:

**SOLARIN HAS ARRIVED**

Use large bold uppercase typography with wide spacing.

Center/right:

Add a futuristic **glowing geometric sphere/grid visual** using CSS/SVG or existing assets. Do not add a heavy new dependency just for this.

Add a framed:

**DISCOVER**

CTA with a subtle teal hover glow. If an existing CTA already exists, restyle it instead of creating another one.

### Content

Restyle existing sections to match the same dark premium aesthetic.

Use thin borders, subtle teal lighting, mint text, and restrained sand/peach highlights.

### Footer

Create a minimal dark utility bar using existing footer content, with links such as:

`MORE` · `CONTACT`

## Responsive

Make the redesign work cleanly on:

* Desktop
* Tablet
* Mobile

No horizontal scrolling, overlapping elements, or broken interactions.

## Accessibility

Preserve readable contrast, keyboard focus states, and existing semantic/interactive behavior.

Respect `prefers-reduced-motion`.

## Final Rule

**Redesign the appearance, not the application.**

Before finishing, verify that all existing IDs, JavaScript behavior, API calls, forms, buttons, and interactions still work exactly as before.
