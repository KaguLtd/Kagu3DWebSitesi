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
    <main className="relative h-dvh w-screen overflow-hidden bg-white text-white">
      <header className="absolute left-0 right-0 top-0 z-20 flex items-start justify-between gap-4 px-5 py-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-lg border border-cyan-200/14 bg-[linear-gradient(145deg,rgba(2,6,12,0.94),rgba(1,4,8,0.9))] px-5 py-4 shadow-[0_10px_28px_rgba(0,0,0,0.26)] backdrop-blur-xl"
        >
          <div className="font-horizon text-[32px] font-bold uppercase leading-none tracking-[0.08em] text-[#c36a1a] drop-shadow-[0_0_10px_rgba(195,106,26,0.16)] sm:text-[40px]">
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
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-cyan-200/14 bg-[linear-gradient(145deg,rgba(2,6,12,0.94),rgba(1,4,8,0.9))] px-3.5 text-xs font-medium text-[#c36a1a] shadow-[0_10px_28px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:border-[#c36a1a]/45"
          >
            <Phone className="h-4 w-4 text-[#c36a1a]" aria-hidden="true" />
            <span className="hidden sm:inline">+90 548 848 52 48</span>
          </a>
          <a
            href="mailto:info@kagultd.com"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-cyan-200/14 bg-[linear-gradient(145deg,rgba(2,6,12,0.94),rgba(1,4,8,0.9))] px-3.5 text-xs font-medium text-[#c36a1a] shadow-[0_10px_28px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:border-[#c36a1a]/45"
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
