import { useEffect } from "react";

interface DocLightboxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DocLightbox({ isOpen, onClose }: DocLightboxProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <div className={`doc-lightbox${isOpen ? " open" : ""}`} onClick={onClose}>
      <div className="doc-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <div className="doc-lightbox-close" onClick={onClose}>&#x2715;</div>
        <p style={{ fontSize: 12, fontWeight: 600, color: "var(--p-green)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 6 }}>Кейс</p>
        <h2>Онлайн-игра «Где моя граница?»</h2>
        <p style={{ color: "var(--ink-muted)", fontStyle: "italic", marginBottom: 24 }}>Новый формат для сообщества внутренних тренеров · ИИ на каждом шаге ADDIE</p>

        <div className="dl-accent">
          <strong>Контекст.</strong> В сообществе внутренних бизнес-тренеров КУ РЖД возник запрос на практикум по теме «Трудные разговоры». Стандартный тренинг с ролевыми играми вызывает сопротивление. Нужен формат, в который люди входят добровольно.<br /><br />
          <strong>Решение.</strong> Карточная онлайн-игра на платформе Holst. 84+ карточки, 8 категорий, балльная система, карты помощи.<br /><br />
          <strong>Масштаб.</strong> Полноценный образовательный продукт, готовый к тиражированию внутренними ведущими.
        </div>

        <h3>A — Analysis: понять запрос и аудиторию</h3>
        <div className="dl-step"><b>ИИ:</b><span> Сгенерировал 18 типичных ситуаций нарушения границ и 7 барьеров. Предложил гипотезы по формату.</span></div>
        <div className="dl-step"><b>Я:</b><span> Валидировала через опыт 460+ коуч-сессий. Отобрала 6 ключевых ситуаций. Приняла решение: карточная игра, а не тренинг.</span></div>
        <p className="dl-meta">Экономия: 2 часа вместо 6–8</p>

        <h3>D — Design: архитектура игры</h3>
        <div className="dl-step"><b>ИИ:</b><span> Предложил варианты категорий и механик. Сгенерировал балльную систему с нарастанием сложности.</span></div>
        <div className="dl-step"><b>Я:</b><span> Выбрала 8 типов карточек: Опыт → Ситуации → Обсуждение → Провокации → Кейсы → Ресурсы → Действия → Рефлексия. Интегрировала карты помощи как элемент психологической безопасности.</span></div>
        <p className="dl-meta">Экономия: 3 часа вместо 10–12</p>

        <h3>D — Development: 84+ карточки</h3>
        <div className="dl-step"><b>ИИ:</b><span> Работал как конвейер: черновики вопросов, мини-сценарии, провокационные утверждения, задания на неделю. По 15–20 вариантов на каждую категорию.</span></div>
        <div className="dl-step"><b>Я:</b><span> Отбирала, переписывала ~30% (убирала книжный тон), калибровала градус провокаций. Каждую карточку проверяла: «не навредит ли в группе?». Собрала игру на Holst вайбкодингом.</span></div>
        <p className="dl-meta">Экономия: 14 часов вместо 40–50</p>

        <h3>I — Implementation: запуск</h3>
        <div className="dl-step"><b>ИИ:</b><span> Подготовил сценарий для ведущего, адаптации под разные группы, FAQ на сложные ситуации.</span></div>
        <div className="dl-step"><b>Я:</b><span> Провела первые сессии. Обучила внутренних ведущих. Карточная игра работает через живой контакт.</span></div>

        <h3>E — Evaluation: результаты</h3>
        <div className="dl-step"><b>ИИ:</b><span> Обработал обратную связь: выделил лидеров по вовлечённости, нашёл 6 абстрактных карточек, помог переформулировать.</span></div>
        <div className="dl-step"><b>Я:</b><span> Интерпретировала наблюдения за живыми группами. Приняла решения о доработке. Спланировала тиражирование.</span></div>
        <p className="dl-meta">Экономия: 2 часа вместо 6</p>

        <table>
          <thead>
            <tr><th>Этап</th><th>Без ИИ</th><th>С ИИ</th><th>Экономия</th></tr>
          </thead>
          <tbody>
            <tr><td>Analysis</td><td>6–8 ч</td><td>2 ч</td><td>~70%</td></tr>
            <tr><td>Design</td><td>10–12 ч</td><td>3 ч</td><td>~75%</td></tr>
            <tr><td>Development</td><td>40–50 ч</td><td>14 ч</td><td>~70%</td></tr>
            <tr><td>Implementation</td><td>—</td><td>—</td><td>—</td></tr>
            <tr><td>Evaluation</td><td>6 ч</td><td>2 ч</td><td>~65%</td></tr>
            <tr className="dl-total"><td>Итого</td><td>~65 ч</td><td>~21 ч</td><td>~68%</td></tr>
          </tbody>
        </table>

        <div className="dl-accent" style={{ marginTop: 24 }}>
          <em>ИИ сделал возможным то, что раньше было слишком трудоёмким — создать 84 уникальных карточки, калиброванных по глубине и безопасности. Без ИИ — проект на два месяца. С ИИ — три недели от идеи до первой сессии.</em>
        </div>

        <p style={{ textAlign: "right", color: "var(--ink-muted)", fontStyle: "italic", fontSize: 13, marginTop: 20, marginBottom: 0 }}>Елена Сидоренко · Learning Architect</p>
      </div>
    </div>
  );
}
