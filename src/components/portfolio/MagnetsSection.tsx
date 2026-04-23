import { useState } from "react";

const magData: { t: string; p: string; btn: string; bg: string; bdr: string; fmt: string; quote: string; author: string; screenshot?: string; link?: string }[] = [
  { t: "Библиотека промтов для\u00a0разработки обучения", p: "Готовые промты для каждого этапа — от анализа аудитории до оценки результатов.", btn: "Попробовать →", bg: "var(--green-pale)", bdr: "var(--p-green)", fmt: "WEB-APP", quote: "«Использую на старте разработки образовательных решений. Ускоряет создание продукта очень сильно»", author: "Методолог, EdTech", screenshot: "/images/promtoteka-screenshot.png", link: "https://sev-prompt.lovable.app" },
  { t: "Калькулятор T2M", p: "Впишите часы на каждый этап разработки — увидите свой T2M. Рядом — бенчмарки и рекомендации, где ИИ сократит время.", btn: "Попробовать →", bg: "var(--blue-pale)", bdr: "var(--p-blue)", fmt: "XLS", quote: "«Показала директору цифру — впервые за год одобрили бюджет на автоматизацию»", author: "Руководитель L&D, ритейл", screenshot: "/images/t2m-calculator-screenshot.png", link: "https://sev-calculator-t2m.lovable.app" },
  { t: "Чек-лист готовности к\u00a0ИИ\u2011трансформации", p: "15 вопросов: шаблоны, промты, метрики, хранение контента. Результат — три уровня готовности вашей команды.", btn: "Скачать", bg: "#EDEAFC", bdr: "#534AB7", fmt: "PDF", quote: "«Прошли всей командой за 20 минут. Стало понятно, с чего начинать»", author: "HRD, производство" },
  { t: "Как сформулировать запрос на\u00a0обучение", p: "Шаблон на одну страницу. 10 вопросов, которые стоит задать себе до разговора с L&D. Перешлите заказчику — первая встреча пройдёт вдвое продуктивнее.", btn: "Скачать", bg: "#FAECE7", bdr: "#D85A30", fmt: "PDF", quote: "«Переслал заказчику перед встречей — впервые получил внятное ТЗ»", author: "T&D-менеджер, банк" },
];

const magColors = ["var(--p-green)", "var(--p-blue)", "#534AB7", "#D85A30"];

export default function MagnetsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const d = magData[activeTab];
  const tabLabels = ["L&D", "HRD", "L&D-команда", "Бизнес"];

  return (
    <section className="magnets" id="magnets">
      <div className="wrap">
        <div className="s-label">Инструменты</div>
        <h2 className="s-title" style={{ marginBottom: 8 }}>Скачайте и используйте</h2>
        <p style={{ fontSize: 15, color: "var(--ink-soft)", marginBottom: 20 }}>Всё из моей практики. Берите — работает</p>

        <div className="mag-tabs-card" style={{ borderColor: magColors[activeTab] }}>
          <div className="mag-tabs">
            {tabLabels.map((label, i) => (
              <div
                key={i}
                className={`mag-tab${i === activeTab ? " active" : ""}`}
                onClick={() => setActiveTab(i)}
                style={i === activeTab ? { borderBottomColor: magColors[i] } : undefined}
              >
                <span className="mag-tab-dot" style={{ background: magColors[i] }} />
                {label}
              </div>
            ))}
          </div>
          <div className="mag-body">
            <div className="mag-body-left">
              <h3 dangerouslySetInnerHTML={{ __html: d.t }} />
              <p>{d.p}</p>
              <a
                href={d.link ?? "#"}
                target={d.link ? "_blank" : undefined}
                rel={d.link ? "noopener noreferrer" : undefined}
                className="btn btn-primary"
                style={{ background: d.bdr }}
              >
                {d.btn}
              </a>
            </div>
            <div className="mag-body-right">
              {d.screenshot ? (
                <div className="mag-preview" style={{ background: d.bg, border: `1px solid ${d.bdr}`, padding: 0, overflow: "hidden" }}>
                  <img src={d.screenshot} alt={d.t} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: "inherit" }} />
                </div>
              ) : (
                <div className="mag-preview" style={{ background: d.bg, border: `1px solid ${d.bdr}` }}>
                  <div className="mp-h" style={{ background: d.bdr }} />
                  <div className="mp-l" style={{ background: d.bdr }} />
                  <div className="mp-l" style={{ background: d.bdr }} />
                  <div className="mp-l short" style={{ background: d.bdr }} />
                  <div className="mp-l" style={{ background: d.bdr }} />
                  <div className="mp-l short" style={{ background: d.bdr }} />
                  <div className="mp-fmt" style={{ color: d.bdr }}>{d.fmt}</div>
                </div>
              )}
              <div className="mag-quote">
                {d.quote}
                <span className="mag-quote-author">{d.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
