'use client';

import { useCallback, useEffect, useRef, useState } from "react";

export default function useModal() {
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount with a tick so the open transition can run
  useEffect(() => {
    if (active) {
      const id = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(id);
    }
    setMounted(false);
  }, [active]);

  // Body scroll lock + ESC handling
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(false);
    };
    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const close = useCallback(() => setActive(false), []);

  const ModalComponent = ({ children }) => {
    const closeRef = useRef(null);

    useEffect(() => {
      if (mounted) closeRef.current?.focus();
    }, [mounted]);

    if (!active) return null;

    return (
      <div
        role="dialog"
        aria-modal="true"
        className="fixed z-[100] top-0 left-0 w-screen h-screen"
        style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          opacity: mounted ? 1 : 0,
          transition: "opacity 220ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={close}
      >
        <div
          className="p-2 md:py-10 md:px-[8vw] h-full w-full relative flex flex-col gap-2 items-center"
          style={{
            transform: mounted ? "scale(1) translateY(0)" : "scale(0.97) translateY(8px)",
            opacity: mounted ? 1 : 0,
            transition: "transform 260ms cubic-bezier(0.16, 1, 0.3, 1), opacity 220ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}

          <button
            ref={closeRef}
            onClick={close}
            className="px-8 py-2 border-2 border-secondary rounded-xl w-fit bg-primary bg-opacity-30 hover:bg-opacity-60 transition-colors shadow-glow-primary"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return {
    active,
    setActive,
    close,
    component: ModalComponent,
  };
}
