import { useEffect, useState, useRef } from "react";

interface PdfLightboxProps {
  isOpen: boolean;
  src: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
}

export default function PdfLightbox({ isOpen, src, onClose, onPrev, onNext, canPrev, canNext }: PdfLightboxProps) {
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const abortRef = useRef(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && canPrev && onPrev) onPrev();
      if (e.key === "ArrowRight" && canNext && onNext) onNext();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext, canPrev, canNext]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    abortRef.current = false;

    if (!isOpen || !src) {
      setPageImages([]);
      setLoading(false);
      setErrorMsg(null);
      return;
    }

    if (src.endsWith(".png")) {
      setPageImages([src]);
      setLoading(false);
      setErrorMsg(null);
      return;
    }

    const renderPdf = async () => {
      setLoading(true);
      setErrorMsg(null);
      setPageImages([]);

      try {
        const pdfjs = await import("pdfjs-dist");

        // Use the bundled worker via static import URL
        const workerUrl = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
        pdfjs.GlobalWorkerOptions.workerSrc = workerUrl.default;

        const response = await fetch(src);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();

        const pdf = await pdfjs.getDocument({
          data: new Uint8Array(arrayBuffer),
        }).promise;

        const images: string[] = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          if (abortRef.current) return;

          const page = await pdf.getPage(i);
          const scale = 2;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("Canvas context failed");

          await page.render({ canvas, canvasContext: ctx, viewport }).promise;
          images.push(canvas.toDataURL("image/png"));
        }

        if (!abortRef.current) {
          setPageImages(images);
        }
      } catch (err) {
        console.error("PDF render error:", err);
        if (!abortRef.current) {
          setErrorMsg("Не удалось отрисовать PDF. Попробуйте открыть файл напрямую.");
        }
      } finally {
        if (!abortRef.current) {
          setLoading(false);
        }
      }
    };

    renderPdf();

    return () => {
      abortRef.current = true;
    };
  }, [isOpen, src]);

  if (!isOpen) return null;

  const isPng = src.endsWith(".png");

  return (
    <div className="doc-lightbox open" onClick={onClose}>
      <div
        className="doc-lightbox-inner"
        onClick={(e) => e.stopPropagation()}
        style={{
          padding: 16,
          maxWidth: isPng ? 600 : 980,
          height: isPng ? "auto" : "85vh",
          overflowY: "auto",
        }}
      >
        <div className="doc-lightbox-close" onClick={onClose}>&#x2715;</div>

        {loading && (
          <div style={{ padding: "48px 24px", textAlign: "center", color: "var(--ink-muted)" }}>
            Загружаю документ…
          </div>
        )}

        {errorMsg && (
          <div style={{ padding: "24px", textAlign: "center" }}>
            <p style={{ color: "var(--ink-muted)", marginBottom: 12 }}>{errorMsg}</p>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--p-blue)", textDecoration: "underline" }}
            >
              Скачать PDF
            </a>
          </div>
        )}

        {!loading && !errorMsg && pageImages.length > 0 && (
          <div style={{ display: "grid", gap: 16 }}>
            {pageImages.map((dataUrl, idx) => (
              <img
                key={idx}
                src={dataUrl}
                alt={`Страница ${idx + 1}`}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  border: "1px solid var(--p-border)",
                  background: "white",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
