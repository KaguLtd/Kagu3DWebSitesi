import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { AcBlueprintHero } from "./components/AcBlueprintHero";
import { CONTACT } from "./data/contact";
import { heroStages, type HeroStage } from "./data/heroStages";

type FlowDirection = "forward" | "backward";

function App() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [previousStageIndex, setPreviousStageIndex] = useState<number | null>(
    null,
  );
  const [flowDirection, setFlowDirection] = useState<FlowDirection>("forward");
  const activeStageIndexRef = useRef(0);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleStageChange = useCallback((nextStageIndex: number) => {
    const currentStageIndex = activeStageIndexRef.current;
    if (nextStageIndex === currentStageIndex) return;

    setPreviousStageIndex(currentStageIndex);
    setFlowDirection(
      nextStageIndex > currentStageIndex ? "forward" : "backward",
    );
    activeStageIndexRef.current = nextStageIndex;
    setActiveStageIndex(nextStageIndex);

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }
    transitionTimerRef.current = setTimeout(() => {
      setPreviousStageIndex(null);
    }, 720);
  }, []);

  useEffect(
    () => () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    },
    [],
  );

  const activeStage = heroStages[activeStageIndex];
  const previousStage =
    previousStageIndex === null ? null : heroStages[previousStageIndex];

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="blueprint-grid" />
      <div className="vignette" />

      <header className="site-header">
        <a className="brand-mark" href="/" aria-label="Kagu Ltd. ana sayfayı yenile">
          <span className="brand-word">KAGU</span>
          <span className="brand-suffix">LTD.</span>
        </a>

        <nav className="header-actions" aria-label="İletişim bağlantıları">
          <a className="header-link" href={CONTACT.phoneHref}>
            <Phone aria-hidden="true" />
            <span>{CONTACT.phoneDisplay}</span>
          </a>
          <a
            className="header-link whatsapp-link"
            href={CONTACT.whatsappUrl}
            rel="noreferrer"
            target="_blank"
            aria-label="WhatsApp ile iletişime geç"
          >
            <WhatsAppIcon />
          </a>
          <a className="header-link mail-link" href={`mailto:${CONTACT.email}`}>
            <Mail aria-hidden="true" />
            <span>{CONTACT.email}</span>
          </a>
        </nav>
      </header>

      <section className="hero-layout" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-copy-stage-stack">
            {previousStage ? (
              <StageCopy
                stage={previousStage}
                stageIndex={previousStageIndex!}
                state="exiting"
                direction={flowDirection}
                aria-hidden="true"
              />
            ) : null}
            <StageCopy
              key={activeStage.id}
              stage={activeStage}
              stageIndex={activeStageIndex}
              state="entering"
              direction={flowDirection}
            />
          </div>

          <div className="hero-actions">
            <a
              className="primary-action"
              href={CONTACT.whatsappUrl}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle aria-hidden="true" />
              Teklif alın
            </a>
            <a className="secondary-action" href={CONTACT.phoneHref}>
              Projenizi konuşalım
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="capabilities" aria-label="Hizmet özellikleri">
            <span>KEŞİF</span>
            <i />
            <span>PROJELENDİRME</span>
            <i />
            <span>UYGULAMA</span>
            <i />
            <span>SERVİS</span>
          </div>
        </div>

        <AcBlueprintHero onStageChange={handleStageChange} />
      </section>
    </main>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.04 2a9.84 9.84 0 0 0-8.43 14.91L2 22l5.23-1.56A9.94 9.94 0 1 0 12.04 2Zm0 17.87a8 8 0 0 1-4.08-1.11l-.29-.17-3.1.92.94-3.02-.19-.31a8.02 8.02 0 1 1 6.72 3.69Zm4.4-6.01c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2a7.2 7.2 0 0 1-1.34-1.66c-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.03.14-1.13-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

type StageCopyProps = {
  stage: HeroStage;
  stageIndex: number;
  state: "entering" | "exiting";
  direction: FlowDirection;
  "aria-hidden"?: "true";
};

function StageCopy({
  stage,
  stageIndex,
  state,
  direction,
  ...ariaProps
}: StageCopyProps) {
  const topic = getStageTopic(stage.eyebrow);

  return (
    <div
      className={`hero-copy-content is-${state} is-${direction}`}
      {...ariaProps}
    >
      <span className="stage-ghost" aria-hidden="true">
        0{stageIndex + 1}
      </span>
      <div className="stage-heading">
        <span className="stage-order">0{stageIndex + 1} / 08</span>
        <h1 id={state === "entering" ? "hero-title" : undefined} className="stage-title">
          {topic}
        </h1>
      </div>
      <p className="hero-tagline">
        <span>{stage.lead}</span>
        <em>{stage.accent}</em>
        <span>{stage.tail}</span>
      </p>
      <p
        className={`hero-description ${
          stage.description.length > 330 ? "is-long" : ""
        }`}
      >
        {stage.description}
      </p>
    </div>
  );
}

function getStageTopic(eyebrow: string) {
  const separatorIndex = eyebrow.indexOf(" / ");
  return separatorIndex === -1 ? eyebrow : eyebrow.slice(separatorIndex + 3);
}

export default App;
