import { useState, useRef, useCallback, useEffect } from "react";

interface TasksSectionProps {
  onOpenLb: (caption: string, imageSrc?: string) => void;
  onOpenDocLb: () => void;
}

const roleMap: Record<string, string[]> = {
  tc1: ["fr1", "fr2", "fr3"],
  tc2: ["fr2", "fr1"],
  tc3: ["fr1", "fr2", "fr4"],
};

const planMap: Record<string, number> = { tc1: 0, tc2: 1, tc3: 2 };
const themeMap: Record<string, string> = { tc1: "theme-blue", tc2: "theme-green", tc3: "theme-violet" };
const roleColors: Record<string, string> = { fr1: "#1F4E79", fr2: "#0D6B3F", fr3: "#D85A30", fr4: "#534AB7" };

const rolesData = [
  { id: "fr1", color: "#1F4E79", title: "Архитектор обучения", desc: "Полный цикл: от диагностики до оценки", icon: <><path d="M2 20h20" /><path d="M5 20V8l7-5 7 5v12" /><path d="M9 20v-6h6v6" /></> },
  { id: "fr2", color: "#0D6B3F", title: "ИИ-трансформация", desc: "ИИ на каждом этапе разработки", icon: <><circle cx="12" cy="12" r="3" /><path d="M12 2v4m0 12v4M2 12h4m12 0h4" /></> },
  { id: "fr3", color: "#D85A30", title: "Тренер-практик", desc: "Тренинги, практикумы, симуляции", icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></> },
  { id: "fr4", color: "#534AB7", title: "Executive-коуч", desc: "Карьерные переходы, управленческие вызовы", icon: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /><path d="M8 9h8M8 13h4" /></> },
];

function SmallThumb({ label, onClick, preview }: { label: string; onClick: () => void; preview?: string }) {
  return (
    <div
      onClick={onClick}
      style={{ width: 48, height: 36, borderRadius: 4, background: "var(--sand)", border: "1px solid var(--p-border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .15s", overflow: "hidden" }}
      onMouseOver={(e) => (e.currentTarget.style.borderColor = "var(--p-green)")}
      onMouseOut={(e) => (e.currentTarget.style.borderColor = "var(--p-border)")}
    >
      {preview ? (
        <img src={preview} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-muted)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 15l5-5 4 4 4-4 5 5" /></svg>
      )}
    </div>
  );
}

