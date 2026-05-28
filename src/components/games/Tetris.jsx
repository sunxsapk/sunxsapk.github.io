'use client';

import { useEffect, useRef, useState } from "react";
import GameShell, { useBestScore } from "./shell";
import { ParticleSystem, createScreenShake } from "./vfx";
import * as Audio from "./audio";

const COLS = 10;
const ROWS = 20;
const CELL = 28;
const VIEW_W = COLS * CELL;
const VIEW_H = ROWS * CELL;

const COLORS = {
  I: "#00d6c8",
  O: "#f5c94a",
  T: "#a96cf0",
  S: "#5cd060",
  Z: "#e85c5c",
  J: "#5c8ee8",
  L: "#f08a3a",
};

const SHAPES = {
  I: [[0, 1], [1, 1], [2, 1], [3, 1]],
  O: [[1, 0], [2, 0], [1, 1], [2, 1]],
  T: [[1, 0], [0, 1], [1, 1], [2, 1]],
  S: [[1, 0], [2, 0], [0, 1], [1, 1]],
  Z: [[0, 0], [1, 0], [1, 1], [2, 1]],
  J: [[0, 0], [0, 1], [1, 1], [2, 1]],
  L: [[2, 0], [0, 1], [1, 1], [2, 1]],
};

const BAG = ["I", "O", "T", "S", "Z", "J", "L"];

