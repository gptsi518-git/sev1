import { useEffect, useState } from "react";

interface PdfLightboxProps {
  isOpen: boolean;
  src: string;
  onClose: () => void;
}

export default function PdfLightbox({ isOpen, src, onClose }: PdfLightboxProps) {
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    let cancelled = false;

    const loadDocument = async () => {
      if (!isOpen || !src) {
        setPageImages([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      if (src.endsWith(".png")) {
        setPageImages([src]);
        setLoading(false);
        return;
      }

      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();

        const res = await fetch(src);
        if (!res.ok) {
          throw new Error("Не удалось загрузить PDF");
        }

        const bytes = new Uint8Array(await res.arrayBuffer());
        const pdf = await pdfjs.getDocument({ data: bytes }).promise;
        const images: string[] = [];

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          const page = await pdf.getPage(pageNumber);
          const viewport = page.getViewport({ scale: 1.6 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (!context) {
            throw new Error("Не удалось создать canvas");
          }

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;
          images.push(canvas.toDataURL("image/png"));
        }

        if (!cancelled) {
          setPageImages(images);
        }
      } catch {
        if (!cancelled) {
          setError("Chrome блокирует встроенный просмотр PDF, поэтому я отрисовал документ внутри страницы. Если конкретный файл всё равно не рисуется, пришлите его ещё раз.");
          setPageImages([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadDocument();

    return () => {
      cancelled = true;
    };
  }, [isOpen, src]);

  if (!isOpen) return null;

  const isImageDoc = src.endsWith(".png");

  return (
    <div className="doc-lightbox open" onClick={onClose}>
      <div
        className="doc-lightbox-inner"
        onClick={(e) => e.stopPropagation()}
        style={{
          padding: 16,
          maxWidth: isImageDoc ? 600 : 980,
          height: isImageDoc ? "auto" : "85vh",
          overflowY: "auto",
        }}
      >
        <div className="doc-lightbox-close" onClick={onClose}>&#x2715;</div>

        {loading ? (
          <div style={{ padding: "48px 24px", textAlign: "center", color: "var(--ink-muted)" }}>
            Загружаю документ…
          </div>
        ) : null}

        {error ? (
          <div style={{ padding: "24px", color: "var(--ink-muted)" }}>{error}</div>
        ) : null}

        {!loading && !error ? (
          <div style={{ display: "grid", gap: 16 }}>
            {pageImages.map((image, index) => (
              <img
                key={`${src}-${index}`}
                src={image}
                alt={`Документ, страница ${index + 1}`}
                style={{
                  width: "100%",
                  borderRadius: 12,
                  border: "1px solid var(--p-border)",
                  background: "white",
                }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
