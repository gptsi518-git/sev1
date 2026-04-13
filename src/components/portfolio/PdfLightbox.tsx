import { useEffect } from "react";

interface PdfLightboxProps {
  isOpen: boolean;
  src: string;
  onClose: () => void;
}

export default function PdfLightbox({ isOpen, src, onClose }: PdfLightboxProps) {
  useEffect(() => {
    if (!isOpen || !src) return;

    if (src.endsWith(".png")) return; // show in lightbox

    // For PDFs — open in new tab via blob to avoid cross-origin blocking
    const openPdf = async () => {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error("fetch failed");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      } catch {
        window.open(src, "_blank");
      }
      onClose();
    };
    openPdf();
  }, [isOpen, src, onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    const show = isOpen && src.endsWith(".png");
    document.body.style.overflow = show ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, src]);

  // Only render lightbox overlay for images (PNG)
  if (!isOpen || !src.endsWith(".png")) return null;

  return (
    <div className="doc-lightbox open" onClick={onClose}>
      <div
        className="doc-lightbox-inner"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: 16, maxWidth: 600 }}
      >
        <div className="doc-lightbox-close" onClick={onClose}>&#x2715;</div>
        <img src={src} alt="Сертификат" style={{ width: "100%", borderRadius: 12 }} />
      </div>
    </div>
  );
}
