import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Droplets,
  Flame,
  MessageCircle,
  Snowflake,
  Sun,
  ThermometerSun,
  Wind,
  X,
  type LucideIcon,
} from "lucide-react";
import { callouts, type Callout } from "../../data/callouts";
import { CONTACT } from "../../data/contact";

const MOBILE_CALLOUT_ORDER = [
  "air-conditioning",
  "heat-pump",
  "heating",
  "solar",
  "ventilation",
  "water-systems",
  "about",
];

const ICONS: Record<string, LucideIcon> = {
  about: Building2,
  "air-conditioning": Snowflake,
  heating: Flame,
  "heat-pump": ThermometerSun,
  solar: Sun,
  ventilation: Wind,
  "water-systems": Droplets,
};

const SHORT_TITLES: Record<string, string> = {
  about: "Kagu",
  "air-conditioning": "Klima",
  heating: "Isıtma",
  "heat-pump": "Isı Pompası",
  solar: "Solar",
  ventilation: "Havalandırma",
  "water-systems": "Su Sistemleri",
};

type MobileExperienceProps = {
  activeCalloutId: string | null;
  onActiveCalloutChange: (id: string | null) => void;
};

export function MobileExperience({
  activeCalloutId,
  onActiveCalloutChange,
}: MobileExperienceProps) {
  const orderedCallouts = getMobileOrderedCallouts();
  const activeCallout =
    orderedCallouts.find((callout) => callout.id === activeCalloutId) ?? null;

  return (
    <section
      className="absolute inset-0 z-10 flex h-dvh flex-col overflow-hidden px-3 pb-3 pt-[76px] min-[390px]:px-4 min-[390px]:pb-4 min-[390px]:pt-[82px]"
      aria-label="Kagu Ltd. mobil deneyimi"
    >
      <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center">
        <div className="relative mb-4 flex h-[clamp(122px,25dvh,220px)] w-full max-w-[430px] items-center justify-center">
          <div className="absolute left-[6%] top-1/2 h-[82%] w-[52%] -translate-y-1/2 rounded-full bg-cyan-500/18 blur-[42px]" />
          <div className="absolute right-[6%] top-1/2 h-[82%] w-[52%] -translate-y-1/2 rounded-full bg-amber-500/18 blur-[42px]" />
          <div className="absolute inset-x-[17%] top-1/2 h-[70%] -translate-y-1/2 rounded-full border border-cyan-300/12 shadow-[inset_0_0_36px_rgba(34,211,238,0.06),0_0_28px_rgba(245,158,11,0.05)]" />
          <CssAirConditioner />
        </div>

        <h1 className="max-w-[390px] text-balance text-center text-[clamp(21px,6.7vw,32px)] font-semibold leading-[1.12] tracking-[-0.035em] text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.06)]">
          KKTC Geneli{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-[#c98035] bg-clip-text text-transparent">
            İklimlendirme
          </span>{" "}
          ve Mekanik Sistem Çözümleri
        </h1>
      </div>

      <div className="relative z-20 mx-auto w-full max-w-[430px]">
        <div className="grid grid-cols-4 gap-1.5 rounded-[22px] border border-white/12 bg-[linear-gradient(145deg,rgba(8,23,38,0.92),rgba(1,5,12,0.96))] p-1.5 shadow-[0_16px_44px_rgba(0,0,0,0.48),0_0_30px_rgba(34,211,238,0.08)] backdrop-blur-xl min-[390px]:gap-2 min-[390px]:p-2">
          {orderedCallouts.map((callout) => {
            const Icon = ICONS[callout.id] ?? Snowflake;
            const isActive = callout.id === activeCalloutId;

            return (
              <motion.button
                key={callout.id}
                type="button"
                aria-describedby={`mobile-service-description-${callout.id}`}
                aria-expanded={isActive}
                onClick={() =>
                  onActiveCalloutChange(isActive ? null : callout.id)
                }
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.14, ease: "easeOut" }}
                className={`group flex min-h-[48px] min-w-0 flex-col items-center justify-center gap-1 rounded-[15px] border px-1 py-1.5 text-center outline-none transition duration-150 focus-visible:ring-2 focus-visible:ring-cyan-300/60 min-[390px]:min-h-[56px] ${
                  isActive
                    ? "border-cyan-300/55 bg-cyan-400/12 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.16)]"
                    : "border-white/[0.07] bg-white/[0.025] text-slate-300 hover:border-white/18 hover:text-white"
                }`}
              >
                <Icon
                  className={`h-4 w-4 min-[390px]:h-[18px] min-[390px]:w-[18px] ${
                    isActive ? "text-cyan-300" : "text-[#c98035]"
                  }`}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <span className="w-full truncate text-[8px] font-semibold leading-3 tracking-[-0.01em] min-[390px]:text-[9px]">
                  {SHORT_TITLES[callout.id]}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="sr-only" aria-label="Kagu Ltd. hizmet açıklamaları">
        {orderedCallouts.map((callout) => (
          <article
            key={callout.id}
            id={`mobile-service-description-${callout.id}`}
          >
            <h2>{callout.title}</h2>
            <p>{callout.description}</p>
          </article>
        ))}
      </div>

      <AnimatePresence>
        {activeCallout ? (
          <MobileInfoSheet
            callout={activeCallout}
            onClose={() => onActiveCalloutChange(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function CssAirConditioner() {
  return (
    <div
      className="relative z-10 h-[58%] w-[82%] max-w-[380px] rounded-[19px_19px_15px_15px] border border-white/38 bg-[linear-gradient(155deg,rgba(225,244,255,0.22),rgba(50,76,98,0.3)_38%,rgba(8,13,21,0.92)_88%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.55),inset_0_-14px_28px_rgba(0,0,0,0.42),-16px_0_28px_rgba(14,165,233,0.18),16px_0_28px_rgba(245,158,11,0.18),0_18px_28px_rgba(0,0,0,0.48)]"
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 top-[61%] h-px bg-gradient-to-r from-cyan-300/38 via-white/16 to-amber-300/40" />
      <div className="absolute inset-x-[8%] bottom-[10%] h-[24%] rounded-[5px_5px_11px_11px] border border-white/12 bg-[#02070d]/90 shadow-[inset_0_7px_10px_rgba(0,0,0,0.72)]">
        <div className="absolute inset-x-[4%] top-[38%] h-px bg-gradient-to-r from-cyan-300/65 via-slate-500/18 to-amber-300/65" />
        <div className="absolute inset-x-[4%] bottom-[22%] h-px bg-gradient-to-r from-cyan-300/45 via-slate-500/12 to-amber-300/45" />
      </div>
      <div className="absolute left-1/2 top-[48%] h-1 w-9 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-200 to-amber-300 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
    </div>
  );
}

function MobileInfoSheet({
  callout,
  onClose,
}: {
  callout: Callout;
  onClose: () => void;
}) {
  const Icon = ICONS[callout.id] ?? Snowflake;

  return (
    <motion.div
      className="absolute inset-x-3 bottom-[76px] z-40 mx-auto max-h-[48dvh] max-w-[430px] overflow-hidden rounded-[24px] border border-cyan-200/22 bg-[radial-gradient(circle_at_18%_0%,rgba(14,116,144,0.3),rgba(3,12,22,0.97)_48%,rgba(0,3,8,0.98)_100%)] p-4 shadow-[0_22px_64px_rgba(0,0,0,0.66),0_0_38px_rgba(34,211,238,0.14)] ring-1 ring-white/[0.05] backdrop-blur-2xl min-[390px]:inset-x-4 min-[390px]:bottom-[88px] min-[390px]:p-5"
      role="dialog"
      aria-modal="false"
      aria-labelledby={`mobile-sheet-title-${callout.id}`}
      initial={{ opacity: 0, scale: 0.97, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 12 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/28 bg-cyan-400/10 text-cyan-300 shadow-[0_0_22px_rgba(34,211,238,0.13)]">
          <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h2
            id={`mobile-sheet-title-${callout.id}`}
            className="pr-8 text-base font-semibold leading-5 tracking-[-0.02em] text-white min-[390px]:text-lg"
          >
            {callout.title}
          </h2>
          <p className="mt-2 max-h-[18dvh] overflow-y-auto pr-1 text-[11px] leading-[1.55] text-cyan-50/65 min-[390px]:text-xs">
            {callout.description}
          </p>
        </div>
        <button
          type="button"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/72 transition hover:bg-white/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
          onClick={onClose}
          aria-label="Bilgi panelini kapat"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <a
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-300/36 bg-[linear-gradient(135deg,rgba(16,185,129,0.26),rgba(5,150,105,0.12))] px-4 py-3 text-sm font-semibold text-emerald-50 shadow-[0_0_24px_rgba(16,185,129,0.1)] transition hover:border-emerald-200/60 hover:bg-emerald-400/22 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
        href={CONTACT.whatsappUrl}
        rel="noreferrer"
        target="_blank"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Şimdi Teklif Al
      </a>
    </motion.div>
  );
}

function getMobileOrderedCallouts() {
  const byId = new Map(callouts.map((callout) => [callout.id, callout]));

  return MOBILE_CALLOUT_ORDER.map((id) => byId.get(id)).filter(
    (callout): callout is Callout => callout !== undefined,
  );
}
