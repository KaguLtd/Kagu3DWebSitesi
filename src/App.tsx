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
        <a className="brand-mark" href="#" aria-label="Kagu Ltd. ana sayfa">
          <span className="brand-word">KAGU</span>
          <span className="brand-suffix">LTD.</span>
        </a>

        <nav className="header-actions" aria-label="İletişim bağlantıları">
          <a className="header-link" href={CONTACT.phoneHref}>
            <Phone aria-hidden="true" />
            <span>{CONTACT.phoneDisplay}</span>
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
