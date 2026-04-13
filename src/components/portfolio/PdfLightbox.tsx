import { useEffect, useState } from "react";

interface PdfLightboxProps {
  isOpen: boolean;
  src: string;
  onClose: () => void;
}

export default function PdfLightbox({ isOpen, src, onClose }: PdfLightboxProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !src) {
      setBlobUrl(null);
      return;
    }

    if (src.endsWith(".png")) {
      setBlobUrl(src);
      return;
    }

    let revoke = "";
    const load = async () => {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error("fetch failed");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        revoke = url;
        setBlobUrl(url);
      } catch {
        setBlobUrl(src);
      }
    };
    load();

    return () => {
      if (revoke) URL.revokeObjectURL(revoke);
    };
  }, [isOpen, src]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen || !blobUrl) return null;

  const isPng = src.endsWith(".png");

  return (
    <div className="doc-lightbox open" onClick={onClose}>
      <div
        className="doc-lightbox-inner"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: isPng ? 16 : 0, maxWidth: isPng ? 600 : 900, height: isPng ? "auto" : "85vh" }}
      >
        <div className="doc-lightbox-close" onClick={onClose}>&#x2715;</div>
        {isPng ? (
          <img src={blobUrl} alt="Сертификат" style={{ width: "100%", borderRadius: 12 }} />
        ) : (
          <iframe
            src={blobUrl}
            title="Документ"
            style={{ width: "100%", height: "100%", border: "none", borderRadius: 12 }}
          />
        )}
      </div>
    </div>
  );
}
