# SVG Hero Implementation

- The hero is a fixed `100vw × 100dvh` experience; wheel and touch gestures update a virtual progress value instead of creating page scroll.
- `AcIllustration.tsx` contains a detailed split AC as semantic SVG groups: front shell, rear casing, twin filters, finned evaporator, cross-flow blower, motor, control board, drain tray, louvers, and pipework. No WebGL, Three.js, or model file is loaded.
- `AcBlueprintHero.tsx` maps progress to a paused Anime.js timeline with `seek()`. Scroll is split into six readable chapters, and small service parts stay attached to five macro assemblies instead of scattering independently. A separate wrapper supplies whole-assembly perspective; pointer movement is interpolated in one `requestAnimationFrame` loop for parallax.
- The exploded view stays visually clean and does not render floating callout cards or leader-line boxes.
- Mobile uses shorter separation distances and no pointer parallax. Reduced-motion users receive the assembled static illustration.
- The old React Three Fiber scene, 3D dependencies, runtime model, and runtime texture files were removed.
