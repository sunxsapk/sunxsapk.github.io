'use client';

import { useEffect, useRef, useState } from "react";
import GameShell, { useBestScore } from "./shell";
import { ParticleSystem, createScreenShake } from "./vfx";
import * as Audio from "./audio";

const SIZE = 4;
const CELL = 84;
const GAP = 10;
const VIEW = SIZE * CELL + (SIZE + 1) * GAP;

const TILE_COLORS = {
  2: ["#1e2326", "#cfe9df"],
  4: ["#23323a", "#e3f1ea"],
  8: ["#0e8a66", "#fff"],
  16: ["#0bb284", "#fff"],
  32: ["#16d099", "#0a1a14"],
  64: ["#5cd060", "#0a1a14"],
  128: ["#d97a3a", "#fff"],
  256: ["#e85c5c", "#fff"],
  512: ["#a96cf0", "#fff"],
  1024: ["#f5c94a", "#0a1a14"],
  2048: ["#ffce3a", "#0a1a14"],
  4096: ["#ff9344", "#fff"],
};

function emptyGrid() {
  return Array.from({ length: SIZE }, () => new Array(SIZE).fill(0));
}

function clone(g) { return g.map((r) => [...r]); }

function spawn(grid) {
  const empty = [];
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) if (!grid[y][x]) empty.push([x, y]);
  if (!empty.length) return null;
  const [x, y] = empty[Math.floor(Math.random() * empty.length)];
  grid[y][x] = Math.random() < 0.9 ? 2 : 4;
  return [x, y];
}

function slideRowLeft(row) {
  const filtered = row.filter((v) => v);
  const result = [];
  const mergedAt = [];
  for (let i = 0; i < filtered.length; i++) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      result.push(filtered[i] * 2);
      mergedAt.push(result.length - 1);
      i++;
    } else {
      result.push(filtered[i]);
    }
  }
  while (result.length < SIZE) result.push(0);
  return { row: result, mergedAt, gained: mergedAt.reduce((acc, i) => acc + result[i], 0) };
}

function move(grid, dir) {
  // dir: 0=left, 1=right, 2=up, 3=down
  let changed = false;
  let gained = 0;
  const merges = [];
  const next = emptyGrid();

  for (let i = 0; i < SIZE; i++) {
    let row;
    if (dir === 0) row = grid[i].slice();
    else if (dir === 1) row = grid[i].slice().reverse();
    else if (dir === 2) row = grid.map((r) => r[i]);
    else row = grid.map((r) => r[i]).reverse();

    const { row: out, mergedAt, gained: g } = slideRowLeft(row);
    gained += g;

    // write back
    for (let j = 0; j < SIZE; j++) {
      const val = out[j];
      let x, y;
      if (dir === 0) { x = j; y = i; }
      else if (dir === 1) { x = SIZE - 1 - j; y = i; }
      else if (dir === 2) { x = i; y = j; }
      else { x = i; y = SIZE - 1 - j; }
      next[y][x] = val;
      if (grid[y][x] !== val) changed = true;
    }
    for (const idx of mergedAt) {
      let x, y;
      if (dir === 0) { x = idx; y = i; }
      else if (dir === 1) { x = SIZE - 1 - idx; y = i; }
      else if (dir === 2) { x = i; y = idx; }
      else { x = i; y = SIZE - 1 - idx; }
      merges.push([x, y, next[y][x]]);
    }
  }

  return { grid: next, changed, gained, merges };
}

function isOver(grid) {
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) {
    if (!grid[y][x]) return false;
    if (x + 1 < SIZE && grid[y][x] === grid[y][x + 1]) return false;
    if (y + 1 < SIZE && grid[y][x] === grid[y + 1][x]) return false;
  }
  return true;
}

