import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { SceneRoot } from "./components/SceneRoot";
import { CalloutOverlay } from "./components/CalloutOverlay";
import type { ProjectedCallout } from "./lib/projection";

function App() {
  const [activeCalloutId, setActiveCalloutId] = useState<string | null>(null);
  const [projectedCallouts, setProjectedCallouts] = useState<ProjectedCallout[]>(
    [],
  );

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-[#01040a] text-white">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_42%,rgba(22,78,99,0.28),rgba(2,7,17,0.72)_34%,rgba(1,4,10,1)_72%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_24%,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(37,99,235,0.14),transparent_34%),radial-gradient(circle_at_50%_88%,rgba(14,165,233,0.18),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.07] [background-image:linear-gradient(rgba(125,211,252,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.5)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:radial-gradient(circle_at_center,black,transparent_74%)]" />
      <div className="pointer-events-none absolute inset-x-[-10%] bottom-[-22%] z-0 h-[42%] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.28),rgba(14,116,144,0.08)_42%,transparent_72%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(0,0,0,0.42)_100%)]" />
      <header className="absolute left-0 right-0 top-0 z-20 flex items-start justify-between gap-4 px-5 py-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-lg border border-white/16 bg-[linear-gradient(145deg,rgba(3,12,22,0.82),rgba(1,4,10,0.72))] px-4 py-3 shadow-[0_16px_44px_rgba(0,0,0,0.34),0_0_30px_rgba(34,211,238,0.06)] backdrop-blur-xl transition hover:border-[#c36a1a]/45 sm:px-5 sm:py-4"
        >
          <div className="font-horizon text-[26px] font-bold uppercase leading-none tracking-[0.08em] text-[#c36a1a] drop-shadow-[0_0_10px_rgba(195,106,26,0.16)] sm:text-[34px]">
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
            href="tel:+905488485248"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/16 bg-[linear-gradient(145deg,rgba(3,12,22,0.82),rgba(1,4,10,0.72))] px-3.5 text-xs font-medium text-[#c36a1a] shadow-[0_14px_36px_rgba(0,0,0,0.3),0_0_24px_rgba(34,211,238,0.05)] backdrop-blur-xl transition hover:border-[#c36a1a]/45"
          >
            <Phone className="h-4 w-4 text-[#c36a1a]" aria-hidden="true" />
            <span className="hidden sm:inline">+90 548 848 52 48</span>
          </a>
          <a
            href="mailto:info@kagultd.com?cc=kagultdcy@gmail.com"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/16 bg-[linear-gradient(145deg,rgba(3,12,22,0.82),rgba(1,4,10,0.72))] px-3.5 text-xs font-medium text-[#c36a1a] shadow-[0_14px_36px_rgba(0,0,0,0.3),0_0_24px_rgba(34,211,238,0.05)] backdrop-blur-xl transition hover:border-[#c36a1a]/45"
          >
            <Mail className="h-4 w-4 text-[#c36a1a]" aria-hidden="true" />
            <span className="hidden md:inline">info@kagultd.com</span>
          </a>
        </motion.div>
      </header>

      <section className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden px-4">
        <SceneRoot
          onProjectedCalloutsChange={setProjectedCallouts}
          onSceneBackgroundClick={() => setActiveCalloutId(null)}
        />
      </section>
      <CalloutOverlay
        activeCalloutId={activeCalloutId}
        onActiveCalloutChange={setActiveCalloutId}
        projectedCallouts={projectedCallouts}
      />
    </main>
  );
}

export default App;