function newBag() {
  const b = [...BAG];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

function rotate(cells, dir = 1) {
  // rotate around (1.5, 1.5) for ~most pieces; I and O handled distinctly
  return cells.map(([x, y]) => {
    if (dir > 0) return [y, -x + 3];
    return [-y + 3, x];
  });
}

function newPiece(type) {
  return {
    type,
    cells: SHAPES[type].map((c) => [...c]),
    x: 3,
    y: -1,
  };
}

function collides(grid, piece, dx = 0, dy = 0, cells = null) {
  const c = cells || piece.cells;
  for (const [cx, cy] of c) {
    const x = piece.x + cx + dx;
    const y = piece.y + cy + dy;
    if (x < 0 || x >= COLS || y >= ROWS) return true;
    if (y >= 0 && grid[y][x]) return true;
  }
  return false;
}

function lock(grid, piece) {
  for (const [cx, cy] of piece.cells) {
    const x = piece.x + cx;
    const y = piece.y + cy;
    if (y >= 0 && y < ROWS && x >= 0 && x < COLS) grid[y][x] = piece.type;
  }
}

function clearLines(grid) {
  const cleared = [];
  for (let y = ROWS - 1; y >= 0; y--) {
    if (grid[y].every((c) => c)) cleared.push(y);
  }
  for (const y of cleared) {
    grid.splice(y, 1);
    grid.unshift(new Array(COLS).fill(0));
  }
  return cleared;
}

export default function Tetris() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [status, setStatus] = useState(null);
  const [best, submitBest] = useBestScore("tetris");

  const init = () => {
    const grid = Array.from({ length: ROWS }, () => new Array(COLS).fill(0));
    const bag = newBag();
    const queue = [...bag, ...newBag()];
    const piece = newPiece(queue.shift());
    setScore(0); setLevel(1); setLines(0); setStatus(null);
    stateRef.current = {
      grid, queue, piece, hold: null, canHold: true,
      dropTimer: 0, lockTimer: 0,
      moveCooldown: 0, dasTimer: 0, dasDir: 0,
      score: 0, level: 1, lines: 0,
      time: 0,
      particles: new ParticleSystem(),
      shake: createScreenShake(),
      flashRows: [],
      over: false,
      keys: { left: false, right: false, down: false },
    };
  };

  const restart = () => init();

  useEffect(() => {
    init();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = VIEW_W * dpr;
      canvas.height = VIEW_H * dpr;
      canvas.style.width = `${VIEW_W}px`;
      canvas.style.height = `${VIEW_H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();

    const tryMove = (dx, dy) => {
      const s = stateRef.current;
      if (!s || s.over) return false;
      if (!collides(s.grid, s.piece, dx, dy)) {
        s.piece.x += dx;
        s.piece.y += dy;
        if (dx !== 0) Audio.blip(380);
        return true;
      }
      return false;
    };

    const tryRotate = (dir) => {
      const s = stateRef.current;
      if (!s || s.over) return;
      if (s.piece.type === "O") return;
      const rotated = rotate(s.piece.cells, dir);
      // simple wall-kicks
      const kicks = [0, -1, 1, -2, 2];
      for (const k of kicks) {
        if (!collides(s.grid, s.piece, k, 0, rotated)) {
          s.piece.cells = rotated;
          s.piece.x += k;
          Audio.blip(560);
          return;
        }
      }
    };

    const hardDrop = () => {
      const s = stateRef.current;
      if (!s || s.over) return;
      let drop = 0;
      while (!collides(s.grid, s.piece, 0, drop + 1)) drop++;
      s.piece.y += drop;
      s.score += drop * 2;
      setScore(s.score);
      lockPiece();
    };

    const hold = () => {
      const s = stateRef.current;
      if (!s || s.over || !s.canHold) return;
      const t = s.piece.type;
      if (s.hold) {
        s.piece = newPiece(s.hold);
      } else {
        s.piece = newPiece(s.queue.shift());
      }
      s.hold = t;
      s.canHold = false;
      Audio.blip(440);
    };

    const spawnNext = () => {
      const s = stateRef.current;
      if (s.queue.length < 7) s.queue.push(...newBag());
      s.piece = newPiece(s.queue.shift());
      s.canHold = true;
      if (collides(s.grid, s.piece, 0, 0)) {
        s.over = true;
        setStatus("Game Over");
        submitBest(s.score);
        Audio.gameOver();
      }
    };

    const lockPiece = () => {
      const s = stateRef.current;
      lock(s.grid, s.piece);
      const cleared = clearLines(s.grid);
      if (cleared.length) {
        // particle burst per line
        for (const y of cleared) {
          for (let x = 0; x < COLS; x++) {
            s.particles.emit(x * CELL + CELL / 2, y * CELL + CELL / 2, "#fff", { count: 5, speed: 160, life: 0.5, size: 2 });
          }
        }
        s.shake.kick(cleared.length * 4);
        s.lines += cleared.length;
        const lineScores = [0, 100, 300, 500, 800];
        s.score += lineScores[cleared.length] * s.level;
        s.level = 1 + Math.floor(s.lines / 10);
        setLines(s.lines);
        setLevel(s.level);
        setScore(s.score);
        Audio.lineClear(cleared.length);
      } else {
        Audio.hit();
      }
      spawnNext();
    };

    const onKey = (e) => {
      const s = stateRef.current;
      if (!s) return;
      if (e.type === "keydown") {
        switch (e.key) {
          case "ArrowLeft": case "a":
            tryMove(-1, 0); s.dasDir = -1; s.dasTimer = 0.16; e.preventDefault(); break;
          case "ArrowRight": case "d":
            tryMove(1, 0); s.dasDir = 1; s.dasTimer = 0.16; e.preventDefault(); break;
          case "ArrowDown": case "s":
            s.keys.down = true; e.preventDefault(); break;
          case "ArrowUp": case "x":
            tryRotate(1); e.preventDefault(); break;
          case "z":
            tryRotate(-1); e.preventDefault(); break;
          case " ":
            hardDrop(); e.preventDefault(); break;
          case "c": case "Shift":
            hold(); e.preventDefault(); break;
        }
      } else {
        if (e.key === "ArrowLeft" || e.key === "a") { if (s.dasDir === -1) s.dasDir = 0; }
        else if (e.key === "ArrowRight" || e.key === "d") { if (s.dasDir === 1) s.dasDir = 0; }
        else if (e.key === "ArrowDown" || e.key === "s") s.keys.down = false;
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);

    // touch swipe
    let touch = null;
    const onTouchStart = (e) => {
      const t = e.changedTouches[0];
      touch = { x: t.clientX, y: t.clientY, time: performance.now(), moved: false };
    };
    const onTouchMove = (e) => {
      if (!touch) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touch.x;
      const dy = t.clientY - touch.y;
      if (Math.abs(dx) > 28) {
        tryMove(Math.sign(dx), 0);
        touch.x = t.clientX;
        touch.moved = true;
      }
      if (dy > 28) {
        tryMove(0, 1);
        touch.y = t.clientY;
        touch.moved = true;
      }
    };
    const onTouchEnd = (e) => {
      if (!touch) return;
      const dt = performance.now() - touch.time;
      const t = e.changedTouches[0];
      const dy = t.clientY - touch.y;
      if (!touch.moved && dt < 300) {
        tryRotate(1);
      } else if (dy < -50 && dt < 350) {
        hardDrop();
      }
      touch = null;
    };
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd, { passive: true });

    let raf = 0;
    let last = performance.now();
    const tick = (now) => {
      const s = stateRef.current;
      if (!s) return;
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      if (!s.over) {
        s.time += dt;
        // DAS
        if (s.dasDir !== 0) {
          s.dasTimer -= dt;
          if (s.dasTimer <= 0) {
            tryMove(s.dasDir, 0);
            s.dasTimer = 0.05;
          }
        }
        // Gravity
        const baseDrop = Math.max(0.05, 0.9 - (s.level - 1) * 0.075);
        const dropInterval = s.keys.down ? Math.min(baseDrop, 0.05) : baseDrop;
        s.dropTimer += dt;
        if (s.dropTimer >= dropInterval) {
          s.dropTimer = 0;
          if (!collides(s.grid, s.piece, 0, 1)) {
            s.piece.y += 1;
            if (s.keys.down) { s.score += 1; setScore(s.score); }
          } else {
            lockPiece();
          }
        }
        s.particles.update(dt);
        s.shake.decay(dt);
      }
      draw(ctx, s);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function draw(ctx, s) {
    ctx.fillStyle = "#06080a";
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);

    // subtle grid
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    for (let x = 0; x < COLS; x++) {
      ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, VIEW_H); ctx.stroke();
    }
    for (let y = 0; y < ROWS; y++) {
      ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(VIEW_W, y * CELL); ctx.stroke();
    }

    const { dx, dy } = s.shake.offset();
    ctx.save();
    ctx.translate(dx, dy);

    // grid blocks
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const v = s.grid[y][x];
        if (v) drawBlock(ctx, x, y, COLORS[v]);
      }
    }

    // ghost piece
    let ghostDrop = 0;
    while (!collides(s.grid, s.piece, 0, ghostDrop + 1)) ghostDrop++;
    for (const [cx, cy] of s.piece.cells) {
      const x = s.piece.x + cx;
      const y = s.piece.y + cy + ghostDrop;
      if (y >= 0) drawBlock(ctx, x, y, COLORS[s.piece.type], 0.2);
    }

    // current piece
    for (const [cx, cy] of s.piece.cells) {
      const x = s.piece.x + cx;
      const y = s.piece.y + cy;
      if (y >= 0) drawBlock(ctx, x, y, COLORS[s.piece.type], 1);
    }

    s.particles.draw(ctx);

    ctx.restore();

    // overlays: next piece, hold, level
    drawSideHud(ctx, s);

    if (s.over) {
      ctx.fillStyle = "rgba(0,0,0,0.65)";
      ctx.fillRect(0, VIEW_H / 2 - 40, VIEW_W, 80);
      ctx.fillStyle = "#0fe";
      ctx.font = "bold 22px monospace";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", VIEW_W / 2, VIEW_H / 2 - 5);
      ctx.fillStyle = "#fc6";
      ctx.font = "12px monospace";
      ctx.fillText(`Lines ${s.lines} · press Restart`, VIEW_W / 2, VIEW_H / 2 + 18);
      ctx.textAlign = "left";
    }
  }

  function drawBlock(ctx, x, y, color, alpha = 1) {
    ctx.globalAlpha = alpha;
    const px = x * CELL;
    const py = y * CELL;
    ctx.fillStyle = color;
    ctx.fillRect(px + 1, py + 1, CELL - 2, CELL - 2);
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.fillRect(px + 1, py + 1, CELL - 2, 3);
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(px + 1, py + CELL - 4, CELL - 2, 3);
    ctx.globalAlpha = 1;
  }

  function drawSideHud(ctx, s) {
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = "11px monospace";
    ctx.fillText(`LV ${s.level}`, 4, 12);
    ctx.fillText(`LN ${s.lines}`, VIEW_W - 44, 12);
  }

  return (
    <GameShell
      title="Tetris"
      score={score}
      best={best}
      status={status ?? `LV ${level} · ${lines} lines`}
      onRestart={restart}
      controls="← → move · ↑ rotate · ↓ soft drop · Space hard drop · C/Shift hold · swipe / tap on mobile"
    >
      <canvas
        ref={canvasRef}
        className="rounded-md border border-primary/50 shadow-glow-primary touch-none"
      />
    </GameShell>
  );
}
