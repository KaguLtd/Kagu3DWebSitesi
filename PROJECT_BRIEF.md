# Kagu Ltd. 3D Fixed Viewport Website - Project Brief

## Core Intent

This is NOT a normal scrolling landing page.

Build a single-screen, fixed-viewport, premium 3D product interface for Kagu Ltd.

The website must fill the browser window and must not scroll vertically or horizontally. The entire experience is a single static viewport containing:

1. A large, centered 3D wall-mounted split air conditioner indoor unit.
2. Limited user-controlled rotation:
   - vertical tilt: maximum +/- 10 degrees
   - horizontal turn: maximum +/- 20 degrees
3. 2D informational callout boxes connected to specific points on the 3D model by arrows/leader lines.
4. These 2D boxes must be screen-space HTML overlays whose positions are calculated from the 3D model's projected points.
5. The callout boxes must visually follow the 3D model while it rotates.
6. Clicking a callout box brings it to the front, locks/pins it in a readable foreground state, and makes the text area clearly readable.
7. No extra sections, no services grid, no footer, no conventional landing page blocks, no scrollable content.

## Brand

Company: Kagu Ltd.
Phone / WhatsApp: 548 848 52 48
Email: info@kagultd.com
Region: KKTC
Brands: Daikin, GREE, AUX
Social:
- facebook.com/kagultd
- instagram.com/kagultd

## Visual Direction

Minimal, futuristic, luxury/premium, technical, calm, dark, high-end.

Use Kagu-compatible palette:
- background: deep black / deep navy
- accent: cold blue / cyan
- text: white / pale blue-gray
- glass panels: translucent dark navy
- arrows: subtle cyan glow
- shadows: soft contact shadow under the AC unit
- reflections: subtle, not exaggerated

No crowded layout. No marketing blocks. No stock graphics.

## Technical Stack

Use:
- React
- Vite
- TypeScript
- Three.js
- @react-three/fiber
- @react-three/drei
- Tailwind CSS
- Framer Motion only if useful for subtle UI motion

Avoid:
- conventional page sections
- long scroll animations
- GSAP unless strictly necessary
- embedded text inside WebGL for company information

## Asset Rules

Final logo path:
public/logo.svg or public/logo.png

Final 3D model path:
public/models/split-ac-indoor.glb

The project may initially use a placeholder 3D object only if the GLB is missing, but the code must be ready for the real GLB model.

Raw source folders may exist locally:
Logo/
3D Model/

But the application must load public-facing assets from:
public/

## Required Viewport Rules

CSS must enforce:

html, body, #root {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

App container:
- width: 100vw
- height: 100dvh
- overflow: hidden
- no page scrolling

The page must not create vertical overflow at any desktop or mobile viewport.

## 3D Scene Requirements

The 3D AC unit must be:
- centered in the viewport
- scaled to occupy a large part of the screen
- responsive to viewport size
- visually grounded with subtle shadow
- lit with premium soft lighting
- always kept inside frame

Camera:
- orthographic camera preferred for premium controlled product look
- perspective camera acceptable only if model framing is stable
- model must not drift off-center

Interaction:
- Do not use unrestricted OrbitControls.
- Do not allow full 360-degree rotation.
- Implement custom pointer drag rotation or configured controls with strict constraints.

Rotation limits:
- x axis / vertical tilt: +/- 10 degrees
- y axis / horizontal rotation: +/- 20 degrees
- z axis: locked at 0 degrees

Behavior:
- Pointer drag rotates model within limits.
- On pointer release, keep current rotation or ease back slightly depending on implementation.
- Avoid uncontrolled spinning.
- Optional: gentle idle floating/lighting motion, but not full rotation.

## Callout Requirements

There must be several callout anchors attached to the AC unit.

Each callout has:
- id
- anchor: [x, y, z] local position near the model
- title placeholder
- description placeholder
- preferredSide
- isActive state

Important:
- The title and description must be placeholder text for now.
- The structure must make it easy for Ahmet to replace the copy later.

Callout boxes:
- rendered as regular HTML, not Canvas text
- connected to projected 3D anchor coordinates via SVG or absolutely positioned leader lines
- move with the 3D model because their anchor points are recalculated as model rotation changes
- clickable
- clicked box moves to front, becomes visually prominent and readable
- inactive boxes stay subtle but visible

Implementation approach:
1. Define 3D anchor points in model local space.
2. On each frame or on rotation change, transform local anchor points by the model matrix.
3. Project the resulting world coordinates into screen coordinates using camera.project().
4. Position HTML callout cards using CSS transform translate().
5. Draw leader lines/arrows in an SVG overlay using the projected anchor and card positions.
6. Use z-index and active state to foreground selected card.

Mobile:
- still fixed viewport
- keep AC large and centered
- reduce number of visible callouts if needed
- active card may appear as a bottom glass panel
- no vertical page scroll

## Acceptance Criteria

- npm run build completes successfully.
- Page has no vertical or horizontal scrolling.
- The AC model is centered and large.
- Dragging the model is limited to +/-10deg vertical and +/-20deg horizontal.
- Model cannot rotate freely.
- Callout boxes are HTML overlays.
- Callout boxes track 3D anchor positions as the model rotates.
- Clicking a callout foregrounds and pins it.
- No conventional landing page sections exist.
- Visual output feels premium, futuristic and minimal.
