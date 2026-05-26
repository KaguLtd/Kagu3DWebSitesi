# AGENTS.md - Codex Instructions for Kagu3DWebSitesi

## Absolute Product Requirements

This is a single-screen 3D interface, not a scrollable landing page.

Never add:
- footer
- services section
- long page sections
- scroll-based layout
- vertical page content
- multi-section marketing page

The final UI must fit inside one viewport:
- 100vw
- 100dvh
- overflow hidden

The website is essentially an interactive 3D hero scene.

## Coding Rules

Use:
- React + Vite + TypeScript
- @react-three/fiber
- @react-three/drei
- Tailwind CSS
- Three.js math utilities where needed

Keep the implementation modular:
- src/App.tsx
- src/components/SceneRoot.tsx
- src/components/ACModel.tsx
- src/components/CalloutOverlay.tsx
- src/data/callouts.ts
- src/lib/projection.ts
- src/lib/clampRotation.ts

## 3D Rotation Rules

Do NOT use unrestricted OrbitControls.

The AC unit must have custom constrained rotation:
- horizontal/yaw: -20deg to +20deg
- vertical/pitch: -10deg to +10deg
- roll: 0deg

If using OrbitControls, hard-limit polar/azimuth and disable zoom/pan. But custom pointer drag is preferred.

The model must remain visually centered.

## Callout System Rules

The callout cards must be HTML overlays.

Do not put company text into 3D Text objects.

Callouts must be driven by projected 3D points:
- local anchor point
- model matrix
- world position
- camera projection
- screen x/y
- SVG leader line
- absolute-positioned HTML card

Each callout must have placeholder copy:
- title: Başlık
- description: Açıklama metni sonradan girilecek.

Ahmet will replace texts later.

## Active Callout Behavior

When a user clicks a callout:
- set activeCalloutId
- bring that card to foreground with high z-index
- enlarge or clarify the card
- dim non-active callouts slightly
- keep the card readable
- do not navigate away
- do not open a modal that breaks the fixed scene unless necessary

## Styling

Visual target:
- premium
- futuristic
- minimal
- dark
- glassmorphism
- cyan/blue accents
- subtle glow
- high contrast readable cards

Avoid:
- generic SaaS templates
- busy grids
- excessive copy
- bright unrelated colors

## Build Discipline

After each task:
- run npm run build
- fix TypeScript errors
- ensure no scrollbars are visible

If a requirement conflicts with conventional landing page behavior, prioritize the fixed 3D viewport requirement.
