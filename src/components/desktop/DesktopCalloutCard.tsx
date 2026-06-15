import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { Callout } from "../../data/callouts";
import { CONTACT } from "../../data/contact";
import type { ProjectedCallout } from "../../lib/projection";
import type { ScreenPoint } from "./DesktopLeaderLines";

export type CardDimensions = {
  width: number;
  height: number;
};

type ViewportSize = {
  width: number;
  height: number;
};

type DesktopCalloutCardProps = {
  callout: Callout;
  dimensions: CardDimensions;
  isActive: boolean;
  isDimmed: boolean;
  onClick: () => void;
  position: ScreenPoint;
  projection: ProjectedCallout;
  registerRef: (element: HTMLDivElement | null) => void;
  viewport: ViewportSize;
};

export function DesktopCalloutCard({
  callout,
  dimensions,
  isActive,
  isDimmed,
  onClick,
  position,
  projection,
  registerRef,
  viewport,
}: DesktopCalloutCardProps) {
  const tilt = getCardTilt(projection, viewport, isActive);
  const activeCardClass =
    "z-50 border-white/26 bg-[radial-gradient(circle_at_50%_0%,rgba(18,58,68,0.5),rgba(2,8,18,0.98)_48%,rgba(0,0,0,0.98)_100%)] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.56),0_0_44px_rgba(34,211,238,0.12)] ring-1 ring-cyan-200/16 hover:border-[#c36a1a]/60";
  const inactiveCardClass = `z-30 border-white/16 bg-[linear-gradient(145deg,rgba(3,12,22,0.86),rgba(1,4,10,0.8))] p-5 shadow-[0_14px_38px_rgba(0,0,0,0.42),0_0_26px_rgba(34,211,238,0.06)] hover:border-[#c36a1a]/55 hover:bg-slate-950/90 hover:shadow-[0_16px_44px_rgba(0,0,0,0.48),0_0_32px_rgba(195,106,26,0.12)] ${
    isDimmed ? "brightness-75 saturate-75" : ""
  }`;

  return (
    <motion.div
      ref={registerRef}
      role="button"
      tabIndex={0}
      initial={false}
      animate={{
        height: dimensions.height,
        left: position.x,
        opacity: 1,
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        rotateZ: tilt.rotateZ,
        scale: isActive ? 1 : tilt.scale,
        scaleX: tilt.scaleX,
        skewY: tilt.skewY,
        top: position.y,
        transformPerspective: 950,
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
      className={`group pointer-events-auto absolute flex flex-col overflow-hidden rounded-lg border text-left outline-none backdrop-blur-xl transition-[border-color,background-color,box-shadow,filter] duration-200 focus-visible:border-[#c36a1a]/70 ${
        isActive ? activeCardClass : inactiveCardClass
      }`}
      style={{ transformStyle: "preserve-3d" }}
      aria-pressed={isActive}
    >
      {isActive ? (
        <motion.div
          className="flex min-h-0 flex-1 flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22, duration: 0.2, ease: "easeOut" }}
        >
          <span className="mx-auto mb-4 block h-px w-16 bg-gradient-to-r from-transparent via-[#a9652c]/70 to-transparent" />
          <h2 className="mx-auto block max-w-full rounded-md bg-white/[0.035] px-2 py-0.5 text-center text-[21px] font-semibold leading-7 tracking-[0.01em] text-[#b06a32] shadow-[0_0_18px_rgba(255,255,255,0.06),0_0_26px_rgba(195,106,26,0.07)]">
            {callout.title}
          </h2>
          <p className="mt-2.5 min-h-0 flex-1 overflow-y-auto pr-2 text-sm leading-6 text-cyan-50/68">
            {callout.description}
          </p>
          <a
            className="mx-auto mt-6 inline-flex w-fit items-center justify-center gap-3 rounded-lg border border-emerald-300/40 bg-emerald-400/14 px-6 py-3.5 text-base font-semibold text-emerald-100 transition hover:border-emerald-200/75 hover:bg-emerald-400/22"
            href={CONTACT.whatsappUrl}
            onClick={(event) => event.stopPropagation()}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Şimdi Teklif Al
          </a>
        </motion.div>
      ) : (
        <>
          <span className="mx-auto mb-4 block h-px w-14 bg-gradient-to-r from-transparent via-[#a9652c]/65 to-transparent" />
          <span
            className="mx-auto max-w-full rounded-md bg-white/[0.03] px-2 py-0.5 text-center text-[15px] font-semibold leading-6 tracking-[0.01em] text-[#a9652c] shadow-[0_0_14px_rgba(255,255,255,0.055),0_0_20px_rgba(195,106,26,0.055)]"
            style={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {callout.title}
          </span>
          <span
            className="mt-2.5 text-sm leading-6 text-cyan-50/68"
            style={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
          >
            {callout.description}
          </span>
        </>
      )}
    </motion.div>
  );
}

function getCardTilt(
  projection: ProjectedCallout,
  viewport: ViewportSize,
  isActive: boolean,
) {
  if (isActive) {
    return { rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, scaleX: 1, skewY: 0 };
  }

  const centerOffsetX = (projection.x - viewport.width / 2) / viewport.width;
  const yawDegrees = radiansToDegrees(projection.yaw);
  const pitchDegrees = radiansToDegrees(projection.pitch);

  return {
    rotateX: clamp(-pitchDegrees * 0.3, -3.4, 3.4),
    rotateY: clamp(yawDegrees * 0.32 + centerOffsetX * 0.5, -6, 6),
    rotateZ: clamp(-yawDegrees * 0.04 + pitchDegrees * 0.025, -1, 1),
    scale: 1 + Math.abs(yawDegrees) * 0.0005,
    scaleX: 1 - Math.abs(yawDegrees) * 0.0008,
    skewY: clamp(yawDegrees * 0.025, -0.75, 0.75),
  };
}

function radiansToDegrees(value: number) {
  return (value * 180) / Math.PI;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
