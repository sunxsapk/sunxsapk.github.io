'use client';

import { useState } from "react";
import dynamic from "next/dynamic";
import { games } from "@/values";
import useModal from "../modal";

const SpaceShooter = dynamic(() => import("./SpaceShooter"), { ssr: false, loading: () => <Loading /> });
const Tetris = dynamic(() => import("./Tetris"), { ssr: false, loading: () => <Loading /> });
const Game2048 = dynamic(() => import("./Game2048"), { ssr: false, loading: () => <Loading /> });

const GAME_MAP = {
  "space-shooter": SpaceShooter,
  "tetris": Tetris,
  "2048": Game2048,
};

function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full font-mono text-primary glow-primary">
      Loading game...
    </div>
  );
}

function GameCard({ game, onLaunch }) {
  const isPrimary = game.accent === "primary";
  return (
    <div
      className={`bg-black/85 rounded-xl p-4 flex flex-col gap-3 border-2 ${isPrimary ? "border-primary shadow-glow-primary" : "border-secondary shadow-glow-secondary"} min-w-[15rem] flex-1 max-w-[22rem]`}
    >
      <div className="flex items-center justify-between">
        <h4 className={`font-bold ${isPrimary ? "text-primary glow-primary" : "text-secondary glow-secondary"}`}>
          {"> "}{game.title}
        </h4>
      </div>
      <h5 className="font-mono leading-relaxed opacity-90">{game.blurb}</h5>
      <p className="text-xs opacity-60 font-mono">{game.controls}</p>
      <div className="mt-auto pt-2">
        <button
          onClick={() => onLaunch(game)}
          className={`px-4 py-2 rounded-md ${isPrimary ? "bg-primary/30 hover:bg-primary/60" : "bg-secondary/40 hover:bg-secondary/70"} transition-colors w-full font-bold`}
        >
          Play
        </button>
      </div>
    </div>
  );
}

export default function GamesPage(props) {
  const modal = useModal();
  const [active, setActive] = useState(null);

  const launch = (game) => {
    setActive(game.id);
    modal.setActive(true);
  };

  const ActiveGame = active ? GAME_MAP[active] : null;

  return (
    <section {...props}>
      <div className="p-4 rounded-xl border-2 border-primary relative bg-black/40 shadow-glow-primary">
        <h5 className="absolute top-[-.6rem] left-[1rem] px-1 bg-black text-secondary glow-secondary">Mini Games</h5>
        <p className="text-sm opacity-70 mb-3 font-mono px-1">
          Take a break. Click Play — controls + audio are built-in.
        </p>
        <div className="flex gap-4 flex-wrap items-stretch">
          {games.map((g) => (
            <GameCard key={g.id} game={g} onLaunch={launch} />
          ))}
        </div>
      </div>

      <modal.component>
        {modal.active && ActiveGame ? <ActiveGame /> : null}
      </modal.component>
    </section>
  );
}
