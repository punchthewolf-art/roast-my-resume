"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/LanguageContext";

export default function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState("");
  const router = useRouter();
  const { t, locale } = useTranslation();

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);

      // Validate file
      if (file.type !== "application/pdf") {
        setError(t("upload.error.pdf"));
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError(t("upload.error.size"));
        return;
      }

      setIsUploading(true);
      setProgress(t("upload.progress1"));

      try {
        // Upload PDF
        const formData = new FormData();
        formData.append("file", file);

        setProgress(t("upload.progress2"));
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          const data = await uploadRes.json();
          throw new Error(data.error || "Upload failed");
        }

        const { text } = await uploadRes.json();

        setProgress(t("upload.progress3"));

        // Call roast API with locale
        const roastRes = await fetch("/api/roast", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, locale }),
        });

        if (!roastRes.ok) {
          const data = await roastRes.json();
          throw new Error(data.error || "Roast failed");
        }

        const { id } = await roastRes.json();

        // Redirect to roast result
        router.push(`/roast/${id}`);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : t("upload.error.generic")
        );
        setIsUploading(false);
        setProgress("");
      }
    },
    [router, t, locale]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  if (isUploading) {
    return (
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-card-border bg-card-bg p-12">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl fire-bounce">🔥</span>
          </div>
        </div>
        <p className="text-lg text-muted">{progress}</p>
        <div className="h-2 w-64 overflow-hidden rounded-full bg-card-border">
          <div className="h-full animate-pulse rounded-full bg-accent" style={{ width: "60%" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl">
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex cursor-pointer flex-col items-center gap-4 rounded-2xl border-2 border-dashed p-12 transition-all duration-300 ${
          isDragging
            ? "border-accent bg-accent/10 scale-[1.02]"
            : "border-card-border bg-card-bg hover:border-accent/50 hover:bg-card-bg/80 upload-zone-idle"
        }`}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
          <svg
            className="h-10 w-10 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">
            {isDragging ? t("upload.dragging") : t("upload.idle")}
          </p>
          <p className="mt-1 text-sm text-muted">
            {t("upload.browse")}
          </p>
        </div>
        <input
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={handleInputChange}
        />
      </label>

      {error && (
        <div className="mt-4 rounded-lg border border-danger/30 bg-danger/10 p-3 text-center text-sm text-danger">
          {error}
        </div>
      )}
    </div>
  );
}
