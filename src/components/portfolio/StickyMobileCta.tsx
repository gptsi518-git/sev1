import { useEffect, useState } from "react";

export default function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const obs = new IntersectionObserver(([e]) => {
      setVisible(!e.isIntersecting);
    }, { threshold: 0 });
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="sticky-mob" style={{ display: visible ? "block" : "none" }}>
      <a href="#contact" className="btn btn-primary" onClick={scrollTo}>Обсудить вашу задачу</a>
    </div>
  );
}
