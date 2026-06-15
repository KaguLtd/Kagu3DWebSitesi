import { lazy, Suspense, useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { MobileExperience } from "./components/mobile/MobileExperience";
import { CONTACT } from "./data/contact";
import type { ProjectedCallout } from "./lib/projection";

const SceneRoot = lazy(() =>
  import("./components/SceneRoot").then((module) => ({
    default: module.SceneRoot,
  })),
);

const CalloutOverlay = lazy(() =>
  import("./components/CalloutOverlay").then((module) => ({
    default: module.CalloutOverlay,
  })),
);

function App() {
  const [activeCalloutId, setActiveCalloutId] = useState<string | null>(null);
  const [projectedCallouts, setProjectedCallouts] = useState<ProjectedCallout[]>(
    [],
  );
  const isMobile = useIsMobile();

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-[#01040a] text-white">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_42%,rgba(22,78,99,0.28),rgba(2,7,17,0.72)_34%,rgba(1,4,10,1)_72%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_24%,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(37,99,235,0.14),transparent_34%),radial-gradient(circle_at_50%_88%,rgba(14,165,233,0.18),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.07] [background-image:linear-gradient(rgba(125,211,252,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.5)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:radial-gradient(circle_at_center,black,transparent_74%)]" />
      <div className="pointer-events-none absolute inset-x-[-10%] bottom-[-22%] z-0 h-[42%] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.28),rgba(14,116,144,0.08)_42%,transparent_72%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(0,0,0,0.42)_100%)]" />
      <header className="absolute left-0 right-0 top-0 z-20 flex items-start justify-between gap-3 px-3 py-3 sm:gap-4 sm:px-8 sm:py-5">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-lg border border-white/16 bg-[linear-gradient(145deg,rgba(3,12,22,0.82),rgba(1,4,10,0.72))] px-3 py-2 shadow-[0_16px_44px_rgba(0,0,0,0.34),0_0_30px_rgba(34,211,238,0.06)] backdrop-blur-xl transition hover:border-[#c36a1a]/45 sm:px-5 sm:py-4"
        >
          <div className="whitespace-nowrap font-horizon text-[17px] font-bold uppercase leading-none tracking-[0.06em] text-[#c36a1a] drop-shadow-[0_0_10px_rgba(195,106,26,0.16)] sm:text-[34px] sm:tracking-[0.08em]">
            KAGU LTD.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          className="flex max-w-[52vw] flex-wrap justify-end gap-2"
        >
          <a
            href={CONTACT.phoneHref}
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/16 bg-[linear-gradient(145deg,rgba(3,12,22,0.82),rgba(1,4,10,0.72))] px-3.5 text-xs font-medium text-[#c36a1a] shadow-[0_14px_36px_rgba(0,0,0,0.3),0_0_24px_rgba(34,211,238,0.05)] backdrop-blur-xl transition hover:border-[#c36a1a]/45"
          >
            <Phone className="h-4 w-4 text-[#c36a1a]" aria-hidden="true" />
            <span className="hidden sm:inline">{CONTACT.phoneDisplay}</span>
          </a>
          <a
            href={`mailto:${CONTACT.email}?cc=kagultdcy@gmail.com`}
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/16 bg-[linear-gradient(145deg,rgba(3,12,22,0.82),rgba(1,4,10,0.72))] px-3.5 text-xs font-medium text-[#c36a1a] shadow-[0_14px_36px_rgba(0,0,0,0.3),0_0_24px_rgba(34,211,238,0.05)] backdrop-blur-xl transition hover:border-[#c36a1a]/45"
          >
            <Mail className="h-4 w-4 text-[#c36a1a]" aria-hidden="true" />
            <span className="hidden md:inline">{CONTACT.email}</span>
          </a>
        </motion.div>
      </header>

      {isMobile ? (
        <MobileExperience
          activeCalloutId={activeCalloutId}
          onActiveCalloutChange={setActiveCalloutId}
        />
      ) : (
        <>
          <section className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden px-4">
            <Suspense fallback={<DesktopSceneFallback />}>
              <SceneRoot
                onProjectedCalloutsChange={setProjectedCallouts}
                onSceneBackgroundClick={() => setActiveCalloutId(null)}
              />
            </Suspense>
          </section>
          <Suspense fallback={null}>
            <CalloutOverlay
              activeCalloutId={activeCalloutId}
              onActiveCalloutChange={setActiveCalloutId}
              projectedCallouts={projectedCallouts}
            />
          </Suspense>
        </>
      )}
    </main>
  );
}

export default App;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
}

function DesktopSceneFallback() {
  return (
    <div
      className="h-32 w-[min(72vw,760px)] animate-pulse rounded-[32px] border border-cyan-200/10 bg-cyan-300/[0.035] shadow-[0_0_80px_rgba(34,211,238,0.08)]"
      aria-label="3D klima deneyimi yükleniyor"
    />
  );
}