export default function TasksSection({ onOpenLb, onOpenDocLb }: TasksSectionProps) {
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [revealedRoles, setRevealedRoles] = useState<string[]>([]);
  const [showArr1, setShowArr1] = useState(false);
  const [showArr2, setShowArr2] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const svg1Ref = useRef<SVGSVGElement>(null);
  const svg2Ref = useRef<SVGSVGElement>(null);

  const theme = activeTask ? themeMap[activeTask] : "";

  const drawConnectors = useCallback((taskId: string, roles: string[]) => {
    const wrap = wrapRef.current;
    const svg1 = svg1Ref.current;
    const svg2 = svg2Ref.current;
    const taskEl = document.getElementById(taskId);
    if (!wrap || !svg1 || !svg2 || !taskEl) return;

    const wrapRect = wrap.getBoundingClientRect();
    const taskRect = taskEl.getBoundingClientRect();
    const taskCx = taskRect.left + taskRect.width / 2 - wrapRect.left;
    const w = wrapRect.width;

    svg1.setAttribute("viewBox", `0 0 ${w} 50`);
    svg2.setAttribute("viewBox", `0 0 ${w} 50`);
    svg1.innerHTML = "";
    svg2.innerHTML = "";

    const ns = "http://www.w3.org/2000/svg";
    const dot1 = document.createElementNS(ns, "circle");
    dot1.setAttribute("cx", String(taskCx)); dot1.setAttribute("cy", "2"); dot1.setAttribute("r", "3");
    dot1.setAttribute("fill", "#1F4E79"); dot1.setAttribute("opacity", ".35");
    svg1.appendChild(dot1);

    const planCx = w / 2;
    roles.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2 - wrapRect.left;
      const color = roleColors[id] || "#1F4E79";

      const p1 = document.createElementNS(ns, "path");
      p1.setAttribute("d", `M${taskCx} 4 C${taskCx} 28, ${cx} 28, ${cx} 46`);
      p1.setAttribute("stroke", color); p1.setAttribute("stroke-width", "1.5");
      p1.setAttribute("stroke-dasharray", "5 4"); p1.setAttribute("opacity", ".3");
      p1.setAttribute("fill", "none");
      svg1.appendChild(p1);

      const d1 = document.createElementNS(ns, "circle");
      d1.setAttribute("cx", String(cx)); d1.setAttribute("cy", "46"); d1.setAttribute("r", "3");
      d1.setAttribute("fill", color); d1.setAttribute("opacity", ".35");
      svg1.appendChild(d1);

      const p2 = document.createElementNS(ns, "path");
      p2.setAttribute("d", `M${cx} 2 C${cx} 24, ${planCx} 24, ${planCx} 46`);
      p2.setAttribute("stroke", color); p2.setAttribute("stroke-width", "1.5");
      p2.setAttribute("stroke-dasharray", "5 4"); p2.setAttribute("opacity", ".3");
      p2.setAttribute("fill", "none");
      svg2.appendChild(p2);
    });

    const dot2 = document.createElementNS(ns, "circle");
    dot2.setAttribute("cx", String(planCx)); dot2.setAttribute("cy", "46"); dot2.setAttribute("r", "4");
    dot2.setAttribute("fill", "#0D6B3F"); dot2.setAttribute("opacity", ".35");
    svg2.appendChild(dot2);
  }, []);

  const activateFlow = useCallback((taskId: string) => {
    setActiveTask(taskId);
    setRevealedRoles([]);
    setShowArr1(false);
    setShowArr2(false);
    setShowPlan(false);
    setShowReset(false);

    const roles = roleMap[taskId] || [];

    setTimeout(() => {
      drawConnectors(taskId, roles);
      setShowArr1(true);
    }, 100);

    roles.forEach((id, i) => {
      setTimeout(() => {
        setRevealedRoles((prev) => [...prev, id]);
      }, 300 + i * 200);
    });

    setTimeout(() => setShowArr2(true), 300 + roles.length * 200 + 100);
    setTimeout(() => { setShowPlan(true); setShowReset(true); }, 300 + roles.length * 200 + 300);
  }, [drawConnectors]);

  const resetFlow = () => {
    setActiveTask(null);
    setRevealedRoles([]);
    setShowArr1(false);
    setShowArr2(false);
    setShowPlan(false);
    setShowReset(false);
  };

  const tasks = [
    { id: "tc1", prio: true, title: "L&D не успевает за\u00a0запросами бизнеса?", desc: "Разрабатываю образовательные решения под ключ — от анализа потребностей до оценки результата. С\u00a0ИИ — в\u00a03\u00a0раза быстрее." },
    { id: "tc2", prio: false, title: "Не хватает инструментов для\u00a0работы L&D?", desc: "Разбираюсь, что нужно, и создаю — тренажёры, реестры, расписания, сайты обучения. Быстро, под ключ, без очереди в IT." },
    { id: "tc3", prio: false, title: "Руководители работают на\u00a0пределе?", desc: "Программы развития управленцев, командообразование, executive-коучинг. Системный подход." },
  ];

  return (
    <section className="tasks" id="tasks">
      <div className="arc" style={{ width: 380, height: 380, top: -140, left: -120, border: "1.5px solid #1F4E79", opacity: 0.16 }} />
      <div className="arc" style={{ width: 180, height: 180, bottom: -60, right: "10%", border: "1.5px dashed #B4B2A9", opacity: 0.07 }} />
      <div className="wrap" ref={wrapRef}>
        <div className="s-label">Ваша задача</div>
        <h2 className="s-title">Какую задачу вы решаете?</h2>
        <p className="s-sub">Нажмите на карточку — покажу, как могу помочь</p>

        <div className="tasks-grid">
          {tasks.map((t) => (
            <div
              key={t.id}
              id={t.id}
              className={`task-card${t.prio ? " prio" : ""}${activeTask === t.id ? ` active ${themeMap[t.id]}` : ""}`}
              onClick={() => activateFlow(t.id)}
            >
              <h3 dangerouslySetInnerHTML={{ __html: t.title }} />
              <p>{t.desc}</p>
              <div className="task-hint">Нажмите, чтобы увидеть решение →</div>
            </div>
          ))}
        </div>

        <div className={`flow-connectors${showArr1 ? " show" : ""}`}>
          <svg ref={svg1Ref} fill="none" />
        </div>

        <div className="flow-roles">
          {rolesData.map((r) => (
            <div
              key={r.id}
              id={r.id}
              className={`flow-role${revealedRoles.includes(r.id) ? " revealed" : ""}`}
              style={{ borderColor: r.color }}
            >
              <div className="spoiler" />
              <div className="fr-icon" style={{ borderColor: r.color, color: r.color }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{r.icon}</svg>
              </div>
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>

        <div className={`flow-connectors2${showArr2 ? " show" : ""}`}>
          <svg ref={svg2Ref} fill="none" />
        </div>

        {/* Plan 1 */}
        <div className={`flow-plan${showPlan && activeTask === "tc1" ? ` show ${theme}` : ""}`}>
          <div className="flow-plan-label">Возможное решение</div>
          <h4>Обучение под ключ с ускорением через ИИ</h4>
          <div className="flow-steps">
            <div className="flow-step"><b>1. Диагностика</b>Интервью с заказчиком, анализ ЦА, аудит текущих программ: что работает, что устарело</div>
            <div className="flow-step"><b>2. Архитектура</b>Проектирование программы под задачу бизнеса: структура, форматы, тайминг</div>
            <div className="flow-step"><b>3. Разработка с ИИ</b>Контент, материалы, тренажёры — с ИИ на каждом шаге</div>
            <div className="flow-step"><b>4. Масштабирование</b>Пилот, калибровка, подготовка внутренних тренеров, передача методики</div>
          </div>
          <div className="flow-example">
            <b>Пример: разработка программы нового формата для Сообщества внутренних тренеров КУ РЖД</b>
            Карточная онлайн-игра «Где моя граница?» — 84+ карточки, 8 категорий, балльная система. Тема — трудные разговоры и личные границы. Разработана с ИИ на каждом шаге ADDIE за 6 дней вместо месяца работы.
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            <div
              onClick={onOpenDocLb}
              style={{ width: 80, height: 100, borderRadius: 8, background: "var(--sand)", border: "1px solid var(--p-border)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s", gap: 4 }}
              onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "var(--p-green)"; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "var(--p-border)"; }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ink-muted)" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h8M8 17h5" /></svg>
              <span style={{ fontSize: 11, color: "var(--ink-muted)", fontWeight: 500 }}>Кейс</span>
            </div>
            {[
              { label: "Главный экран", preview: "/images/game-main-screen.png" },
              { label: "Карточка" },
              { label: "Процесс игры" },
            ].map(({ label, preview }) => (
              <div
                key={label}
                onClick={() => onOpenLb(`Скрин игры — ${label.toLowerCase()}`, preview)}
                style={{ width: 120, height: 100, borderRadius: 8, background: "var(--sand)", border: "1px solid var(--p-border)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s", gap: 4, overflow: "hidden" }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "var(--p-green)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "var(--p-border)"; }}
              >
                {preview ? (
                  <img src={preview} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ink-muted)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 15l5-5 4 4 4-4 5 5" /></svg>
                    <span style={{ fontSize: 11, color: "var(--ink-muted)", fontWeight: 500 }}>{label}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Plan 2 */}
        <div className={`flow-plan${showPlan && activeTask === "tc2" ? ` show ${theme}` : ""}`}>
          <div className="flow-plan-label">Возможное решение</div>
          <h4>Диагностика узкого места → готовый инструмент</h4>
          <div className="flow-steps">
            <div className="flow-step"><b>1. Диагностика</b>Нахожу, где L&D теряет время, качество или масштаб. Что можно автоматизировать, что усилить, что создать с нуля</div>
            <div className="flow-step"><b>2. Проектирование</b>Подбираю решение под задачу: веб-приложение, тренажёр, интерактивный инструмент</div>
            <div className="flow-step"><b>3. Разработка</b>Собираю рабочий продукт сама — от логики до интерфейса. Вы получаете готовый инструмент, а не макет</div>
            <div className="flow-step"><b>4. Запуск и передача</b>Внедряю, обучаю команду, собираю обратную связь, дорабатываю</div>
          </div>
          <div className="flow-example">
            <b>Примеры продуктов под задачу:</b>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
              <div style={{ padding: 14, borderRadius: 8, background: "var(--p-white)", border: "1px solid var(--p-border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,var(--green-pale),var(--p-green))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                  </div>
                  <b style={{ fontSize: 14, color: "var(--p-green)" }}>Тренажёр аналитического мышления</b>
                </div>
                <span style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5, display: "block", marginBottom: 10 }}>Участник получает кейс с данными, анализирует, принимает решение, получает балл и рекомендации</span>
                <a href="#" style={{ fontSize: 13, fontWeight: 600, color: "var(--p-green)", textDecoration: "none" }}>Попробовать тренажёр →</a>
              </div>
              <div style={{ padding: 14, borderRadius: 8, background: "var(--p-white)", border: "1px solid var(--p-border)" }}>
                <b style={{ fontSize: 14, color: "var(--p-green)", display: "block", marginBottom: 6 }}>Реестр учебно-методических материалов</b>
                <span style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5, display: "block", marginBottom: 10 }}>Поиск, фильтры, карточки программ: аудитория, формат, автор, статус. ИИ проверяет актуальность и сигнализирует о дублировании</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <SmallThumb label="Реестр УММ — главный экран" preview="/images/reestr-main-screen.png" onClick={() => onOpenLb("Реестр УММ — главный экран", "/images/reestr-main-screen.png")} />
                  <SmallThumb label="Реестр УММ — дашборд" preview="/images/reestr-dashboard.png" onClick={() => onOpenLb("Реестр УММ — дашборд", "/images/reestr-dashboard.png")} />
                  <SmallThumb label="Реестр УММ — справочники" preview="/images/reestr-handbook.png" onClick={() => onOpenLb("Реестр УММ — справочники", "/images/reestr-handbook.png")} />
                </div>
              </div>
              <div style={{ padding: 14, borderRadius: 8, background: "var(--p-white)", border: "1px solid var(--p-border)" }}>
                <b style={{ fontSize: 14, color: "var(--p-green)", display: "block", marginBottom: 6 }}>Расписание центра</b>
                <span style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5, display: "block", marginBottom: 10 }}>Интерактивная доска: фильтры по программе, тренеру, формату. Автоматическое распределение по аудиториям. Администратор управляет за минуты</span>
                <div style={{ display: "flex", gap: 6 }}>
                  {["Расписание — общий вид", "Расписание — фильтры", "Расписание — админ-панель"].map((l) => (
                    <SmallThumb key={l} label={l} onClick={() => onOpenLb(l)} />
                  ))}
                </div>
              </div>
              <div style={{ padding: 14, borderRadius: 8, background: "var(--p-white)", border: "1px solid var(--p-border)" }}>
                <b style={{ fontSize: 14, color: "var(--p-green)", display: "block", marginBottom: 6 }}>Сайт образовательных продуктов</b>
                <span style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5, display: "block", marginBottom: 10 }}>Каталог программ для внутреннего или внешнего клиента: описания, отзывы, форма заявки. L&D становится провайдером с профессиональным лицом</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,var(--p-blue),var(--blue-deep))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 8h8M8 12h5" /><circle cx="16" cy="16" r="2" /></svg>
                  </div>
                  <a href="https://teamlab.ru" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, color: "var(--p-green)", textDecoration: "none" }}>Пример: сайт по командообразованию →</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plan 3 */}
        <div className={`flow-plan${showPlan && activeTask === "tc3" ? ` show ${theme}` : ""}`}>
          <div className="flow-plan-label">Возможное решение</div>
          <h4>Программа развития управленцев: от навыков к поведению</h4>
          <div className="flow-steps">
            <div className="flow-step"><b>1. Диагностика</b>Глубинные интервью с руководителями и командами, выявление управленческих дефицитов</div>
            <div className="flow-step"><b>2. Модульная программа</b>Коммуникация, обратная связь, ситуационное лидерство, командообразование — под задачи участников</div>
            <div className="flow-step"><b>3. Живые форматы</b>Карточные симуляции, практикумы, ролевые кейсы из реальной практики участников</div>
            <div className="flow-step"><b>4. Сопровождение</b>Коуч-сессии: карьерные переходы, стресс, управленческие вызовы. Замер поведенческих изменений</div>
          </div>
          <div className="flow-example"><b>Пример: МКБ</b>Годовая программа, согласованная с Правлением банка. 75 групп обучено. Средний балл 9,9/10. Положительная обратная связь от Первого заместителя Председателя Правления.</div>
        </div>

        <div className={`flow-reset${showReset ? " show" : ""}`} onClick={resetFlow}>↺ Сбросить</div>
      </div>
    </section>
  );
}
