import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Slide {
  title: string;
  content: React.ReactNode;
  hasInternalNext?: boolean;
}

interface FormGalleryContextValue {
  slides: Slide[];
  currentIndex: number;
  completed: boolean[];
  slideData: Record<number, any>;
  goToSlide: (i: number) => void;
  next: (data?: any) => void;
}

const FormGalleryContext = createContext<FormGalleryContextValue | undefined>(undefined);

export function useFormGallery() {
  const ctx = useContext(FormGalleryContext);
  if (!ctx) throw new Error("useFormGallery must be used within a FormGalleryProvider");
  return ctx;
}

interface ProviderProps {
  slides: Slide[];
  onFinish?: () => void | Promise<void>;
  children: React.ReactNode;
  finishPath?: string; // optional fallback route
}

export function FormGalleryProvider({
  slides,
  onFinish,
  children,
  finishPath = "/",
}: ProviderProps) {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>(() => slides.map(() => false));
  const [slideData, setSlideData] = useState<Record<number, any>>({});

  // ✅ keep completed length in sync if slides length changes (no reset)
  useEffect(() => {
    setCompleted((prev) => {
      if (prev.length === slides.length) return prev;
      if (prev.length < slides.length) return [...prev, ...Array(slides.length - prev.length).fill(false)];
      return prev.slice(0, slides.length);
    });

    // ✅ clamp index if needed
    setCurrentIndex((i) => Math.min(i, Math.max(0, slides.length - 1)));
  }, [slides.length]);

  const goToSlide = (i: number) => {
    setCurrentIndex(() => {
      if (i < 0) return 0;
      if (i > slides.length - 1) return slides.length - 1;
      return i;
    });
  };

  const next = async (data?: any) => {
    setCompleted((prev) => {
      const arr = [...prev];
      arr[currentIndex] = true;
      return arr;
    });

    if (data !== undefined) {
      setSlideData((prev) => ({ ...prev, [currentIndex]: data }));
    }

    const nextIndex = currentIndex + 1;

    if (nextIndex < slides.length) {
      setCurrentIndex(nextIndex);
      return;
    }

    if (onFinish) {
      await onFinish();
      return;
    }
    navigate(finishPath, { replace: true });
  };

  const value = useMemo(
    () => ({ slides, currentIndex, completed, slideData, goToSlide, next }),
    [slides, currentIndex, completed, slideData],
  );

  return <FormGalleryContext.Provider value={value}>{children}</FormGalleryContext.Provider>;
}
