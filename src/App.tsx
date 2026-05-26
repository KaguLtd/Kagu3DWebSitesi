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
    <main className="relative h-dvh w-screen overflow-hidden bg-kagu-deep text-white">
      <div className="absolute inset-0 bg-[url('/textures/plein-nerro-4096.jpg')] bg-cover bg-center opacity-75" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_48%,rgba(7,16,24,0.12),rgba(1,4,8,0.78)_62%,rgba(0,0,0,0.94)_100%),linear-gradient(135deg,rgba(1,4,8,0.68)_0%,rgba(6,13,19,0.38)_48%,rgba(0,0,0,0.82)_100%)]" />
      <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(216,246,255,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(216,246,255,0.22)_1px,transparent_1px)] [background-size:86px_86px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-cyan-100/8 to-transparent" />
      <div className="pointer-events-none absolute inset-x-[12%] bottom-0 h-40 bg-[radial-gradient(ellipse_at_center,rgba(78,231,255,0.12),transparent_68%)] blur-2xl" />

      <header className="absolute left-0 right-0 top-0 z-20 flex items-start justify-between gap-4 px-5 py-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="px-1 py-1"
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
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#c36a1a]/25 bg-slate-950/35 px-3 text-xs font-medium text-[#c36a1a] backdrop-blur-xl transition hover:border-[#c36a1a]/55 hover:bg-[#c36a1a]/10"
          >
            <Phone className="h-4 w-4 text-[#c36a1a]" aria-hidden="true" />
            <span className="hidden sm:inline">+90 548 848 52 48</span>
          </a>
          <a
            href="mailto:info@kagultd.com"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#c36a1a]/25 bg-slate-950/35 px-3 text-xs font-medium text-[#c36a1a] backdrop-blur-xl transition hover:border-[#c36a1a]/55 hover:bg-[#c36a1a]/10"
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
