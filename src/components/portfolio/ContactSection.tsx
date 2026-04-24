import { useState } from "react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Спасибо! Заявка отправлена. Обычно отвечаю в течение дня.");
    (e.target as HTMLFormElement).reset();
    setSubmitted(false);
  };

  return (
    <section className="contact" id="contact">
      <div className="arc" style={{ width: 280, height: 280, bottom: -100, left: "40%", border: "1.5px solid #0D6B3F", opacity: 0.10 }} />
      <div className="arc" style={{ width: 160, height: 160, top: -40, left: -40, border: "1.5px dashed #1F4E79", opacity: 0.06 }} />
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-left">
            <h2>Обсудим вашу&nbsp;задачу</h2>
            <p className="sub">Расскажите, что нужно — предложу формат и оценю сроки. Обычно отвечаю в течение дня.<br />Работаю с компаниями и индивидуально с руководителями.</p>
            <div className="c-item"><strong>Телефон</strong> 8-926-258-29-05</div>
            <div className="c-item"><strong>Email</strong> <span>sev1coaching@gmail.com</span></div>
            <div className="c-item"><a href="#" className="card-link">Написать в LinkedIn →</a></div>
            <div style={{ marginTop: 24 }}>
              <div style={{ width: 220, height: 220, borderRadius: "50%", border: "2px solid var(--p-border)", overflow: "hidden", position: "relative" }}>
                <img
                  src="/images/portrait-msu.jpg"
                  alt="Фото Елены"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", transform: "scale(1.55) translateY(-12%)", transformOrigin: "center top", display: "block" }}
                />
              </div>
            </div>
          </div>
          <div className="form-box">
            <form onSubmit={handleSubmit}>
              <label>Имя</label>
              <input type="text" placeholder="Как вас зовут?" />
              <label>Компания</label>
              <input type="text" placeholder="Название компании" />
              <label>Какая задача?</label>
              <select defaultValue="">
                <option value="" disabled>Выберите тип задачи</option>
                <option>Разработка обучения</option>
                <option>ИИ-трансформация L&D</option>
                <option>Тренинг</option>
                <option>Индивидуальный коучинг</option>
                <option>Другое</option>
              </select>
              <label>Email</label>
              <input type="email" placeholder="your@email.com" />
              <label>Телефон <span style={{ fontWeight: 400, color: "var(--ink-muted)" }}>(необязательно)</span></label>
              <input type="tel" placeholder="+7" />
              <button type="submit" className="btn btn-primary">Обсудить вашу задачу</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