export default function Game2048() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const [score, setScore] = useState(0);
  const [best, submitBest] = useBestScore("2048");
  const [status, setStatus] = useState(null);

  const init = () => {
    const grid = emptyGrid();
    const spawn1 = spawn(grid);
    const spawn2 = spawn(grid);
    stateRef.current = {
      grid,
      anims: [], // each: {x,y,t,duration,kind}
      particles: new ParticleSystem(),
      shake: createScreenShake(),
      score: 0,
      over: false,
      spawnedAt: [spawn1, spawn2].filter(Boolean),
      reached2048: false,
    };
    setScore(0);
    setStatus(null);
  };

  const restart = () => init();

  useEffect(() => {
    init();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = VIEW * dpr;
      canvas.height = VIEW * dpr;
      canvas.style.width = `${VIEW}px`;
      canvas.style.height = `${VIEW}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();

    const tryMove = (dir) => {
      const s = stateRef.current;
      if (!s || s.over) return;
      const result = move(s.grid, dir);
      if (!result.changed) return;
      s.grid = result.grid;
      s.score += result.gained;
      setScore(s.score);
      // merge VFX
      for (const [x, y, val] of result.merges) {
        const px = GAP + x * (CELL + GAP) + CELL / 2;
        const py = GAP + y * (CELL + GAP) + CELL / 2;
        const [bg] = TILE_COLORS[val] || ["#0bb284"];
        s.particles.emit(px, py, bg, { count: 12, speed: 160, life: 0.5, size: 3 });
        s.anims.push({ x, y, t: 0, duration: 0.18, kind: "pop" });
        Audio.merge(val);
        if (val >= 2048 && !s.reached2048) {
          s.reached2048 = true;
          setStatus("You hit 2048!");
          Audio.powerUp();
          s.shake.kick(10);
        }
      }
      const spawned = spawn(s.grid);
      if (spawned) {
        s.anims.push({ x: spawned[0], y: spawned[1], t: 0, duration: 0.22, kind: "spawn" });
      }
      if (isOver(s.grid)) {
        s.over = true;
        setStatus("Game Over");
        submitBest(s.score);
        Audio.gameOver();
      }
    };

    const onKey = (e) => {
      switch (e.key) {
        case "ArrowLeft": case "a": tryMove(0); e.preventDefault(); break;
        case "ArrowRight": case "d": tryMove(1); e.preventDefault(); break;
        case "ArrowUp": case "w": tryMove(2); e.preventDefault(); break;
        case "ArrowDown": case "s": tryMove(3); e.preventDefault(); break;
      }
    };
    window.addEventListener("keydown", onKey);

    let touch = null;
    const onTouchStart = (e) => {
      const t = e.changedTouches[0];
      touch = { x: t.clientX, y: t.clientY };
    };
    const onTouchEnd = (e) => {
      if (!touch) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touch.x;
      const dy = t.clientY - touch.y;
      const ax = Math.abs(dx), ay = Math.abs(dy);
      if (Math.max(ax, ay) < 24) { touch = null; return; }
      if (ax > ay) tryMove(dx > 0 ? 1 : 0);
      else tryMove(dy > 0 ? 3 : 2);
      touch = null;
    };
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd, { passive: true });

    let raf = 0;
    let last = performance.now();
    const tick = (now) => {
      const s = stateRef.current;
      if (!s) return;
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      for (let i = s.anims.length - 1; i >= 0; i--) {
        s.anims[i].t += dt;
        if (s.anims[i].t >= s.anims[i].duration) s.anims.splice(i, 1);
      }
      s.particles.update(dt);
      s.shake.decay(dt);
      draw(ctx, s);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function draw(ctx, s) {
    ctx.fillStyle = "#0a0d10";
    ctx.fillRect(0, 0, VIEW, VIEW);
    // board bg
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    roundRect(ctx, 4, 4, VIEW - 8, VIEW - 8, 8);
    ctx.fill();
    // empty cells
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const px = GAP + x * (CELL + GAP);
        const py = GAP + y * (CELL + GAP);
        ctx.fillStyle = "rgba(255,255,255,0.06)";
        roundRect(ctx, px, py, CELL, CELL, 6);
        ctx.fill();
      }
    }

    const { dx, dy } = s.shake.offset();
    ctx.save();
    ctx.translate(dx, dy);

    // tiles
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const v = s.grid[y][x];
        if (!v) continue;
        const anim = s.anims.find((a) => a.x === x && a.y === y);
        let scale = 1;
        if (anim) {
          const t = anim.t / anim.duration;
          if (anim.kind === "pop") {
            scale = 1 + Math.sin(t * Math.PI) * 0.12;
          } else if (anim.kind === "spawn") {
            scale = Math.min(1, 0.4 + t * 0.8);
          }
        }
        drawTile(ctx, x, y, v, scale);
      }
    }
    s.particles.draw(ctx);
    ctx.restore();

    if (s.over) {
      ctx.fillStyle = "rgba(0,0,0,0.65)";
      roundRect(ctx, 16, VIEW / 2 - 50, VIEW - 32, 100, 12);
      ctx.fill();
      ctx.fillStyle = "#0fe";
      ctx.font = "bold 24px monospace";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", VIEW / 2, VIEW / 2 - 8);
      ctx.fillStyle = "#fc6";
      ctx.font = "12px monospace";
      ctx.fillText(`Score ${s.score} · Restart`, VIEW / 2, VIEW / 2 + 14);
      ctx.textAlign = "left";
    }
  }

  function drawTile(ctx, x, y, v, scale) {
    const px = GAP + x * (CELL + GAP);
    const py = GAP + y * (CELL + GAP);
    const [bg, fg] = TILE_COLORS[v] || ["#7d3aa9", "#fff"];
    ctx.save();
    ctx.translate(px + CELL / 2, py + CELL / 2);
    ctx.scale(scale, scale);
    ctx.translate(-CELL / 2, -CELL / 2);
    ctx.fillStyle = bg;
    roundRect(ctx, 0, 0, CELL, CELL, 7);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    roundRect(ctx, 0, 0, CELL, CELL / 2, 7);
    ctx.fill();
    ctx.fillStyle = fg;
    const fontSize = v < 100 ? 32 : v < 1000 ? 26 : v < 10000 ? 22 : 18;
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(v), CELL / 2, CELL / 2);
    ctx.restore();
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  return (
    <GameShell
      title="2048"
      score={score}
      best={best}
      status={status}
      onRestart={restart}
      controls="Arrow keys or swipe to slide tiles · merge matching pairs"
    >
      <canvas
        ref={canvasRef}
        className="rounded-md border border-primary/50 shadow-glow-primary touch-none"
      />
    </GameShell>
  );
}
