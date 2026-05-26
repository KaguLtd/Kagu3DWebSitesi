# CODEX_TASKS.md - Corrected Task Sequence

## Task 1 - Build the fixed viewport shell

Prompt:

Create the project as a single fixed-viewport 3D interface, not a scrolling landing page.

Requirements:
1. React + Vite + TypeScript.
2. Tailwind CSS.
3. Install three, @react-three/fiber, @react-three/drei, framer-motion, lucide-react.
4. App must fill 100vw x 100dvh.
5. html, body and #root must have width 100%, height 100%, overflow hidden.
6. No footer, no long sections, no normal landing page.
7. Create a dark premium background with subtle gradients/noise.
8. Add a small Kagu Ltd. brand mark top-left and compact contact actions top-right.
9. Create a centered scene area for the 3D AC unit.
10. Run npm run build and fix errors.

Do not add service sections, process sections, or scroll content.

---

## Task 2 - Implement constrained 3D AC model

Prompt:

Implement the 3D AC model scene.

Requirements:
1. Use React Three Fiber.
2. Load model from public/models/split-ac-indoor.glb.
3. If model is missing, show a clean placeholder object and a non-intrusive developer warning.
4. The AC must be centered in the viewport.
5. The model must be large and responsive to screen size.
6. Use soft premium lighting and shadow.
7. Prefer OrthographicCamera for stable product framing.
8. Implement custom pointer drag rotation:
   - yaw / y-axis: -20deg to +20deg
   - pitch / x-axis: -10deg to +10deg
   - roll / z-axis: 0
9. Do not allow 360-degree orbiting.
10. Do not allow zooming/panning.
11. Keep the AC centered while rotating.
12. Run npm run build.

---

## Task 3 - Add callout data and placeholder cards

Prompt:

Add the callout data and placeholder HTML cards.

Requirements:
1. Create src/data/callouts.ts.
2. Define 6 callouts with:
   - id
   - title placeholder
   - description placeholder
   - localAnchor: [number, number, number]
   - preferredSide
3. Use placeholder Turkish text only:
   - title: Başlık
   - description: Açıklama metni sonradan girilecek.
4. Render callout cards as HTML overlay, not Canvas text.
5. Cards should be glassmorphism style with premium cyan accents.
6. Cards must be easy to edit later.
7. Run npm run build.

---

## Task 4 - Project 3D anchors to 2D screen space

Prompt:

Implement 3D-to-2D projection for callout anchors.

Requirements:
1. For each callout localAnchor:
   - convert local model point to world coordinate using the model group matrix
   - project world coordinate into normalized device coordinates with camera.project()
   - convert NDC to screen pixel x/y
2. Expose the projected positions to the HTML overlay.
3. Recalculate positions when model rotation changes.
4. Leader lines/arrows must originate from the projected anchor point.
5. The callout cards must visually track model movement as the model rotates.
6. Keep everything inside the fixed viewport.
7. Run npm run build.

---

## Task 5 - Draw SVG leader lines/arrows

Prompt:

Draw SVG leader lines connecting projected 3D anchor points to HTML callout boxes.

Requirements:
1. Add a full-screen pointer-events-none SVG overlay.
2. For each visible callout, draw a subtle cyan glowing line.
3. Add a small dot at the projected 3D anchor point.
4. Add arrow/connector styling toward the card.
5. Lines must update as the model rotates.
6. Lines should not cover text heavily.
7. Inactive lines are subtle; active line is brighter.
8. Run npm run build.

---

## Task 6 - Active callout behavior

Prompt:

Implement click-to-focus behavior for callout boxes.

Requirements:
1. Clicking a card sets it as active.
2. Active card comes to foreground.
3. Active card is larger or clearer.
4. Non-active cards become slightly dimmed.
5. Clicking the background or another card changes active state.
6. The active card remains readable while model is rotated.
7. Do not create a new page or scroll area.
8. Run npm run build.

---

## Task 7 - Responsive fixed viewport refinement

Prompt:

Refine the fixed viewport responsive behavior.

Requirements:
1. Test at 375px, 430px, 768px, 1024px, 1440px.
2. No vertical scrollbar.
3. No horizontal scrollbar.
4. AC remains centered and large.
5. On mobile, callout boxes may compress or active card can appear near bottom, but page must still not scroll.
6. Touch dragging must respect rotation limits.
7. Run npm run build.

---

## Task 8 - Polish visual quality

Prompt:

Polish the visual design to feel premium, futuristic and minimal.

Requirements:
1. Improve lighting, shadows, background gradients.
2. Add subtle glow behind the AC.
3. Add glassmorphism styling to cards.
4. Add small Kagu Ltd. top-left identity.
5. Add compact WhatsApp/contact action without creating a full navbar.
6. Avoid generic SaaS/landing-page look.
7. Keep the page fixed and non-scrollable.
8. Run npm run build.
