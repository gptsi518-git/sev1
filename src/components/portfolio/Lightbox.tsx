import { useEffect, useCallback } from "react";

export interface GalleryItem {
  caption: string;
  imageSrc?: string;
}

interface LightboxProps {
  isOpen: boolean;
  caption: string;
  imageSrc?: string;
  gallery?: GalleryItem[];
  currentIndex?: number;
  onNavigate?: (index: number) => void;
  onClose: () => void;
}

export default function Lightbox({ isOpen, caption, imageSrc, gallery, currentIndex = 0, onNavigate, onClose }: LightboxProps) {
  const hasGallery = gallery && gallery.length > 1 && onNavigate;
  const canPrev = hasGallery && currentIndex > 0;
  const canNext = hasGallery && currentIndex < gallery.length - 1;

  const goPrev = useCallback(() => {
    if (canPrev && onNavigate) onNavigate(currentIndex - 1);
  }, [canPrev, onNavigate, currentIndex]);

  const goNext = useCallback(() => {
    if (canNext && onNavigate) onNavigate(currentIndex + 1);
  }, [canNext, onNavigate, currentIndex]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, goPrev, goNext]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <div className={`lightbox${isOpen ? " open" : ""}`} onClick={onClose}>
      <div className="lightbox-close" onClick={onClose}>&#x2715;</div>

      {canPrev && (
        <button
          className="lightbox-arrow lightbox-arrow-prev"
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          aria-label="Previous"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {canNext && (
        <button
          className="lightbox-arrow lightbox-arrow-next"
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          aria-label="Next"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      <div className="lightbox-img" onClick={(e) => e.stopPropagation()}>
        {imageSrc ? (
          <img src={imageSrc} alt={caption} style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: 8 }} />
        ) : (
          <div className="lightbox-placeholder">
            <div className="lp-h" />
            <div className="lp-l" />
            <div className="lp-l" />
            <div className="lp-l short" />
            <div className="lp-l" />
            <div className="lp-l" />
            <div className="lp-l short" />
            <div className="lp-l" />
            <div className="lp-l" />
            <div className="lp-l short" />
            <div className="lp-st" />
          </div>
        )}
      </div>
      <div className="lightbox-caption">
        {caption}
        {hasGallery && (
          <span style={{ marginLeft: 8, opacity: 0.5, fontSize: 13 }}>
            {currentIndex + 1} / {gallery.length}
          </span>
        )}
      </div>
    </div>
  );
}
