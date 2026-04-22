import elenaPhoto from "@/assets/elena-white.jpg";

export default function HeroSection() {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section className="hero" id="hero">
        <div className="hero-curves">
          <svg viewBox="0 0 800 300" fill="none" preserveAspectRatio="none">
            <path d="M0 275 C180 275,250 220,400 195 S600 155,800 135" stroke="#B4B2A9" strokeWidth="1.2" strokeDasharray="8 6" opacity=".15" />
            <path d="M0 250 C200 240,300 180,440 160 S640 110,800 85" stroke="#1F4E79" strokeWidth="1.2" strokeDasharray="8 6" opacity=".10" />
            <path d="M0 225 C220 210,340 140,480 120 S660 65,800 40" stroke="#0D6B3F" strokeWidth="1" strokeDasharray="6 5" opacity=".07" />
          </svg>
        </div>
        <div className="wrap">
          <div className="hero-content">
            <div className="hero-label">Learning Architect</div>
            <h1>Обучение, которое <em>меняет поведение</em> и&nbsp;даёт бизнес&#8209;результат</h1>
            <p className="hero-sub">От стратегии и архитектуры программ до коучинга руководителей — системно, с ИИ на каждом этапе.</p>
            <div className="hero-ctas">
              <a href="#contact" className="btn btn-primary" onClick={scrollTo("contact")}>Обсудить вашу задачу</a>
            </div>
          </div>
          <div className="hero-photo">
            <img src={elenaPhoto} alt="Елена Сидоренко" className="hero-photo-img" />
          </div>
        </div>
        <div className="hero-line" />
      </section>
    </>
  );
}
