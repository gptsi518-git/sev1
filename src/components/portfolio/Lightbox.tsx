import { useEffect } from "react";

interface LightboxProps {
  isOpen: boolean;
  caption: string;
  imageSrc?: string;
  onClose: () => void;
}

export default function Lightbox({ isOpen, caption, imageSrc, onClose }: LightboxProps) {
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
    <div className={`lightbox${isOpen ? " open" : ""}`} onClick={onClose}>
      <div className="lightbox-close" onClick={onClose}>&#x2715;</div>
      <div className="lightbox-img">
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
      <div className="lightbox-caption">{caption}</div>
    </div>
  );
}
