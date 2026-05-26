# IMPLEMENTATION_ARCHITECTURE.md

## Recommended Component Tree

src/
├─ App.tsx
├─ main.tsx
├─ index.css
├─ data/
│  └─ callouts.ts
├─ components/
│  ├─ BrandChrome.tsx
│  ├─ SceneRoot.tsx
│  ├─ ACModel.tsx
│  ├─ CalloutOverlay.tsx
│  ├─ CalloutCard.tsx
│  └─ SvgLeaderLines.tsx
└─ lib/
   ├─ clampRotation.ts
   ├─ projection.ts
   └─ webgl.ts

## App Structure

App.tsx:
- fixed 100vw 100dvh root
- background layers
- BrandChrome
- SceneRoot
- CalloutOverlay

SceneRoot:
- Canvas
- OrthographicCamera
- lights
- ACModel group
- tracks model group ref
- tracks constrained rotation
- publishes projected anchor coordinates to parent or store

ACModel:
- loads /models/split-ac-indoor.glb
- fallback placeholder if missing
- group ref used for anchor projection

CalloutOverlay:
- full-screen absolute layer
- receives projected anchor positions
- positions cards
- handles activeCalloutId

SvgLeaderLines:
- full-screen SVG
- connects anchor screen positions to card anchor points

## Rotation Logic

Pointer delta:
- dx affects yaw
- dy affects pitch

Limits:
- yaw = clamp(yaw + dx * sensitivity, degToRad(-20), degToRad(20))
- pitch = clamp(pitch + dy * sensitivity, degToRad(-10), degToRad(10))

Never mutate camera orbit freely.

## Projection Logic

Given:
- localAnchor Vector3
- modelGroupRef
- camera
- canvas size

Steps:
1. localAnchor.clone()
2. modelGroupRef.current.localToWorld(point)
3. point.project(camera)
4. x = (point.x * 0.5 + 0.5) * width
5. y = (-point.y * 0.5 + 0.5) * height

Return screen position.

## Important

The callout card is not at the same x/y as the anchor.
The anchor x/y is the start of the leader line.
The card x/y should be offset from the anchor according to preferredSide and clamped within viewport.
