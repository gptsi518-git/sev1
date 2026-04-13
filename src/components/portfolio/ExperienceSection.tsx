import { useState } from "react";

const eduData = [
  { year: "2026", title: "Agent Skills для L&D", org: "Мандрик, Казаков и роботы", label: "Agent Skills для L&D — 2026" },
  { year: "2026", title: "Практикумы по вайбкодингу", org: "LXD Hero", label: "Практикумы по вайбкодингу — 2026" },
  { year: "2024", title: "Нейрогерой образования", org: "LXD Hero · Нейрогуру программы", label: "Нейрогерой образования — 2024 · Отзыв на сайте LXD Hero →" },
  { year: "2022", title: "Проектирование образовательного опыта", org: "LXD Hero", label: "Проектирование обр. опыта — 2022" },
  { year: "2020", title: "Интерактивный вебинар. Как создать и провести", org: "ГК «Институт Тренинга — АРБ Про»", label: "Интерактивный вебинар. Как создать и провести — 2020" },
  { year: "2018", title: "Школа фасилитации", org: "Марина Курдова", label: "Школа фасилитации — 2018" },
  { year: "2011", title: "Искусство и Наука коучинга", org: "МАК / Erickson College International", label: "Искусство и Наука коучинга — 2011" },
  { year: "2009", title: "Корпоративный тренер: мастер-курс", org: "ГК «Институт Тренинга — АРБ Про»", label: "Корпоративный тренер — 2009" },
  { year: "2004", title: "Психология образования", org: "МГППУ, Москва", label: "Психология образования — 1999–2004" },
];

export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="experience" id="experience">
      <div className="arc" style={{ width: 300, height: 300, top: -80, right: -70, border: "1.5px dashed #0D6B3F", opacity: 0.12 }} />
      <div className="arc" style={{ width: 220, height: 220, bottom: -80, left: -60, border: "1.5px solid #B4B2A9", opacity: 0.08 }} />
      <div className="wrap">
        <h3 className="exp-edu-title">Образование и квалификация</h3>
        <div className="esplit">
          <div className="esplit-scan">
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
          </div>
          <div className="esplit-list">
            {eduData.map((edu, i) => (
              <div
                key={i}
                className={`erow${i === activeIndex ? " active" : ""}`}
                onClick={() => setActiveIndex(i)}
              >
                <div className="er-yr">{edu.year}</div>
                <div className="er-body">
                  <div className="er-t">{edu.title}</div>
                  <div className="er-o">{edu.org}</div>
                </div>
                <div className="er-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
