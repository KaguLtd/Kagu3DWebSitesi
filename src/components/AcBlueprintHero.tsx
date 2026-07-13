import { useEffect, useRef, useState, type CSSProperties } from "react";
import { animate, createTimeline } from "animejs";
import { AcIllustration } from "./AcIllustration";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const CHAPTERS = [
  { at: 0, label: "Anasayfa" },
  { at: 14, label: "Klima sistemleri" },
  { at: 28, label: "Isı pompası & sıcak su" },
  { at: 42, label: "Radyatör & yerden ısıtma" },
  { at: 54, label: "Havalandırma sistemleri" },
  { at: 66, label: "Solar enerji sistemleri" },
  { at: 78, label: "Arıtma, havuz & pompa" },
  { at: 90, label: "Hakkımızda" },
];

type AcBlueprintHeroProps = {
  onStageChange?: (stageIndex: number) => void;
};

export function AcBlueprintHero({ onStageChange }: AcBlueprintHeroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<ReturnType<typeof createTimeline> | null>(null);
  const progressRef = useRef({ current: 0, target: 0 });
  const pointerRef = useRef({ currentX: 0, currentY: 0, x: 0, y: 0 });
  const touchYRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const part = (selector: string): Element => {
      const element = root.querySelector(selector);
      if (!element) {
        throw new Error(`AC animation target not found: ${selector}`);
      }
      return element;
    };

    const intro = animate(root, {
      opacity: { from: 0, to: 1 },
      y: { from: 14, to: 0 },
      delay: 120,
      duration: reducedMotion ? 1 : 650,
      ease: "out(4)",
    });

    // The timeline deliberately opens the unit in readable chapters. Small
    // service parts stay with their parent module instead of flying away.
    const timeline = createTimeline({
      autoplay: false,
      defaults: { ease: "inOut(3)" },
    })
      .add(part(".ac-orbit"), {
        rotateX: mobile ? 2 : 5,
        rotateY: mobile ? -5 : -12,
        scale: mobile ? 0.92 : 0.86,
        duration: 700,
      }, 0)
      .add(part("#ac-mounting-rail"), {
        translateX: mobile ? -38 : -88,
        translateZ: mobile ? -34 : -110,
        rotateY: mobile ? -10 : -28,
        opacity: 0.58,
        duration: 720,
      }, 240)
      .add(part("#ac-backplate"), {
        translateX: mobile ? -24 : -58,
        translateZ: mobile ? -26 : -82,
        rotateY: mobile ? -8 : -22,
        opacity: 0.66,
        duration: 720,
      }, 260)
      .add(part("#ac-body"), {
        translateX: mobile ? -8 : -22,
        translateZ: mobile ? -12 : -38,
        rotateY: mobile ? -3 : -9,
        opacity: 0.86,
        duration: 700,
      }, 300)
      .add(part("#ac-front-cover"), {
        translateX: mobile ? -10 : -28,
        translateY: mobile ? -46 : -94,
        translateZ: mobile ? 32 : 104,
        rotateX: mobile ? -12 : -28,
        rotateY: mobile ? -5 : -14,
        rotateZ: mobile ? -1 : -3,
        opacity: 0.96,
        duration: 680,
      }, 380)
      .add(part("#ac-intake-frame"), {
        translateY: mobile ? -28 : -54,
        translateZ: mobile ? 18 : 58,
        rotateX: mobile ? -10 : -22,
        duration: 620,
      }, 760)
      .add(part("#ac-filter-left"), {
        translateX: mobile ? -16 : -38,
        translateY: mobile ? -32 : -62,
        translateZ: mobile ? 22 : 70,
        rotateX: mobile ? -10 : -23,
        rotateY: mobile ? -8 : -22,
        rotateZ: -4,
        duration: 620,
      }, 780)
      .add(part("#ac-filter-right"), {
        translateX: mobile ? 16 : 38,
        translateY: mobile ? -32 : -62,
        translateZ: mobile ? 22 : 70,
        rotateX: mobile ? -10 : -23,
        rotateY: mobile ? 8 : 22,
        rotateZ: 4,
        duration: 620,
      }, 780)
      .add(part("#ac-coil"), {
        translateY: mobile ? -8 : -18,
        translateZ: mobile ? 12 : 38,
        rotateX: mobile ? 5 : 12,
        rotateY: mobile ? 2 : 6,
        rotateZ: mobile ? -1 : -3,
        duration: 680,
      }, 1120)
      .add(part("#ac-fan"), {
        translateY: mobile ? 38 : 82,
        translateZ: mobile ? 20 : 64,
        rotateX: mobile ? 18 : 46,
        rotateY: mobile ? -7 : -18,
        rotateZ: mobile ? 3 : 9,
        duration: 720,
      }, 1450)
      .add(part("#ac-bearing"), {
        translateY: mobile ? 38 : 82,
        translateZ: mobile ? 20 : 64,
        rotateX: mobile ? 18 : 46,
        duration: 720,
      }, 1450)
      .add(part("#ac-motor"), {
        translateX: mobile ? 22 : 54,
        translateY: mobile ? 38 : 82,
        translateZ: mobile ? 20 : 64,
        rotateX: mobile ? 18 : 46,
        rotateY: mobile ? 12 : 32,
        rotateZ: mobile ? 7 : 18,
        duration: 720,
      }, 1450)
      .add(part("#ac-drain"), {
        translateY: mobile ? 56 : 118,
        translateZ: mobile ? 10 : 34,
        rotateX: mobile ? 18 : 46,
        rotateZ: mobile ? 1 : 3,
        duration: 680,
      }, 1780)
      .add(part("#ac-air-guide"), {
        translateY: mobile ? 68 : 144,
        translateZ: mobile ? 18 : 58,
        rotateX: mobile ? 23 : 58,
        rotateY: mobile ? -2 : -5,
        duration: 680,
      }, 1810)
      .add(part("#ac-louvers"), {
        translateY: mobile ? 78 : 164,
        translateZ: mobile ? 24 : 76,
        rotateX: mobile ? 28 : 68,
        rotateY: mobile ? -3 : -8,
        rotateZ: mobile ? -1 : -3,
        duration: 680,
      }, 1840)
      .add(part("#ac-swing-motor"), {
        translateX: mobile ? 18 : 44,
        translateY: mobile ? 68 : 144,
        translateZ: mobile ? 18 : 58,
        rotateX: mobile ? 23 : 58,
        rotateY: mobile ? 10 : 28,
        rotateZ: mobile ? 5 : 15,
        duration: 680,
      }, 1810)
      .add(part("#ac-board"), {
        translateX: mobile ? 44 : 108,
        translateY: mobile ? -14 : -34,
        translateZ: mobile ? 24 : 76,
        rotateX: mobile ? -4 : -10,
        rotateY: mobile ? 18 : 48,
        rotateZ: mobile ? 5 : 12,
        duration: 620,
      }, 2050)
      .add(part("#ac-display"), {
        translateX: mobile ? 40 : 98,
        translateY: mobile ? -14 : -34,
        translateZ: mobile ? 24 : 76,
        rotateX: mobile ? -3 : -8,
        rotateY: mobile ? 14 : 38,
        rotateZ: mobile ? -3 : -8,
        duration: 620,
      }, 2050)
      .add(part("#ac-sensor"), {
        translateX: mobile ? 34 : 82,
        translateY: mobile ? -12 : -30,
        translateZ: mobile ? 20 : 64,
        rotateX: mobile ? 8 : 20,
        rotateY: mobile ? -12 : -32,
        rotateZ: mobile ? -5 : -12,
        duration: 620,
      }, 2050)
      .add(part("#ac-wire-harness"), {
        translateX: mobile ? 44 : 108,
        translateY: mobile ? -10 : -26,
        translateZ: mobile ? 18 : 58,
        rotateX: mobile ? 7 : 18,
        rotateY: mobile ? 15 : 40,
        rotateZ: mobile ? 5 : 14,
        opacity: 0.9,
        duration: 620,
      }, 2050)
      .add(part("#ac-pipes"), {
        translateX: mobile ? 38 : 94,
        translateZ: mobile ? -8 : -24,
        rotateX: mobile ? 5 : 14,
        rotateY: mobile ? 16 : 42,
        rotateZ: mobile ? 7 : 18,
        opacity: 0.86,
        duration: 620,
      }, 2050)
      .add(part(".orbit-halo-one"), {
        opacity: 0.18,
        rotateZ: 10,
        duration: 700,
      }, 1400)
      .add(part(".orbit-halo-two"), {
        opacity: 0.1,
        rotateZ: -14,
        duration: 700,
      }, 1450)
      .add(part(".ac-orbit"), {
        rotateX: mobile ? 4 : 8,
        rotateY: mobile ? -8 : -18,
        scale: mobile ? 0.9 : 0.82,
        duration: 520,
      }, 2230);

    timeline.seek(0);
    timelineRef.current = timeline;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (reducedMotion) return;
      progressRef.current.target = clamp(
        progressRef.current.target + event.deltaY * 0.00135,
      );
    };

    const onTouchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchYRef.current === null || reducedMotion) return;
      const nextY = event.touches[0]?.clientY ?? touchYRef.current;
      const delta = touchYRef.current - nextY;
      touchYRef.current = nextY;
      progressRef.current.target = clamp(
        progressRef.current.target + delta * 0.0038,
      );
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion || mobile) return;
      const rect = root.getBoundingClientRect();
      pointerRef.current.x = clamp(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -1,
        1,
      );
      pointerRef.current.y = clamp(
        ((event.clientY - rect.top) / rect.height) * 2 - 1,
        -1,
        1,
      );
    };

    const onPointerLeave = () => {
      pointerRef.current.x = 0;
      pointerRef.current.y = 0;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: true });
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerleave", onPointerLeave);

    let frame = 0;
    let lastReported = -1;
    const tick = () => {
      const progressState = progressRef.current;
      progressState.current +=
        (progressState.target - progressState.current) * 0.085;
      const normalized = reducedMotion ? 0 : progressState.current;
      timeline.seek(timeline.duration * normalized, true);

      const pointer = pointerRef.current;
      pointer.currentX += (pointer.x - pointer.currentX) * 0.085;
      pointer.currentY += (pointer.y - pointer.currentY) * 0.085;
      const stage = root.querySelector<HTMLElement>(".ac-perspective");
      if (stage) {
        stage.style.transform = `rotateX(${pointer.currentY * -7}deg) rotateY(${pointer.currentX * 10}deg)`;
      }

      // A restrained, slow pulse appears only as the inner assembly separates.
      // It keeps the monochrome blueprint look intact while adding depth to the
      // moving mechanical layers.
      const separation = reducedMotion
        ? 0
        : clamp((normalized - 0.1) / 0.5);
      const glowPulse = 0.86 + Math.sin(performance.now() / 820) * 0.14;
      root.style.setProperty(
        "--inner-glow-alpha",
        `${separation * glowPulse * 0.16}`,
      );
      root.style.setProperty(
        "--inner-glow-soft-alpha",
        `${separation * glowPulse * 0.07}`,
      );
      root.querySelectorAll<SVGGElement>("[data-depth]").forEach((layer) => {
        const depth = Number(layer.dataset.depth ?? 0);
        layer.style.translate = `${pointer.currentX * depth}px ${pointer.currentY * depth}px`;
      });

      const reportValue = Math.round(normalized * 100);
      if (reportValue !== lastReported) {
        lastReported = reportValue;
        setProgress(reportValue);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      intro.revert();
      timeline.revert();
      timelineRef.current = null;
    };
  }, []);

  const chapterIndex = CHAPTERS.reduce(
    (activeIndex, chapter, index) =>
      progress >= chapter.at ? index : activeIndex,
    0,
  );
  const chapter = CHAPTERS[chapterIndex];

  useEffect(() => {
    onStageChange?.(chapterIndex);
  }, [chapterIndex, onStageChange]);

  const advanceStage = () => {
    const isFinalStage = chapterIndex === CHAPTERS.length - 1;
    progressRef.current.target = isFinalStage
      ? 0
      : (CHAPTERS[chapterIndex + 1].at + 1) / 100;
  };

  return (
    <div className="visual-column intro-reveal" ref={rootRef}>
      <div className="technical-index" aria-hidden="true">
        <span>SYS / 01</span>
        <span>INDOOR UNIT</span>
      </div>
      <div className="stage-readout" aria-live="polite">
        <span>0{chapterIndex + 1} / 08</span>
        <b>{chapter.label}</b>
        <i><em style={{ width: `${progress}%` }} /></i>
      </div>

      <div className="ac-perspective-wrap">
        <div className="orbit-halo orbit-halo-one" aria-hidden="true" />
        <div className="orbit-halo orbit-halo-two" aria-hidden="true" />
        <div className="ac-perspective">
          <div className="ac-orbit">
            <AcIllustration />
          </div>
        </div>
      </div>

      <button
        className="explore-control"
        type="button"
        onClick={advanceStage}
        aria-label={chapterIndex === 7 ? "Klimayı yeniden birleştir" : "Sonraki aşamaya geç"}
      >
        <span className="progress-ring" style={{ "--progress": progress } as CSSProperties}>
          <i />
        </span>
        <span>
          <b>{chapterIndex === 7 ? "YENİDEN BİRLEŞTİR" : "SONRAKİ AŞAMA"}</b>
          <small>Kaydırın veya dokunun</small>
        </span>
      </button>
    </div>
  );
}
