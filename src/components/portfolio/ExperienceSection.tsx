import { useState, useRef, useEffect } from "react";

const eduData = [
  { year: "2026", title: "Agent Skills для L&D", org: "Мандрик, Казаков и роботы", label: "Agent Skills для L&D — 2026", cert: "/docs/cert-agent-skills-2026-1.png" },
  { year: "2026", title: "Практикумы по вайбкодингу", org: "LXD Hero", label: "Практикумы по вайбкодингу — 2026", cert: "/docs/cert-vibecoding-2026-2.png" },
  { year: "2024", title: "Нейрогерой образования", org: "LXD Hero · Нейрогуру программы", label: "Нейрогерой образования — 2024", cert: "/images/lxd-feedback-2024.png", link: "https://lxdhero.com/neurohero", linkLabel: "Отзыв на сайте LXD Hero →" },
  { year: "2022", title: "Проектирование образовательного опыта", org: "LXD Hero", label: "Проектирование обр. опыта — 2022", cert: "/docs/cert-lxd-mentoring-2022.png" },
  { year: "2020", title: "Интерактивный вебинар. Как создать и провести", org: "ГК «Институт Тренинга — АРБ Про»", label: "Интерактивный вебинар. Как создать и провести — 2020", cert: "/docs/cert-webinar-2020.png" },
  { year: "2018", title: "Школа фасилитации", org: "Марина Курдова", label: "Школа фасилитации — 2018", cert: "/docs/cert-facilitation-2018.png" },
  { year: "2011", title: "Искусство и Наука коучинга", org: "МАК / Erickson College International", label: "Искусство и Наука коучинга — 2011", cert: "/docs/cert-coaching-2011.png" },
  { year: "2009", title: "Корпоративный тренер: мастер-курс", org: "ГК «Институт Тренинга — АРБ Про»", label: "Корпоративный тренер — 2009", cert: "/docs/cert-trainer-2009.png" },
  { year: "2004", title: "Психология образования", org: "МГППУ, Москва", label: "Психология образования — 1999–2004", cert: "/docs/cert-psychology-2004.png" },
];

interface ExperienceSectionProps {
  onOpenPdf: (
    src: string,
    nav?: { onPrev?: () => void; onNext?: () => void; canPrev?: boolean; canNext?: boolean }
  ) => void;
}

export default function ExperienceSection({ onOpenPdf }: ExperienceSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCert = eduData[activeIndex].cert;
  const [isLandscape, setIsLandscape] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsLandscape(false);
  }, [activeCert]);

  const handleImgLoad = () => {
    const img = imgRef.current;
    if (img) {
      setIsLandscape(img.naturalWidth > img.naturalHeight);
    }
  };

  const certIndices = eduData
    .map((e, i) => (e.cert ? i : -1))
    .filter((i) => i >= 0);

  const openCertAt = (i: number) => {
    const cert = eduData[i].cert;
    if (!cert) return;
    setActiveIndex(i);
    const pos = certIndices.indexOf(i);
    const prevIdx = pos > 0 ? certIndices[pos - 1] : undefined;
    const nextIdx = pos < certIndices.length - 1 ? certIndices[pos + 1] : undefined;
    onOpenPdf(cert, {
      canPrev: prevIdx !== undefined,
      canNext: nextIdx !== undefined,
      onPrev: prevIdx !== undefined ? () => openCertAt(prevIdx) : undefined,
      onNext: nextIdx !== undefined ? () => openCertAt(nextIdx) : undefined,
    });
  };

  const handleRowClick = (i: number) => {
    setActiveIndex(i);
    if (eduData[i].cert) {
      openCertAt(i);
    }
  };

  return (
    <section className="experience" id="experience">
      <div className="arc" style={{ width: 300, height: 300, top: -80, right: -70, border: "1.5px dashed #0D6B3F", opacity: 0.12 }} />
      <div className="arc" style={{ width: 220, height: 220, bottom: -80, left: -60, border: "1.5px solid #B4B2A9", opacity: 0.08 }} />
      <div className="wrap">
        <h3 className="exp-edu-title">Образование и квалификация</h3>
        <div className="esplit">
          <div className="esplit-scan">
            {activeCert ? (
              <div
                className={`esplit-ph ${isLandscape ? "esplit-ph--landscape" : "esplit-ph--portrait"}`}
                style={{ cursor: "pointer" }}
                onClick={() => openCertAt(activeIndex)}
              >
                <img
                  ref={imgRef}
                  src={activeCert}
                  alt={eduData[activeIndex].label}
                  onLoad={handleImgLoad}
                  style={{
                    width: "100%",
                    flex: "1 1 auto",
                    minHeight: 0,
                    objectFit: "contain",
                    borderRadius: 8,
                    border: "1px solid var(--p-border)",
                    background: "white",
                  }}
                />
                <div className="sp-label">
                  {eduData[activeIndex].label}
                  {eduData[activeIndex].link && (
                    <>
                      {" · "}
                      <a
                        href={eduData[activeIndex].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: "var(--p-blue)", textDecoration: "underline" }}
                      >
                        {eduData[activeIndex].linkLabel}
                      </a>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="esplit-ph">
                <div className="sp-h" />
                <div className="sp-l" />
                <div className="sp-l" />
                <div className="sp-l short" />
                <div className="sp-l" />
                <div className="sp-l" />
                <div className="sp-l short" />
                <div className="sp-l" />
                <div className="sp-l" />
                <div className="sp-l short" />
                <div className="sp-st" />
                <div className="sp-label">{eduData[activeIndex].label}</div>
              </div>
            )}
          </div>
          <div className="esplit-list">
            {eduData.map((edu, i) => (
              <div
                key={i}
                className={`erow${i === activeIndex ? " active" : ""}`}
                onClick={() => handleRowClick(i)}
                style={{ cursor: edu.cert ? "pointer" : "default" }}
              >
                <div className="er-yr">{edu.year}</div>
                <div className="er-body">
                  <div className="er-t">{edu.title}</div>
                  <div className="er-o">{edu.org}</div>
                </div>
                <div className="er-arrow">{edu.cert ? "📄" : "→"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
