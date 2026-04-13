import { useEffect, useState } from "react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className={`p-nav${scrolled ? " scrolled" : ""}`}>
      <div className="wrap">
        <a href="#" className="nav-name">Елена Сидоренко</a>
        <div className="nav-links">
          <a href="#tasks" onClick={scrollTo("tasks")}>Задачи</a>
          <a href="#cases" onClick={scrollTo("cases")}>Кейсы</a>
          <a href="#experience" onClick={scrollTo("experience")}>Опыт</a>
          <a href="#contact" onClick={scrollTo("contact")} className="nav-cta">Обсудить задачу</a>
        </div>
      </div>
    </nav>
  );
}
