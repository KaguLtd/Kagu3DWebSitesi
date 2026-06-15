import { useEffect, useMemo, useRef, useState } from "react";
import { callouts, type Callout } from "../data/callouts";
import type { ProjectedCallout } from "../lib/projection";
import {
  DesktopCalloutCard,
  type CardDimensions,
} from "./desktop/DesktopCalloutCard";
import {
  DesktopLeaderLines,
  type ConnectorPath,
  type ScreenPoint,
} from "./desktop/DesktopLeaderLines";

const MAX_CARD_WIDTH = 300;
const MAX_CARD_HEIGHT = 200;
const ACTIVE_CARD_WIDTH = 680;
const ACTIVE_CARD_HEIGHT = 500;
const MIN_CARD_WIDTH = 160;
const MIN_CARD_HEIGHT = 108;
const EDGE_MARGIN = 16;
const SIDE_OFFSET = 104;
const STACK_GAP = 24;
const DESIGN_VIEWPORT = {
  width: 1920,
  height: 953,
};

type CalloutOverlayProps = {
  activeCalloutId: string | null;
  onActiveCalloutChange: (id: string | null) => void;
  projectedCallouts: ProjectedCallout[];
};

export function CalloutOverlay({
  activeCalloutId,
  onActiveCalloutChange,
  projectedCallouts,
}: CalloutOverlayProps) {
  const viewport = useViewportSize();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const lockedOffsets = useRef<Map<string, ScreenPoint>>(new Map());
  const [connectorPaths, setConnectorPaths] = useState<ConnectorPath[]>([]);
  const projectedById = useMemo(
    () =>
      new Map(projectedCallouts.map((projection) => [projection.id, projection])),
    [projectedCallouts],
  );

  useEffect(() => {
    if (!activeCalloutId) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onActiveCalloutChange(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCalloutId, onActiveCalloutChange]);

  useEffect(() => {
    lockedOffsets.current.clear();
  }, [viewport.width, viewport.height]);

  useEffect(() => {
    let frame = 0;
    let lastKey = "";
    let stableFrames = 0;
    const startedAt = performance.now();

    const measure = () => {
      const overlay = overlayRef.current;
      if (!overlay) {
        frame = requestAnimationFrame(measure);
        return;
      }

      const overlayRect = overlay.getBoundingClientRect();
      const projectedByCalloutId = new Map(
        projectedCallouts.map((projection) => [projection.id, projection]),
      );

      const nextPaths = callouts
        .map((callout) => {
          const projection = projectedByCalloutId.get(callout.id);
          const card = cardRefs.current.get(callout.id);

          if (!projection?.visible || !card) {
            return null;
          }

          const cardRect = card.getBoundingClientRect();
          const cardPosition = {
            x: cardRect.left - overlayRect.left,
            y: cardRect.top - overlayRect.top,
          };
          const cardDimensions = {
            width: cardRect.width,
            height: cardRect.height,
          };
          const lineEnd = getLineEnd(callout, cardPosition, cardDimensions);

          return {
            d: getConnectorPath(projection, lineEnd),
            id: callout.id,
            isActive: activeCalloutId === callout.id,
            lineEnd,
            projection,
          };
        })
        .filter((path): path is ConnectorPath => path !== null);

      const nextKey = nextPaths
        .map(
          (path) =>
            `${path.id}:${Math.round(path.projection.x)}:${Math.round(
              path.projection.y,
            )}:${Math.round(path.lineEnd.x)}:${Math.round(path.lineEnd.y)}:${
              path.isActive
            }`,
        )
        .join("|");

      if (nextKey !== lastKey) {
        lastKey = nextKey;
        stableFrames = 0;
        setConnectorPaths(nextPaths);
      } else {
        stableFrames += 1;
      }

      if (stableFrames < 8 && performance.now() - startedAt < 1200) {
        frame = requestAnimationFrame(measure);
      }
    };

    frame = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(frame);
  }, [
    activeCalloutId,
    projectedCallouts,
    viewport.height,
    viewport.width,
  ]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
    >
      <DesktopLeaderLines
        connectorPaths={connectorPaths}
        hasActiveCallout={activeCalloutId !== null}
      />
      {callouts.map((callout, index) => {
        const projection = projectedById.get(callout.id);
        if (!projection?.visible) {
          return null;
        }

        const isActive = activeCalloutId === callout.id;
        const cardDimensions = getCardDimensions(viewport, isActive);

        return (
          <DesktopCalloutCard
            key={callout.id}
            callout={callout}
            dimensions={cardDimensions}
            position={getCardPosition(
              callout,
              projection,
              index,
              viewport,
              lockedOffsets.current,
              isActive,
            )}
            projection={projection}
            viewport={viewport}
            registerRef={(element) => {
              if (element) {
                cardRefs.current.set(callout.id, element);
              } else {
                cardRefs.current.delete(callout.id);
              }
            }}
            isActive={isActive}
            isDimmed={activeCalloutId !== null && !isActive}
            onClick={() => onActiveCalloutChange(isActive ? null : callout.id)}
          />
        );
      })}
    </div>
  );
}

type ViewportSize = {
  width: number;
  height: number;
};

function useViewportSize() {
  const [viewport, setViewport] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));

  useEffect(() => {
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewport;
}

function getCardPosition(
  callout: Callout,
  projection: ProjectedCallout,
  index: number,
  viewport: ViewportSize,
  lockedOffsets: Map<string, ScreenPoint>,
  isActive: boolean,
): ScreenPoint {
  const stackOffset = (index % 3) * STACK_GAP - STACK_GAP;
  const narrow = viewport.width < 720;
  const { width: cardWidth, height: cardHeight } = getCardDimensions(
    viewport,
    isActive,
  );
  const scaleX = viewport.width / DESIGN_VIEWPORT.width;
  const scaleY = viewport.height / DESIGN_VIEWPORT.height;

  let x = projection.x - cardWidth / 2;
  let y = projection.y - cardHeight / 2;

  if (isActive) {
    x = viewport.width / 2 - cardWidth / 2;
    y = viewport.height / 2 - cardHeight / 2 + 12;
  } else if (callout.screenPosition) {
    let offset = lockedOffsets.get(callout.id);

    if (!offset) {
      const desiredCenter = {
        x: callout.screenPosition[0] * scaleX,
        y: callout.screenPosition[1] * scaleY,
      };

      offset = {
        x: desiredCenter.x - projection.x,
        y: desiredCenter.y - projection.y,
      };
      lockedOffsets.set(callout.id, offset);
    }

    x = projection.x + offset.x - cardWidth / 2;
    y = projection.y + offset.y - cardHeight / 2;
  } else if (callout.screenOffset) {
    x = projection.x + callout.screenOffset[0] * scaleX - cardWidth / 2;
    y = projection.y + callout.screenOffset[1] * scaleY - cardHeight / 2;
  } else if (narrow) {
    const sideShift = callout.preferredSide === "left" ? -72 : 72;
    x = projection.x + sideShift - cardWidth / 2;
    y =
      projection.y +
      (callout.preferredSide === "top" ? -132 : 82) +
      stackOffset;
  } else if (callout.preferredSide === "left") {
    x = projection.x - SIDE_OFFSET - cardWidth;
    y = projection.y - cardHeight / 2 + stackOffset;
  } else if (callout.preferredSide === "right") {
    x = projection.x + SIDE_OFFSET;
    y = projection.y - cardHeight / 2 + stackOffset;
  } else if (callout.preferredSide === "top") {
    x = projection.x - cardWidth / 2;
    y = projection.y - SIDE_OFFSET - cardHeight;
  } else {
    x = projection.x - cardWidth / 2;
    y = projection.y + SIDE_OFFSET;
  }

  return {
    x: clamp(x, EDGE_MARGIN, viewport.width - cardWidth - EDGE_MARGIN),
    y: clamp(y, EDGE_MARGIN + 72, viewport.height - cardHeight - EDGE_MARGIN),
  };
}

function getLineEnd(
  callout: Callout,
  position: ScreenPoint,
  cardDimensions: CardDimensions,
): ScreenPoint {
  if (callout.preferredSide === "left") {
    return {
      x: position.x + cardDimensions.width,
      y: position.y + cardDimensions.height / 2,
    };
  }

  if (callout.preferredSide === "right") {
    return { x: position.x, y: position.y + cardDimensions.height / 2 };
  }

  if (callout.preferredSide === "top") {
    return {
      x: position.x + cardDimensions.width / 2,
      y: position.y + cardDimensions.height,
    };
  }

  return { x: position.x + cardDimensions.width / 2, y: position.y };
}

function getConnectorPath(start: ScreenPoint, end: ScreenPoint) {
  const bendX = start.x + (end.x - start.x) * 0.58;
  const bendY = start.y + (end.y - start.y) * 0.18;

  return `M ${start.x} ${start.y} C ${bendX} ${start.y}, ${bendX} ${bendY}, ${end.x} ${end.y}`;
}

function getCardDimensions(
  viewport: ViewportSize,
  isActive = false,
): CardDimensions {
  if (isActive) {
    return {
      width: clamp(
        ACTIVE_CARD_WIDTH,
        MIN_CARD_WIDTH,
        viewport.width - EDGE_MARGIN * 2,
      ),
      height: clamp(ACTIVE_CARD_HEIGHT, MIN_CARD_HEIGHT, viewport.height - 180),
    };
  }

  return {
    width: clamp(
      Math.min(MAX_CARD_WIDTH, viewport.width * 0.22, viewport.height * 0.315),
      MIN_CARD_WIDTH,
      Math.min(MAX_CARD_WIDTH, viewport.width - EDGE_MARGIN * 2),
    ),
    height: clamp(
      Math.min(MAX_CARD_HEIGHT, viewport.width * 0.147, viewport.height * 0.21),
      MIN_CARD_HEIGHT,
      Math.min(MAX_CARD_HEIGHT, viewport.height - EDGE_MARGIN * 2),
    ),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
