interface CasesSectionProps {
  onOpenLb: (caption: string) => void;
  onOpenPdf: (src: string) => void;
}

function CaseThumb({ label, onClick, green }: { label: string; onClick: () => void; green?: boolean }) {
  return (
    <div className="case-thumb" onClick={onClick} style={green ? { borderColor: "var(--p-green)" } : undefined}>
      {green ? (
        <svg className="ct-icon" viewBox="0 0 24 24" fill="none" stroke="#0D6B3F" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M9 15l2 2 4-4" />
        </svg>
      ) : (
        <svg className="ct-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 15l5-5 4 4 4-4 5 5" />
        </svg>
      )}
      <span className="ct-label">{label}</span>
    </div>
  );
}

export default function CasesSection({ onOpenLb, onOpenPdf }: CasesSectionProps) {
  return (
    <section className="cases" id="cases">
      <div className="arc" style={{ width: 320, height: 320, bottom: -100, right: -60, border: "1.5px solid #1F4E79", opacity: 0.14 }} />
      <div className="arc" style={{ width: 200, height: 200, top: -50, left: "15%", border: "1.5px dashed #1F4E79", opacity: 0.06 }} />
      <div className="wrap">
        <div className="s-label">Кейсы</div>
        <h2 className="s-title">Результаты, которые говорят за себя</h2>
        <p className="s-sub">Каждый проект — это измеримый результат для бизнеса</p>

        <div className="cases-top">
          <div className="case has-logo">
            <div style={{ position: "absolute", top: 20, right: 20, width: 56, height: 56, borderRadius: 10, background: "var(--sand)", border: "1px solid var(--p-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "var(--ink-muted)" }}>РЖД</div>
            <div className="case-client">Корпоративный университет РЖД</div>
            <h3>157 внутренних тренеров</h3>
            <p>Программа подготовки внутренних тренеров из числа руководителей. Архитектура, методика, сопровождение — полный цикл за 3 года.</p>
            <div className="pills">
              <span className="pill">157 тренеров</span>
              <span className="pill">9,9 / 10</span>
            </div>
            <div className="case-gallery">
              <CaseThumb label="Работа у флипчарта" onClick={() => onOpenLb("Работа у флипчарта")} />
              <CaseThumb label="Работа в группах" onClick={() => onOpenLb("Работа в группах")} />
              <CaseThumb label="Ведущая тренинга" onClick={() => onOpenLb("Ведущая тренинга")} />
              <CaseThumb label="Дискуссия" onClick={() => onOpenLb("Дискуссия")} />
              <CaseThumb label="Благодарность" onClick={() => onOpenPdf("/docs/rzd-blagodarnost-2022.pdf")} green />
            </div>
          </div>
          <div className="case" style={{ borderLeft: "3px solid var(--p-green)" }}>
            <h3>ИИ-инструмент для L&D</h3>
            <p>Рабочие веб-приложения для L&D. От идеи до готового продукта — без привлечения разработчиков.</p>
            <a href="#" className="card-link" style={{ color: "var(--p-green)" }}>Попробовать тренажёр развития аналитического мышления →</a>
          </div>
        </div>

        <div className="cases-bottom">
          <div className="case has-logo">
            <div style={{ position: "absolute", top: 20, right: 20, width: 56, height: 56, borderRadius: 10, background: "var(--sand)", border: "1px solid var(--p-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "var(--ink-muted)" }}>РЖД</div>
            <div className="case-client">Корпоративный университет РЖД</div>
            <h3>Контроль качества 178+ программ</h3>
            <p>Контроль качества, развивающая обратная связь авторам, методические рекомендации.</p>
            <div className="pills">
              <span className="pill">Все одобрены</span>
              <span className="pill">T2M −35%</span>
            </div>
            <div className="case-gallery">
              <CaseThumb label="Развивающая ОС" onClick={() => onOpenLb("Развивающая ОС")} />
              <CaseThumb label="Чек-лист" onClick={() => onOpenLb("Чек-лист")} />
              <CaseThumb label="Благодарность" onClick={() => onOpenLb("Благодарность")} />
              <CaseThumb label="Грамота" onClick={() => onOpenPdf("/docs/rzd-gramota-2024.pdf")} green />
            </div>
          </div>
          <div className="case has-logo">
            <div style={{ position: "absolute", top: 20, right: 20, width: 56, height: 56, borderRadius: 10, background: "var(--sand)", border: "1px solid var(--p-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "var(--ink-muted)" }}>МКБ</div>
            <div className="case-client">Московский кредитный банк</div>
            <h3>Годовая программа развития руководителей</h3>
            <p>Комплексная программа, одобренная Правлением Банка. Обучение 75 групп руководителей.</p>
            <div className="pills">
              <span className="pill">75 групп</span>
              <span className="pill">10 / 10</span>
            </div>
            <div className="case-gallery">
              <CaseThumb label="Фото с тренинга" onClick={() => onOpenLb("Фото с тренинга")} />
              <CaseThumb label="Стратегическая сессия" onClick={() => onOpenLb("Стратегическая сессия")} />
              <CaseThumb label="Анкеты обратной связи" onClick={() => onOpenLb("Анкеты обратной связи")} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
