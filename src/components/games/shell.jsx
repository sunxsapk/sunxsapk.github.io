'use client';

import { useEffect, useState } from "react";
import { isMuted, toggleMuted } from "./audio";

export function useBestScore(key) {
  const [best, setBest] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`games:best:${key}`);
      if (raw) setBest(parseInt(raw, 10) || 0);
    } catch (_) {}
  }, [key]);

  const submit = (score) => {
    setBest((prev) => {
      const next = Math.max(prev, score | 0);
      try { localStorage.setItem(`games:best:${key}`, String(next)); } catch (_) {}
      return next;
    });
  };

  return [best, submit];
}

export default function GameShell({
  title,
  score = 0,
  best = 0,
  controls,
  onRestart,
  status, // optional: "Game Over" etc.
  children,
}) {
  const [muted, setMuted] = useState(false);

  useEffect(() => { setMuted(isMuted()); }, []);

  const toggle = () => setMuted(toggleMuted());

  return (
    <div
      className="flex flex-col gap-3 w-full md:w-[90%] lg:w-[80%] h-full bg-black/90 border-2 border-primary rounded-xl p-3 md:p-5 font-mono shadow-glow-primary"
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <h3 className="glow-primary">{title}</h3>
          {status && (
            <span className="chip chip-primary text-xs uppercase tracking-wide">{status}</span>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1">
            <span className="opacity-60">SCORE</span>
            <span className="font-bold text-primary">{score}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="opacity-60">BEST</span>
            <span className="font-bold text-secondary">{best}</span>
          </div>
          <button
            onClick={toggle}
            aria-label={muted ? "Unmute" : "Mute"}
            className="px-2 py-1 rounded chip text-xs"
          >
            {muted ? "🔇" : "🔊"}
          </button>
          <button
            onClick={onRestart}
            className="px-3 py-1 rounded-md bg-primary/30 hover:bg-primary/60 transition-colors text-xs"
          >
            Restart
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center">
        {children}
      </div>

      {controls && (
        <div className="text-xs opacity-70 text-center text-wrap">
          {controls}
        </div>
      )}
    </div>
  );
}
