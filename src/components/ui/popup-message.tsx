import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

export type PopupPosition =
  | "top-center"
  | "top-left"
  | "top-right"
  | "bottom-center"
  | "bottom-left"
  | "bottom-right";

export interface PopupMessageOptions {
  title?: string;
  content?: ReactNode;
  durationMs?: number;
  position?: PopupPosition;
  className?: string;
}

interface PopupMessageItem {
  id: number;
  title?: string;
  message?: string;
  content?: ReactNode;
  isVisible: boolean;
  position: PopupPosition;
  className?: string;
}

interface PopupMessageContextValue {
  showPopup: (messageOrContent: ReactNode, options?: PopupMessageOptions) => number;
}

const POPUP_DEFAULT_DURATION_MS = 3200;
const POPUP_FADE_DURATION_MS = 280;
const POPUP_DEFAULT_POSITION: PopupPosition = "top-center";

const PopupMessageContext = createContext<PopupMessageContextValue | null>(null);

const popupViewportPositionClasses: Record<PopupPosition, string> = {
  "top-center": "inset-x-0 top-4 items-center",
  "top-left": "left-4 top-4 items-start",
  "top-right": "right-4 top-4 items-end",
  "bottom-center": "inset-x-0 bottom-4 items-center",
  "bottom-left": "left-4 bottom-4 items-start",
  "bottom-right": "right-4 bottom-4 items-end",
};

const popupPositions: PopupPosition[] = [
  "top-center",
  "top-left",
  "top-right",
  "bottom-center",
  "bottom-left",
  "bottom-right",
];

function PopupStack({
  items,
  position,
}: {
  items: PopupMessageItem[];
  position: PopupPosition;
}) {
  const isBottom = position.startsWith("bottom");

  return (
    <div
      aria-atomic="true"
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed z-50 flex max-w-full flex-col gap-2 px-4",
        popupViewportPositionClasses[position]
      )}
    >
      {items.map((item) => (
        <div
          key={item.id}
          role="status"
          className={cn(
            "pointer-events-auto w-full max-w-sm rounded-md border px-4 py-3 shadow-xl backdrop-blur-sm transition-all duration-300 ease-out",
            "border-primary/35 bg-card/95 text-card-foreground",
            "transform-gpu",
            item.isVisible
              ? "translate-y-0 opacity-100"
              : isBottom
                ? "translate-y-2 opacity-0"
                : "-translate-y-2 opacity-0",
            item.className
          )}
        >
          {item.title ? (
            <p className="mb-1 text-sm font-semibold tracking-wide">{item.title}</p>
          ) : null}
          {item.content ? (
            item.content
          ) : (
            <p className="text-sm leading-snug">{item.message}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function PopupMessageViewport({
  items,
}: {
  items: PopupMessageItem[];
}) {
  return (
    <>
      {popupPositions.map((position) => {
        const positionItems = items.filter((item) => item.position === position);

        if (positionItems.length === 0) {
          return null;
        }

        return (
          <PopupStack
            key={position}
            items={positionItems}
            position={position}
          />
        );
      })}
    </>
  );
}

export function PopupMessageProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<PopupMessageItem[]>([]);
  const timeoutMapRef = useRef<Map<number, number[]>>(new Map());
  const idRef = useRef(0);

  const showPopup = useCallback(
    (messageOrContent: ReactNode, options?: PopupMessageOptions) => {
      const id = ++idRef.current;
      const durationMs = options?.durationMs ?? POPUP_DEFAULT_DURATION_MS;
      const position = options?.position ?? POPUP_DEFAULT_POSITION;
      const message =
        typeof messageOrContent === "string" ? messageOrContent : undefined;
      const content = options?.content ?? (message ? undefined : messageOrContent);

      setItems((currentItems) => [
        ...currentItems,
        {
          id,
          message,
          content,
          title: options?.title,
          isVisible: true,
          position,
          className: options?.className,
        },
      ]);

      const hideDelay = Math.max(durationMs - POPUP_FADE_DURATION_MS, 0);

      const hideTimeout = window.setTimeout(() => {
        setItems((currentItems) =>
          currentItems.map((item) =>
            item.id === id ? { ...item, isVisible: false } : item
          )
        );
      }, hideDelay);

      const cleanupTimeout = window.setTimeout(() => {
        setItems((currentItems) =>
          currentItems.filter((item) => item.id !== id)
        );
        timeoutMapRef.current.delete(id);
      }, hideDelay + POPUP_FADE_DURATION_MS);

      timeoutMapRef.current.set(id, [hideTimeout, cleanupTimeout]);

      return id;
    },
    []
  );

  useEffect(() => {
    const timeoutMap = timeoutMapRef.current;

    return () => {
      timeoutMap.forEach((timeouts) => {
        timeouts.forEach((timeoutId) => {
          window.clearTimeout(timeoutId);
        });
      });
      timeoutMap.clear();
    };
  }, []);

  const value = useMemo(() => ({ showPopup }), [showPopup]);

  return (
    <PopupMessageContext.Provider value={value}>
      {children}
      <PopupMessageViewport items={items} />
    </PopupMessageContext.Provider>
  );
}

export function usePopupMessage() {
  const context = useContext(PopupMessageContext);

  if (!context) {
    throw new Error("usePopupMessage must be used within PopupMessageProvider");
  }

  return context;
}
