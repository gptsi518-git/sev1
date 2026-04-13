import { useEffect } from "react";

interface PdfLightboxProps {
  isOpen: boolean;
  src: string;
  onClose: () => void;
}

export default function PdfLightbox({ isOpen, src, onClose }: PdfLightboxProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isPng = src.endsWith(".png");

  return (
    <div className={`doc-lightbox${isOpen ? " open" : ""}`} onClick={onClose}>
      <div
        className="doc-lightbox-inner"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: 0, maxWidth: isPng ? 600 : 900 }}
      >
        <div className="doc-lightbox-close" onClick={onClose}>&#x2715;</div>
        {isPng ? (
          <img src={src} alt="Сертификат" style={{ width: "100%", borderRadius: 12 }} />
        ) : (
          <iframe
            src={src}
            title="Документ"
            style={{ width: "100%", height: "80vh", border: "none", borderRadius: 12 }}
          />
        )}
      </div>
    </div>
  );
}
