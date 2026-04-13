export default function TrustSection() {
  const items = [
    { num: "21+", label: "год в корп. обучении" },
    { num: "900+", label: "руководителей" },
    { num: "178+", label: "программ проверено" },
    { num: "−35%", label: "T2M с ИИ" },
  ];
  const logos = ["Сенеж", "РЖД", "Teamlab", "Будь здоров", "МКБ", "Ингосстрах", "ГК «СНС»", "МГУ"];

  return (
    <section className="trust">
      <div className="wrap">
        {items.map((it, i) => (
          <span key={i} style={{ display: "contents" }}>
            <div className="trust-item">
              <div className="trust-num">{it.num}</div>
              <div className="trust-label">{it.label}</div>
            </div>
            {i < items.length - 1 && <div className="trust-divider" />}
          </span>
        ))}
        <div className="trust-divider" />
        <div className="trust-logos">
          {logos.map((l) => (
            <div className="trust-logo" key={l}>{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
