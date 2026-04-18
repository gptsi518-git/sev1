import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import NavBar from "../components/portfolio/NavBar";
import HeroSection from "../components/portfolio/HeroSection";
import TrustSection from "../components/portfolio/TrustSection";
import TasksSection from "../components/portfolio/TasksSection";
import CasesSection from "../components/portfolio/CasesSection";
import ExperienceSection from "../components/portfolio/ExperienceSection";
import MagnetsSection from "../components/portfolio/MagnetsSection";
import ContactSection from "../components/portfolio/ContactSection";
import FooterSection from "../components/portfolio/FooterSection";
import StickyMobileCta from "../components/portfolio/StickyMobileCta";
import Lightbox from "../components/portfolio/Lightbox";
import type { GalleryItem } from "../components/portfolio/Lightbox";
import DocLightbox from "../components/portfolio/DocLightbox";
import PdfLightbox from "../components/portfolio/PdfLightbox";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Елена Сидоренко — Learning Architect · ИИ-трансформация L&D" },
      { name: "description", content: "От стратегии обучения до коучинга руководителей — программы, которые меняют поведение и дают бизнес-результат. 15+ лет, 900+ руководителей." },
    ],
  }),
});

function Index() {
  const [lbOpen, setLbOpen] = useState(false);
  const [lbCaption, setLbCaption] = useState("");
  const [lbImage, setLbImage] = useState("");
  const [lbGallery, setLbGallery] = useState<GalleryItem[]>([]);
  const [lbIndex, setLbIndex] = useState(0);
  const [docLbOpen, setDocLbOpen] = useState(false);
  const [pdfSrc, setPdfSrc] = useState("");
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfNav, setPdfNav] = useState<{ onPrev?: () => void; onNext?: () => void; canPrev?: boolean; canNext?: boolean }>({});

  const openLb = useCallback((caption: string, imageSrc?: string, gallery?: GalleryItem[], index?: number) => {
    setLbCaption(caption);
    setLbImage(imageSrc || "");
    setLbGallery(gallery || []);
    setLbIndex(index ?? 0);
    setLbOpen(true);
  }, []);

  const handleNavigate = useCallback((index: number) => {
    if (lbGallery[index]) {
      setLbIndex(index);
      setLbCaption(lbGallery[index].caption);
      setLbImage(lbGallery[index].imageSrc || "");
    }
  }, [lbGallery]);

  const openPdf = useCallback((src: string, nav?: { onPrev?: () => void; onNext?: () => void; canPrev?: boolean; canNext?: boolean }) => {
    setPdfSrc(src);
    setPdfNav(nav || {});
    setPdfOpen(true);
  }, []);

  return (
    <>
      <NavBar />
      <HeroSection />
      <TrustSection />
      <TasksSection onOpenLb={openLb} onOpenDocLb={() => setDocLbOpen(true)} />
      <CasesSection onOpenLb={openLb} onOpenPdf={openPdf} />
      <ExperienceSection onOpenPdf={openPdf} />
      <MagnetsSection />
      <ContactSection />
      <FooterSection />
      <StickyMobileCta />
      <Lightbox
        isOpen={lbOpen}
        caption={lbCaption}
        imageSrc={lbImage}
        gallery={lbGallery}
        currentIndex={lbIndex}
        onNavigate={handleNavigate}
        onClose={() => setLbOpen(false)}
      />
      <DocLightbox isOpen={docLbOpen} onClose={() => setDocLbOpen(false)} />
      <PdfLightbox isOpen={pdfOpen} src={pdfSrc} onClose={() => setPdfOpen(false)} />
    </>
  );
}
