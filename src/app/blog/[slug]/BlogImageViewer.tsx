"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useEffect, useState } from "react";

type BlogImageViewerProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  imageClassName?: string;
};

export default function BlogImageViewer({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = "100vw",
  imageClassName = "h-auto w-full",
}: BlogImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label={`View image: ${alt}`}
        title="View image"
        onClick={() => setIsOpen(true)}
        className="group relative block w-full cursor-zoom-in overflow-hidden text-left"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className={imageClassName}
        />
        <span className="pointer-events-none absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#101828]/80 text-white opacity-0 shadow-lg shadow-[#101828]/20 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 className="h-4 w-4" />
        </span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[100] bg-[#101828]/90 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Dismiss image"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 cursor-zoom-out"
          />
          <div className="relative z-10 flex h-full items-center justify-center p-4 sm:p-8">
            <div className="relative max-h-full w-full max-w-7xl">
              <button
                type="button"
                aria-label="Close image"
                title="Close image"
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#101828] shadow-xl shadow-[#101828]/25 transition hover:bg-[#eaf2fb] hover:text-[#2661ac]"
              >
                <X className="h-5 w-5" />
              </button>
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes="100vw"
                className="mx-auto max-h-[86vh] w-full rounded-[1.25rem] object-contain shadow-2xl shadow-[#101828]/35"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
