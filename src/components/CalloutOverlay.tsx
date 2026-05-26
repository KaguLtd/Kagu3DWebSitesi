import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { callouts, type Callout } from "../data/callouts";
import type { ProjectedCallout } from "../lib/projection";

const MAX_CARD_WIDTH = 300;
const MAX_CARD_HEIGHT = 200;
const ACTIVE_CARD_WIDTH = 680;
const ACTIVE_CARD_HEIGHT = 500;
const MIN_CARD_WIDTH = 160;
const MIN_CARD_HEIGHT = 108;
const EDGE_MARGIN = 16;
const SIDE_OFFSET = 104;
const STACK_GAP = 24;
const WHATSAPP_URL =
  "https://wa.me/905488485248?text=Merhaba%2C%20Kagu%20Ltd.%27den%20teklif%20almak%20istiyorum.";
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
  const lockedOffsets = useRef<Map<string, ScreenPoint>>(new Map());
  const projectedById = new Map(
    projectedCallouts.map((projection) => [projection.id, projection]),
  );

  useEffect(() => {
    lockedOffsets.current.clear();
  }, [viewport.width, viewport.height]);

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <filter
            id="callout-line-glow"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker
            id="callout-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill="rgba(78, 231, 255, 0.72)" />
          </marker>
          <marker
            id="callout-arrow-active"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill="rgba(180, 246, 255, 0.96)" />
          </marker>
        </defs>
        {callouts.map((callout, index) => {
          const projection = projectedById.get(callout.id);
          if (!projection?.visible) {
            return null;
          }

          const isActive = activeCalloutId === callout.id;
          const hasActive = activeCalloutId !== null;
          const cardPosition = getCardPosition(
            callout,
            projection,
            index,
            viewport,
            lockedOffsets.current,
            isActive,
          );
          const cardDimensions = getCardDimensions(viewport, isActive);
          const lineEnd = getLineEnd(callout, cardPosition, cardDimensions);
          const connectorPath = getConnectorPath(projection, lineEnd);

          return (
            <g
              key={callout.id}
              opacity={hasActive && !isActive ? 0.58 : 1}
              filter={isActive ? "url(#callout-line-glow)" : undefined}
            >
              <path
                d={connectorPath}
                fill="none"
                markerEnd={isActive ? "url(#callout-arrow-active)" : "url(#callout-arrow)"}
                stroke={
                  isActive
                    ? "rgba(150, 242, 255, 0.72)"
                    : "rgba(78, 231, 255, 0.28)"
                }
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={isActive ? 1.45 : 0.9}
                vectorEffect="non-scaling-stroke"
              />
              <circle
                cx={lineEnd.x}
                cy={lineEnd.y}
                r={isActive ? 2.8 : 2}
                fill={
                  isActive
                    ? "rgba(180, 246, 255, 0.78)"
                    : "rgba(78, 231, 255, 0.38)"
                }
              />
              <circle
                cx={projection.x}
                cy={projection.y}
                r={isActive ? 4.5 : 3.2}
                fill="rgba(78, 231, 255, 0.72)"
              />
            </g>
          );
        })}
      </svg>
      {callouts.map((callout, index) => {
        const projection = projectedById.get(callout.id);
        if (!projection?.visible) {
          return null;
        }

        const isActive = activeCalloutId === callout.id;
        const hasActive = activeCalloutId !== null;
        const cardPosition = getCardPosition(
          callout,
          projection,
          index,
          viewport,
          lockedOffsets.current,
          isActive,
        );
        const cardDimensions = getCardDimensions(viewport, isActive);

        return (
          <CalloutCard
            key={callout.id}
            callout={callout}
            dimensions={cardDimensions}
            position={cardPosition}
            isActive={isActive}
            isDimmed={hasActive && !isActive}
            onClick={() => onActiveCalloutChange(isActive ? null : callout.id)}
          />
        );
      })}
    </div>
  );
}

type CalloutCardProps = {
  callout: Callout;
  dimensions: CardDimensions;
  position: ScreenPoint;
  isActive: boolean;
  isDimmed: boolean;
  onClick: () => void;
};

function CalloutCard({
  callout,
  dimensions,
  position,
  isActive,
  isDimmed,
  onClick,
}: CalloutCardProps) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      initial={false}
      animate={{
        height: dimensions.height,
        left: position.x,
        opacity: 1,
        scale: 1,
        top: position.y,
        width: dimensions.width,
      }}
      transition={{
        default: { damping: 30, mass: 0.95, stiffness: 190, type: "spring" },
      }}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      className={`pointer-events-auto absolute flex flex-col overflow-hidden rounded-lg border text-left outline-none backdrop-blur-xl transition-[border-color,background-color,box-shadow,filter] duration-200 focus-visible:border-cyan-200/70 ${
        isActive
          ? "z-50 border-cyan-100/55 bg-[radial-gradient(circle_at_50%_0%,rgba(15,38,46,0.42),rgba(2,6,12,0.98)_48%,rgba(0,0,0,0.99)_100%)] p-7 shadow-[0_18px_55px_rgba(0,0,0,0.46)] ring-1 ring-cyan-200/18"
          : `z-30 border-cyan-200/14 bg-slate-950/58 p-5 shadow-[0_10px_28px_rgba(0,0,0,0.34)] hover:border-cyan-200/28 hover:bg-slate-950/70 ${
              isDimmed ? "brightness-75 saturate-75" : ""
            }`
      }`}
      aria-pressed={isActive}
    >
      {isActive ? (
        <motion.div
          className="flex min-h-0 flex-1 flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22, duration: 0.2, ease: "easeOut" }}
        >
          <span className="mb-4 block h-px w-14 bg-gradient-to-r from-kagu-cyan to-transparent" />
          <span className="block text-xl font-semibold leading-7 text-cyan-50">
            {callout.title}
          </span>
          <span className="mt-2.5 block min-h-0 flex-1 overflow-y-auto pr-2 text-sm leading-6 text-cyan-50/68">
            {callout.description}
          </span>
          <a
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-300/35 bg-emerald-400/12 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:border-emerald-200/70 hover:bg-emerald-400/20"
            href={WHATSAPP_URL}
            onClick={(event) => {
              event.stopPropagation();
            }}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Şimdi Teklif Al
          </a>
        </motion.div>
      ) : (
        <>
          <span className="mb-4 block h-px w-14 bg-gradient-to-r from-kagu-cyan to-transparent" />
          <span className="block text-base font-semibold leading-6 text-cyan-50">
            {callout.title}
          </span>
          <span className="mt-2.5 block max-h-[72px] overflow-hidden text-sm leading-6 text-cyan-50/68">
            {callout.description}
          </span>
        </>
      )}
    </motion.div>
  );
}

type ScreenPoint = {
  x: number;
  y: number;
};

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
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
    y = projection.y + (callout.preferredSide === "top" ? -132 : 82) + stackOffset;
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
  const horizontalDistance = end.x - start.x;
  const bendX = start.x + horizontalDistance * 0.58;
  const bendY = start.y + (end.y - start.y) * 0.18;

  return `M ${start.x} ${start.y} C ${bendX} ${start.y}, ${bendX} ${bendY}, ${end.x} ${end.y}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

type CardDimensions = {
  width: number;
  height: number;
};

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
      height: clamp(
        ACTIVE_CARD_HEIGHT,
        MIN_CARD_HEIGHT,
        viewport.height - 180,
      ),
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
