# Seedforge — Animated Home Scene: Asset Prompts & Assembly Guide

> The Seedforge home page features an animated pixel art scene: a forest forge clearing with a glowing seed on an anvil, a gently breathing character, and the Seedforge wordmark. Each element is a separate asset layered and animated in code.

---

## Table of Contents

1. [Scene Composition](#scene-composition)
2. [Asset List](#asset-list)
3. [Image Generation Prompts](#image-generation-prompts)
4. [Animation Specification](#animation-specification)
5. [Coding Agent Prompt](#coding-agent-prompt)

---

## Scene Composition

### Layout (desktop, 16:9 ratio)

```
┌─────────────────────────────────────────────────┐
│                                                   │
│            [forest canopy / sky]                   │
│                                                   │
│                  SEEDFORGE                         │
│              (pixel wordmark)                      │
│                                                   │
│     ✦  ·  ✦      ✧        ✦    · ✧               │
│          (floating particles / fireflies)          │
│                                                   │
│                 ╔═══════╗                          │
│                 ║ SEED  ║  ← glowing, pulsing      │
│                 ╚═══╤═══╝                          │
│                 ┌───┴───┐                          │
│                 │ ANVIL │  ← static, solid          │
│            ┌──┐ └───────┘                          │
│            │☺ │    ← character, gentle bounce       │
│            └──┘                                    │
│  ~~~~ ground / moss / flowers ~~~~                 │
│                                                   │
└─────────────────────────────────────────────────┘
```

### Layer order (back to front)
1. **Background** — forest clearing, sky, distant trees, ground
2. **Anvil** — stone anvil on mossy base, static
3. **Seed glow** — soft radial glow behind the seed (animated: pulse)
4. **Seed** — the cracked-open glowing seed (animated: gentle float)
5. **Particles** — floating sparks, spores, fireflies (animated: drift)
6. **Character** — the pixel grower (animated: idle bounce/breathe)
7. **Wordmark** — "SEEDFORGE" pixel text (animated: fade-in, optional shimmer)

---

## Asset List

| # | Asset | Filename | Format | Dimensions (approx) | Transparency |
|---|-------|----------|--------|---------------------|-------------|
| 1 | Background scene | `bg-forest.png` | PNG | 1920×1080 | No (full canvas) |
| 2 | Anvil | `anvil.png` | PNG | 256×256 | Yes (transparent BG) |
| 3 | Seed | `seed.png` | PNG | 128×128 | Yes (transparent BG) |
| 4 | Seed glow | `seed-glow.png` | PNG | 256×256 | Yes (soft radial glow, transparent) |
| 5 | Particle: spark | `particle-spark.png` | PNG | 16×16 | Yes |
| 6 | Particle: spore | `particle-spore.png` | PNG | 12×12 | Yes |
| 7 | Particle: firefly | `particle-firefly.png` | PNG | 8×8 | Yes |
| 8 | Character idle frame 1 | `character-idle-1.png` | PNG | 128×192 | Yes |
| 9 | Character idle frame 2 | `character-idle-2.png` | PNG | 128×192 | Yes |
| 10 | Character idle frame 3 | `character-idle-3.png` | PNG | 128×192 | Yes |
| 11 | Character idle frame 4 | `character-idle-4.png` | PNG | 128×192 | Yes |
| 12 | Wordmark | `wordmark.png` | PNG | 640×128 | Yes |

---

## Image Generation Prompts

### Asset 1 — Background Scene (`bg-forest.png`)

```
16-bit pixel art background scene of a magical forest clearing at golden hour. Wide landscape format (16:9 ratio). Dense pixel trees frame the left and right edges, their canopy meeting at the top with dappled golden light filtering through gaps. The ground is rich mossy earth with small pixel wildflowers, tiny mushrooms, and scattered stones. Centre of the clearing is open — this is where other elements will be layered on top, so keep the centre relatively clear with just ground detail. Subtle light rays angle down from upper-left. The sky visible through the canopy is warm sunset amber fading to soft teal-blue at the top. Distant background trees are darker and less detailed to create depth. Small details: hanging vines from canopy edges, a fallen log at far left, a small pond or stream at far right reflecting the golden light. Firefly-sized dots of light scattered naturally. Colour palette: deep forest greens (#1E3A2F, #2D5A3D), warm amber light (#E8A838, #F5D77A), mossy earth (#4A5A3A), cool shadows (#1A1A2E, #2D2D3F), sky teal (#1A6B5C). Style: Stardew Valley / Eastward background quality. Rich, atmospheric, inviting. This is a place you want to be.
```

---

### Asset 2 — Anvil (`anvil.png`)

```
16-bit pixel art anvil on a transparent background. The anvil is a classic blacksmith's anvil shape — wide flat top, narrow waist, solid rectangular base — but made of rough stone rather than polished metal, giving it an ancient, natural feel. Dark iron-grey stone (#4A4A5E, #6B6B7F) with lighter highlights on the top surface where things are placed. The base sits on a small mound of moss and earth with 2-3 tiny pixel mushrooms or flowers growing at its feet and a thin vine creeping up one side. Moss patches on the anvil itself in deep green. The top surface of the anvil should be slightly concave (dipped) to suggest the seed sits naturally in a cradle. No glow, no seed — just the anvil and its mossy base. Transparent background. Style: RPG crafting station item, 16-bit, detailed but clean pixel work.
```

---

### Asset 3 — Seed (`seed.png`)

```
16-bit pixel art magical seed on a transparent background. The seed is an almond/teardrop shape, roughly 12-16 pixels tall at native resolution. It is cracked open along one side, revealing intense bright golden-white light from within (#FFF4C2, #F5D77A). The outer shell is warm amber-brown (#B8721A) with subtle texture. From the crack, 2-3 tiny green tendrils/sprouts emerge upward (#4CAF50, #81C784), delicate and new. The seed itself has a very subtle inner glow — the pixels immediately surrounding it are slightly lighter than they would be naturally. DO NOT include the large ambient glow effect — that's a separate layer. Just the seed object with its crack, inner light, and sprouts. Transparent background. Style: legendary item icon from a 16-bit RPG, precious and powerful.
```

---

### Asset 4 — Seed Glow (`seed-glow.png`)

```
Soft radial glow effect on a transparent background. A warm golden light source at the centre radiating outward in concentric rings of decreasing opacity. Centre is bright warm gold (#F5D77A at ~80% opacity), expanding outward through amber (#E8A838 at ~40% opacity) to a very faint warm tint (#B8721A at ~10% opacity) at the edges. The glow should be slightly oval — wider than it is tall — to simulate light spilling from the seed. Subtle pixel-dithering at the edges to blend naturally. NO hard edges. The glow should feel like candlelight or a warm ember. This will be placed BEHIND the seed asset and animated to pulse (scale and opacity). Transparent background. Render larger than the seed (roughly 2-3x the seed's dimensions) so the glow extends well beyond it. Pixel art style but soft — this is the one element that can be smoother than strict pixel grid.
```

---

### Asset 5 — Particles (`particle-spark.png`, `particle-spore.png`, `particle-firefly.png`)

**Spark:**
```
Tiny pixel art spark on transparent background. 3-4 pixels. A bright golden-white point (#FFF4C2) with 1-pixel amber surround (#E8A838). Like a single ember floating from a fire. Very simple, very small. Transparent background.
```

**Spore:**
```
Tiny pixel art floating spore or seed on transparent background. 2-3 pixels. Soft green-white (#81C784 centre, #4CAF50 edge). Round, organic, like a dandelion seed or pollen grain. Transparent background.
```

**Firefly:**
```
Tiny pixel art firefly glow on transparent background. 2 pixels of warm yellow-green (#C8E84C) with a 1-pixel soft glow around it. Just the light, not an insect body. Transparent background.
```

---

### Asset 6 — Character Idle Frames (`character-idle-1.png` through `character-idle-4.png`)

These four frames create a simple idle breathing/bouncing animation when cycled.

**Base character description (apply to ALL four frames):**
```
16-bit pixel art character, front-facing, on transparent background. A friendly adventurer-gardener: short and slightly chibi proportions (~24-32 pixels tall at native res). Wearing a simple outfit: earthy brown trousers, a green tunic or vest, and a wide-brimmed sun hat in warm brown. Has a small satchel or seed pouch at their hip. Simple, friendly face with dot eyes and a small smile. Boots are sturdy brown. Skin tone: warm medium. Hair: visible beneath the hat, any colour. The character should look curious and content — standing relaxed, looking slightly upward toward where the seed would be (their eyeline tilted up-right). Style: Stardew Valley / Celeste character proportions. Cute, expressive, approachable. Transparent background.
```

**Frame 1 (neutral):**
```
[Base description above]. Standing at neutral height. Arms relaxed at sides, feet flat. This is the baseline pose.
```

**Frame 2 (breathe in — slight rise):**
```
[Base description above]. Identical to frame 1 but the entire character is shifted UP by 1-2 pixels. Shoulders very slightly raised. Subtle chest expansion. Hat brim tilts up microscopically. This is the "breathe in" frame.
```

**Frame 3 (breathe peak — top of bounce):**
```
[Base description above]. Character shifted UP by 2-3 pixels from baseline. At the top of the gentle bounce. Slight lean forward with curiosity — weight on toes. Eyes might be 1 pixel wider or brighter. Most elevated frame.
```

**Frame 4 (breathe out — settling):**
```
[Base description above]. Character shifted UP by 1 pixel from baseline (between frame 1 and frame 2). Settling back down. Shoulders relaxed. A gentle "settling" pose. This transitions smoothly back to frame 1.
```

**Animation cycle:** 1 → 2 → 3 → 2 → 1 → 4 → 1 (creates a natural breathe-bounce loop)

**Alternative approach:** Generate a single character frame and handle the bounce/breathe purely in CSS (translateY + slight scaleY). This is simpler and may produce more consistent results. The coding agent prompt below supports both approaches.

---

### Asset 7 — Wordmark (`wordmark.png`)

```
Pixel art wordmark text "SEEDFORGE" on transparent background. Custom chunky 16-bit typeface — each letter roughly 12-16 pixels tall. Letters are bold and slightly rounded, friendly not aggressive. Colour: warm cream (#FFF8F0) with a 1-pixel dark outline (#1A1A2E) for definition. The letter 'O' is replaced by or contains a small seed icon — a tiny golden-amber oval with a green sprout on top. The letter 'F' has a subtle hammer silhouette integrated into its shape. Very slight pixel shading on the bottom edge of each letter (1 pixel of #B8721A) giving a warm shadow. Transparent background. Wide format — text should be horizontally spacious with generous letter spacing. Style: retro game title screen, like Stardew Valley or Shovel Knight logo treatment but warmer.
```

---

## Animation Specification

| Element | Animation | CSS Approach | Duration | Easing |
|---------|-----------|-------------|----------|--------|
| Background | Static (no animation) | None | — | — |
| Anvil | Static (no animation) | None | — | — |
| Seed glow | Pulse: scale 1.0→1.15→1.0, opacity 0.6→1.0→0.6 | `@keyframes pulse` on `transform: scale()` + `opacity` | 3s loop | `ease-in-out` |
| Seed | Gentle float: translateY 0→-4px→0 | `@keyframes float` on `transform: translateY()` | 3s loop (synced with glow) | `ease-in-out` |
| Particles (sparks) | Rise from seed area, drift upward, fade out | JS-driven or CSS `@keyframes rise` — random X offset, translateY upward, opacity 1→0 | 3-5s per particle, staggered spawns | `linear` vertical, `ease-out` opacity |
| Particles (spores) | Gentle drift: random direction, slow, sine-wave horizontal | CSS `@keyframes drift` — translateX sine + translateY slow rise | 6-10s per particle | `ease-in-out` |
| Particles (fireflies) | Blink on/off at random positions | CSS `@keyframes blink` — opacity 0→1→0 + slight translateXY | 2-4s per firefly, random delay | `ease-in-out` |
| Character | Idle bounce: translateY 0→-3px→0 + subtle scaleY 1.0→1.02→1.0 | `@keyframes idle-bounce` | 2.5s loop | `ease-in-out` |
| Wordmark | Fade in on load (delay 0.5s), then optional subtle shimmer | `@keyframes fade-in` + optional `@keyframes shimmer` on a gradient overlay | Fade: 1s once. Shimmer: 4s loop | `ease-out` fade, `linear` shimmer |

### Parallax (optional enhancement)
On mouse move (desktop) or device tilt (mobile), layers shift slightly to create depth:
- Background: moves 0 (static)
- Anvil + seed: moves ±5px opposite to mouse
- Character: moves ±8px opposite to mouse
- Particles: moves ±12px opposite to mouse
- Wordmark: moves ±3px opposite to mouse

This creates a subtle diorama / parallax card effect.

### Entrance sequence (on page load)
1. **0.0s** — Background fades in from black (0.8s)
2. **0.3s** — Anvil slides up slightly from below and fades in (0.6s)
3. **0.6s** — Seed glow blooms from nothing (scale 0→1, opacity 0→0.6, 0.8s)
4. **0.7s** — Seed fades in at centre of glow (0.4s)
5. **0.9s** — Character slides in from left, settles into position (0.6s)
6. **1.2s** — Particles begin spawning
7. **1.5s** — Wordmark fades in and settles (0.8s)
8. **2.5s** — All idle animations running, scene fully alive

---

## Coding Agent Prompt

The following prompt should be given to an AI coding agent (Claude Code, Cursor, etc.) to build the animated component. Copy the entire block.

---

````markdown
## Task

Build a React component called `SeedforgeHeroScene` that renders an animated pixel-art scene for the Seedforge home/marketing page. The scene shows a forest clearing with a glowing seed on an anvil, a gently bouncing character, floating particles, and the "SEEDFORGE" wordmark.

## Architecture

- **Framework:** React (Next.js compatible) with TypeScript
- **Styling:** CSS Modules or Tailwind + custom CSS keyframes (no animation libraries — keep it lightweight)
- **Assets:** PNG images loaded from `/public/hero/` directory
- **Responsive:** Must work from 320px mobile to 1920px desktop
- **Performance:** Must run at 60fps. Use `transform` and `opacity` only (GPU-accelerated). No layout-triggering properties in animations.

## Asset files (provided in `/public/hero/`)

```
/public/hero/
├── bg-forest.png        (1920×1080, background scene)
├── anvil.png            (256×256, transparent bg)
├── seed.png             (128×128, transparent bg)
├── seed-glow.png        (256×256, transparent bg, radial glow)
├── particle-spark.png   (16×16, transparent bg)
├── particle-spore.png   (12×12, transparent bg)
├── particle-firefly.png (8×8, transparent bg)
├── character.png        (128×192, transparent bg, single frame)
└── wordmark.png         (640×128, transparent bg)
```

## Component Structure

```tsx
<SeedforgeHeroScene>
  <div className="scene-container">       // 100vw × 100vh (or max 1080px height), overflow hidden
    <img className="bg" />                 // background, covers full container
    <div className="scene-content">        // centred content area, max-width 1200px
      <img className="anvil" />            // positioned centre-bottom area
      <img className="seed-glow" />        // positioned above anvil, BEHIND seed, animated pulse
      <img className="seed" />             // positioned above anvil, animated float
      <ParticleField />                    // spawns and animates particle elements
      <img className="character" />        // positioned left of anvil, animated idle bounce
      <img className="wordmark" />         // positioned upper-centre, animated fade-in + shimmer
    </div>
  </div>
</SeedforgeHeroScene>
```

## Animations to implement

### 1. Seed Glow — Pulse
```css
@keyframes seed-glow-pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1.0); opacity: 0.6; }
  50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1.0; }
}
/* Apply: animation: seed-glow-pulse 3s ease-in-out infinite; */
```

### 2. Seed — Float
```css
@keyframes seed-float {
  0%, 100% { transform: translate(-50%, 0) translateY(0px); }
  50% { transform: translate(-50%, 0) translateY(-4px); }
}
/* Apply: animation: seed-float 3s ease-in-out infinite; */
/* IMPORTANT: sync duration with glow pulse so they breathe together */
```

### 3. Character — Idle Bounce
```css
@keyframes character-idle {
  0%, 100% { transform: translateY(0px) scaleY(1.0); }
  40% { transform: translateY(-3px) scaleY(1.015); }
  70% { transform: translateY(-1px) scaleY(1.005); }
}
/* Apply: animation: character-idle 2.5s ease-in-out infinite; */
/* transform-origin: bottom center (feet stay grounded) */
```

### 4. Particles — Procedural (JS-driven)
Create a `<ParticleField />` sub-component that:
- Maintains a pool of ~20-30 particle elements
- Each particle is one of three types: spark, spore, firefly
- **Sparks** (8-10 active): spawn near the seed position, rise upward (translateY from 0 to -200px), slight random horizontal drift (translateX ±30px), fade from opacity 1 to 0. Duration: 3-5s each. Respawn at bottom when complete.
- **Spores** (6-8 active): spawn at random positions in the mid-scene area. Drift slowly in a random direction with a gentle sine-wave horizontal motion. Very slow (6-10s per cycle). Low opacity (0.4-0.7). Fade in and out.
- **Fireflies** (4-6 active): positioned randomly across the scene. Blink on and off (opacity 0→0.8→0 over 2-4s). When they blink off, reposition to a new random location before blinking on again.
- Use `requestAnimationFrame` or CSS animations with randomised `animation-delay` and `animation-duration` for variety.
- Each particle should have slightly randomised size (0.8x to 1.2x base size) for organic feel.
- Particles should NOT spawn during the entrance sequence — start after 1.2s delay.

### 5. Wordmark — Fade In + Shimmer
```css
@keyframes wordmark-fade-in {
  0% { opacity: 0; transform: translate(-50%, 10px); }
  100% { opacity: 1; transform: translate(-50%, 0); }
}
/* Apply: animation: wordmark-fade-in 0.8s ease-out 1.5s both; */

/* Optional shimmer: a pseudo-element gradient that sweeps across */
@keyframes wordmark-shimmer {
  0% { mask-position: -200% 0; }
  100% { mask-position: 200% 0; }
}
/* Apply to a ::after overlay: animation: wordmark-shimmer 4s linear infinite; */
/* The shimmer should be very subtle — a slight brightness sweep, not a disco effect */
```

### 6. Entrance Sequence
Stagger the appearance of elements on first load:
- 0.0s: Background fades in from `#1A1A2E` (0.8s ease-out)
- 0.3s: Anvil translates up from +20px and fades in (0.6s ease-out)
- 0.6s: Seed glow scales from 0 to 1 and fades in (0.8s ease-out)
- 0.7s: Seed fades in (0.4s ease-out)
- 0.9s: Character slides in from translateX(-30px) and fades in (0.6s ease-out)
- 1.2s: Particles begin spawning (staggered naturally)
- 1.5s: Wordmark fades in via its own animation
- After all entrances complete, idle animations loop continuously

Use CSS `animation-delay` and `animation-fill-mode: both` to orchestrate. Avoid JS timers for the entrance — pure CSS is smoother and more reliable.

## Positioning

Use absolute positioning within the scene container. All elements should be placed using percentage-based positions so they scale responsively.

```
Anvil:       bottom: 15%, left: 50%, transform: translateX(-50%)
Seed glow:   bottom: 32%, left: 50%, transform: translate(-50%, 50%)
Seed:        bottom: 33%, left: 50%, transform: translateX(-50%)
Character:   bottom: 12%, left: 35%
Wordmark:    top: 15%, left: 50%, transform: translateX(-50%)
Particles:   absolute within scene-content, z-indexed between seed and wordmark
```

Adjust these values visually — they're starting points. The seed should sit naturally in the anvil's concave top. The character should stand on the ground line to the left of the anvil, looking up at the seed.

## Responsive behaviour

- **Desktop (>1024px):** Full scene, all elements visible, parallax optional
- **Tablet (768-1024px):** Scene scales down proportionally, reduce particle count to 15
- **Mobile (<768px):** Scene crops to portrait-friendly composition. Wordmark moves higher. Character and anvil+seed stack more vertically. Reduce particle count to 10. Disable parallax.
- Use a `max-height: 100vh` on the container to prevent the scene from being taller than the viewport.
- All asset sizes should use responsive units (vw-based or clamp()) rather than fixed pixel sizes.

## Parallax (optional, desktop only)

On `mousemove` over the scene container, shift layers based on mouse position relative to centre:
- Background: 0 (static anchor)
- Anvil/seed/glow: ±5px
- Character: ±8px
- Particles: ±12px
- Wordmark: ±3px

Use a `useRef` + `useCallback` with `requestAnimationFrame` throttling to keep it smooth. Apply via inline `transform` that compounds with existing CSS transforms. Add `will-change: transform` to parallax-enabled elements.

Wrap in a `prefers-reduced-motion` media query check — disable all parallax and reduce animations to simple fades for users who prefer reduced motion.

## Accessibility

- Add `role="img"` and `aria-label="Animated pixel art scene: a glowing seed rests on a stone anvil in a magical forest clearing, with a small adventurer character looking up at it in wonder"` to the scene container.
- All decorative images should have empty `alt=""` attributes.
- Respect `prefers-reduced-motion`: disable particle animation, replace bounce/float/pulse with static positioning, keep only the entrance fade-in.
- The scene should not auto-play any sound.

## Performance requirements

- All animations must use `transform` and `opacity` ONLY (compositing-only properties)
- Add `will-change: transform, opacity` to all animated elements
- Particle elements should be recycled (pool pattern), never created/destroyed during animation
- Image assets should be preloaded in a `useEffect` on mount
- Lazy-load the entire component if it's below the fold (unlikely for hero, but good practice)
- Target: 60fps on mid-range mobile device

## File output

Create these files:
```
components/
├── SeedforgeHeroScene/
│   ├── SeedforgeHeroScene.tsx       (main component)
│   ├── SeedforgeHeroScene.module.css (styles + keyframes)
│   ├── ParticleField.tsx            (particle sub-component)
│   └── index.ts                     (barrel export)
```

## Placeholder mode

Since the actual pixel art assets may not exist yet, create a placeholder mode:
- If an image fails to load, render a coloured rectangle with a label showing what asset should be there
- Background: dark green rectangle
- Anvil: grey rectangle labelled "ANVIL"
- Seed: gold circle labelled "SEED"
- Seed glow: semi-transparent gold circle
- Character: green rectangle labelled "CHARACTER"
- Wordmark: cream text "SEEDFORGE" in a monospace font
- This allows the animation and layout to be developed and tested before the art assets are ready.
````

---

*Document version: 1.0 — February 2026*
*Deliverables: 12 image assets (see prompts above) + 1 React component (see coding agent prompt)*