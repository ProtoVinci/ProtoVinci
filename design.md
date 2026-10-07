# ProtoVinci Design System & Typography Specification

This document defines the official typography hierarchy, color codes, font weights, and layout standards for the ProtoVinci agency application, strictly based on the design guidelines.

---

## 1. Typography Hierarchy

Primary Font Family: **Switzer** (`'Switzer', sans-serif`)

| Token / Type | Font Size | Color Hex | Color Preview | Font Weight | CSS Class | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Heading 1** | `66px` | `#000000` | ⬛ Black | `550` (Bold 550) | `.font-h1` | Hero headlines, primary section titles |
| **Heading 2** | `54px` | `#000000` | ⬛ Black | `550` (Bold 550) | `.font-h2` | Major section headings, prominent display |
| **Heading 3** | `44px` | `#000000` | ⬛ Black | `500` (Bold Medium) | `.font-h3` | Secondary headings, card titles |
| **Heading 4** | `40px` | `#000000` | ⬛ Black | `500` (Bold Medium) | `.font-h4` | Subsection titles, modal headers |
| **Heading 5** | `32px` | `#000000` | ⬛ Black | `500` (Bold Medium) | `.font-h5` | Minor headings, featured labels |
| **Text 28** | `28px` | `#ffffff` | ⬜ White | `500` (Medium) | `.font-text-28` | Overlay text, service headlines |
| **Text 22** | `22px` | `#101011` | ⬛ Rich Black | `550` (Bold 550) | `.font-text-22` | Body accent, subheadings |
| **Text 20** | `20px` | `#ffffff` | ⬜ White | `500` (Bold Medium) | `.font-text-20` | High-contrast body, dark badges |
| **Text 18** | `18px` | `#7d7d7d` | 🩶 Neutral Grey | `500` (Bold Medium) | `.font-text-18` | Standard descriptions, subtitles |
| **Text 16** | `16px` | `#7d7d7d` | 🩶 Neutral Grey | `500` (Bold Medium) | `.font-text-16` | Body text, captions |
| **Text 15** | `15px` | `#000000` | ⬛ Black | `500` (Bold Medium) | `.font-text-15` | Interactive labels, nav links |
| **Text 14** | `14px` | `#000000` | ⬛ Black | `500` (Bold Medium) | `.font-text-14` | Secondary labels, metadata |
| **Text 14 Upper** | `14px` | `#ffffff` | ⬜ White | `600` (Semibold) | `.font-text-14-upper` | Taglines, uppercase badges, tracking 0.12em |

---

## 2. Color Palette Tokens

- **Brand Dark (Black)**: `#000000`
- **Rich Off-Black**: `#101011`
- **Pure White**: `#ffffff`
- **Neutral Grey**: `#7d7d7d`
- **Section Background Gradient**: `linear-gradient(to right, #f8f9fb 0%, #f8f9fb 100%)`
- **Dark Overlay**: `linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.45) 100%)`

---

## 3. Services Section Specification (Parallax & Slice Effect)

Inspired by the editorial minimalism and cinematic parallax interaction of [DontMatter](https://dontmatter.eu/):

1. **4 Featured Services**:
   - `Logo Design & Visual Identity` (Asset: `visual-identity.png`)
   - `Web Design & Development` (Asset: `web-design.png`)
   - `Digital Marketing` (Asset: `marketing.png`)
   - `Social Media Content` (Asset: `social-media.png`)

2. **Parallax Mechanics**:
   - Each service is a full-width item with `overflow: hidden; clip-path: inset(0 0 0 0);`.
   - The background image includes an optical bleed `--parallax-bleed: 18vh` and scrubs with GSAP `ScrollTrigger` from `-18vh` to `+18vh`.
   - Smooth GPU-accelerated motion with `will-change: transform; force3D: true;`.

3. **Static Text & Boundary Slice Transition**:
   - The title text is positioned at the bottom-left (`position: fixed; bottom: 80px; left: 60px;`).
   - Because each card has `clip-path: inset(0 0 0 0)`, each text is strictly visible inside that card's viewport footprint.
   - As the subsequent card scrolls up, its boundary slices horizontally across the viewport, seamlessly revealing the incoming service text while concealing the previous service text at the exact same fixed coordinates.
