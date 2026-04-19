import React, { useState, useRef, useEffect } from "react";
import { Button } from "./button";
import { useFormGallery } from "@/context/FormGalleryProvider";

const SLIDE_GAP = 1; // px

const FormGallery: React.FC = () => {
  const { slides, currentIndex, goToSlide, next } = useFormGallery();
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const updateWidth = () => setContainerWidth(el.clientWidth);
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const ready = containerWidth > 0 && slides.length > 0;
  const showNextButton = !slides[currentIndex]?.hasInternalNext;

  return (
    <div ref={containerRef} className="w-full h-full">
      {ready && (
        <>
          <div className="flex flex-row gap-2 justify-end p-2">
            {slides.map((_, i) => (
              <Button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-lg transition-all border border-primary duration-200 hover:bg-accent hover:border-accent ${
                  i === currentIndex
                    ? "h-4 w-16 border-accent bg-accent/20"
                    : "h-4 w-4"
                }`}
              />
            ))}
          </div>

          <div className="relative overflow-hidden h-full">
            <div
              className="flex transition-transform duration-300"
              style={{
                gap: `${SLIDE_GAP}px`,
                width:
                  containerWidth * slides.length +
                  SLIDE_GAP * (slides.length - 1),
                transform: `translateX(-${
                  currentIndex * (containerWidth + SLIDE_GAP)
                }px)`,
              }}
            >
              {slides.map((s, i) => (
                <div
                  key={i}
                  className="shrink-0"
                  style={{ width: containerWidth }}
                >
                  {s.content}
                </div>
              ))}
            </div>
          </div>

          {showNextButton && (
            <Button className="border-dark90" onClick={() => next()}>
              {currentIndex < slides.length - 1 ? "Next" : "Get Started"}
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default FormGallery;
