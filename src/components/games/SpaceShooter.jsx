'use client';

import { useEffect, useRef, useState } from "react";
import GameShell, { useBestScore } from "./shell";
import { ParticleSystem, createScreenShake } from "./vfx";
import * as Audio from "./audio";

const VIEW_W = 400;
const VIEW_H = 600;

function makeStarfield(count = 80) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * VIEW_W,
      y: Math.random() * VIEW_H,
      z: 0.3 + Math.random() * 1.2,
    });
  }
  return stars;
}

export default function SpaceShooter() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const [score, setScore] = useState(0);
  const [best, submitBest] = useBestScore("space-shooter");
  const [status, setStatus] = useState(null);

  const init = () => {
    setScore(0);
    setStatus(null);
    const s = {
      player: { x: VIEW_W / 2, y: VIEW_H - 60, w: 28, h: 28, cooldown: 0, lives: 3, invuln: 0 },
      bullets: [],
      enemies: [],
      enemyBullets: [],
      stars: makeStarfield(),
      particles: new ParticleSystem(),
      shake: createScreenShake(),
      timeToSpawn: 0.6,
      spawnRate: 0.9,
      time: 0,
      keys: { left: false, right: false, up: false, down: false, fire: false },
      pointer: { active: false, x: VIEW_W / 2, y: VIEW_H - 60 },
      score: 0,
      over: false,
    };
    stateRef.current = s;
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

    const onKey = (e) => {
      const s = stateRef.current;
      if (!s) return;
      const down = e.type === "keydown";
      if (e.key === "ArrowLeft" || e.key === "a") { s.keys.left = down; e.preventDefault(); }
      else if (e.key === "ArrowRight" || e.key === "d") { s.keys.right = down; e.preventDefault(); }
      else if (e.key === "ArrowUp" || e.key === "w") { s.keys.up = down; e.preventDefault(); }
      else if (e.key === "ArrowDown" || e.key === "x") { s.keys.down = down; e.preventDefault(); }
      else if (e.key === " ") { s.keys.fire = down; e.preventDefault(); }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);

    const localPoint = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: ((clientX - rect.left) / rect.width) * VIEW_W,
        y: ((clientY - rect.top) / rect.height) * VIEW_H,
      };
    };

    const onPointerDown = (e) => {
      const s = stateRef.current;
      if (!s) return;
      s.pointer.active = true;
      const p = localPoint(e.clientX, e.clientY);
      s.pointer.x = p.x; s.pointer.y = p.y;
      s.keys.fire = true;
    };
    const onPointerMove = (e) => {
      const s = stateRef.current;
      if (!s || !s.pointer.active) return;
      const p = localPoint(e.clientX, e.clientY);
      s.pointer.x = p.x; s.pointer.y = p.y;
    };
    const onPointerUp = () => {
      const s = stateRef.current;
      if (!s) return;
      s.pointer.active = false;
      s.keys.fire = false;
    };
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    let raf = 0;
    let last = performance.now();

    const tick = (now) => {
      const s = stateRef.current;
      if (!s) return;
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      update(s, dt);
      draw(ctx, s);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update(s, dt) {
    if (s.over) return;
    s.time += dt;
    s.particles.update(dt);
    s.shake.decay(dt);

    // Star scroll
    for (const star of s.stars) {
      star.y += star.z * 60 * dt;
      if (star.y > VIEW_H) { star.y = -2; star.x = Math.random() * VIEW_W; }
    }

    // Player movement
    const speed = 280;
    if (s.pointer.active) {
      const dx = s.pointer.x - s.player.x;
      const dy = s.pointer.y - s.player.y;
      const d = Math.hypot(dx, dy);
      if (d > 1) {
        const k = Math.min(1, (speed * 1.8 * dt) / d);
        s.player.x += dx * k;
        s.player.y += dy * k;
      }
    } else {
      if (s.keys.left) s.player.x -= speed * dt;
      if (s.keys.right) s.player.x += speed * dt;
      if (s.keys.up) s.player.y -= speed * dt;
      if (s.keys.down) s.player.y += speed * dt;
    }
    s.player.x = Math.max(20, Math.min(VIEW_W - 20, s.player.x));
    s.player.y = Math.max(40, Math.min(VIEW_H - 20, s.player.y));

    // Firing
    s.player.cooldown -= dt;
    if (s.keys.fire && s.player.cooldown <= 0) {
      s.player.cooldown = 0.16;
      s.bullets.push({ x: s.player.x - 6, y: s.player.y - 8, vy: -560 });
      s.bullets.push({ x: s.player.x + 6, y: s.player.y - 8, vy: -560 });
      Audio.laser();
    }

    // Enemy spawn
    s.timeToSpawn -= dt;
    if (s.timeToSpawn <= 0) {
      s.timeToSpawn = Math.max(0.25, s.spawnRate - s.time * 0.012);
      const x = 30 + Math.random() * (VIEW_W - 60);
      const type = Math.random() < 0.18 ? "heavy" : "grunt";
      s.enemies.push({
        x, y: -30, w: type === "heavy" ? 32 : 24, h: type === "heavy" ? 32 : 24,
        hp: type === "heavy" ? 3 : 1, type,
        vy: type === "heavy" ? 60 : 100, vx: (Math.random() - 0.5) * 60,
        fireCd: 1.5 + Math.random() * 1.5,
      });
    }

    // Update bullets
    for (let i = s.bullets.length - 1; i >= 0; i--) {
      const b = s.bullets[i];
      b.y += b.vy * dt;
      if (b.y < -10) s.bullets.splice(i, 1);
    }

    for (let i = s.enemyBullets.length - 1; i >= 0; i--) {
      const b = s.enemyBullets[i];
      b.x += (b.vx || 0) * dt;
      b.y += b.vy * dt;
      if (b.y > VIEW_H + 10) s.enemyBullets.splice(i, 1);
    }

    // Update enemies + collisions
    for (let i = s.enemies.length - 1; i >= 0; i--) {
      const e = s.enemies[i];
      e.x += e.vx * dt;
      e.y += e.vy * dt;
      if (e.x < e.w / 2 || e.x > VIEW_W - e.w / 2) e.vx *= -1;
      e.fireCd -= dt;
      if (e.fireCd <= 0 && e.y > 20 && e.y < VIEW_H - 100) {
        e.fireCd = 1.4 + Math.random() * 1.2;
        const dx = s.player.x - e.x;
        const dy = s.player.y - e.y;
        const d = Math.hypot(dx, dy) || 1;
        s.enemyBullets.push({ x: e.x, y: e.y + e.h / 2, vx: (dx / d) * 160, vy: Math.max(120, (dy / d) * 220) });
        Audio.blip(330);
      }

      // bullet vs enemy
      for (let j = s.bullets.length - 1; j >= 0; j--) {
        const b = s.bullets[j];
        if (Math.abs(b.x - e.x) < e.w / 2 && Math.abs(b.y - e.y) < e.h / 2) {
          s.bullets.splice(j, 1);
          e.hp -= 1;
          s.particles.emit(b.x, b.y, "#0fc", { count: 6, speed: 80, life: 0.35, size: 2 });
          if (e.hp <= 0) {
            s.score += e.type === "heavy" ? 50 : 10;
            setScore(s.score);
            s.particles.emit(e.x, e.y, "#fc6", { count: 18, speed: 220, life: 0.7, size: 3 });
            s.particles.emit(e.x, e.y, "#f44", { count: 12, speed: 160, life: 0.5, size: 4, shape: "circle" });
            s.shake.kick(8);
            Audio.explosion();
            s.enemies.splice(i, 1);
            break;
          } else {
            Audio.hit();
          }
        }
      }
      if (!s.enemies[i]) continue;

      // enemy vs player
      if (s.player.invuln <= 0 && Math.abs(e.x - s.player.x) < (e.w + s.player.w) / 2 && Math.abs(e.y - s.player.y) < (e.h + s.player.h) / 2) {
        damagePlayer(s);
        s.particles.emit(e.x, e.y, "#fc6", { count: 14, speed: 200, life: 0.6, size: 3 });
        s.enemies.splice(i, 1);
        continue;
      }
    }

    // enemy bullets vs player
    if (s.player.invuln <= 0) {
      for (let i = s.enemyBullets.length - 1; i >= 0; i--) {
        const b = s.enemyBullets[i];
        if (Math.abs(b.x - s.player.x) < s.player.w / 2 && Math.abs(b.y - s.player.y) < s.player.h / 2) {
          s.enemyBullets.splice(i, 1);
          damagePlayer(s);
          break;
        }
      }
    }
    s.player.invuln = Math.max(0, s.player.invuln - dt);
  }

  function damagePlayer(s) {
    s.player.lives -= 1;
    s.player.invuln = 1.2;
    s.shake.kick(14);
    s.particles.emit(s.player.x, s.player.y, "#f55", { count: 24, speed: 240, life: 0.7, size: 3 });
    Audio.explosion();
    if (s.player.lives <= 0) {
      s.over = true;
      setStatus("Game Over");
      submitBest(s.score);
      Audio.gameOver();
    }
  }

  function draw(ctx, s) {
    ctx.fillStyle = "#02030a";
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);

    // Stars
    for (const star of s.stars) {
      ctx.fillStyle = `rgba(${200 + star.z * 30}, ${200 + star.z * 30}, 255, ${0.4 + star.z * 0.3})`;
      ctx.fillRect(star.x, star.y, star.z * 1.5, star.z * 1.5);
    }

    const { dx, dy } = s.shake.offset();
    ctx.save();
    ctx.translate(dx, dy);

    // Bullets
    ctx.fillStyle = "#0fe";
    for (const b of s.bullets) ctx.fillRect(b.x - 1.5, b.y - 8, 3, 10);

    // Enemy bullets
    ctx.fillStyle = "#f57";
    for (const b of s.enemyBullets) {
      ctx.beginPath();
      ctx.arc(b.x, b.y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Enemies
    for (const e of s.enemies) {
      ctx.fillStyle = e.type === "heavy" ? "#d97a3a" : "#c44";
      ctx.beginPath();
      ctx.moveTo(e.x, e.y + e.h / 2);
      ctx.lineTo(e.x - e.w / 2, e.y - e.h / 2);
      ctx.lineTo(e.x + e.w / 2, e.y - e.h / 2);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.stroke();
    }

    // Player
    const p = s.player;
    const flicker = p.invuln > 0 && Math.floor(s.time * 20) % 2 === 0;
    if (!flicker) {
      ctx.fillStyle = "#0fe";
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - p.h / 2);
      ctx.lineTo(p.x - p.w / 2, p.y + p.h / 2);
      ctx.lineTo(p.x + p.w / 2, p.y + p.h / 2);
      ctx.closePath();
      ctx.fill();
      // engine flame
      ctx.fillStyle = "#fc6";
      ctx.beginPath();
      ctx.moveTo(p.x - 6, p.y + p.h / 2);
      ctx.lineTo(p.x, p.y + p.h / 2 + 8 + Math.random() * 4);
      ctx.lineTo(p.x + 6, p.y + p.h / 2);
      ctx.closePath();
      ctx.fill();
    }

    s.particles.draw(ctx);

    ctx.restore();

    // HUD overlay (no shake)
    ctx.fillStyle = "#fff";
    ctx.font = "12px monospace";
    ctx.fillText(`Lives: ${"♥".repeat(Math.max(0, s.player.lives))}`, 10, 18);

    if (s.over) {
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(0, VIEW_H / 2 - 50, VIEW_W, 100);
      ctx.fillStyle = "#0fe";
      ctx.font = "bold 28px monospace";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", VIEW_W / 2, VIEW_H / 2);
      ctx.fillStyle = "#fc6";
      ctx.font = "14px monospace";
      ctx.fillText(`Score ${s.score}  ·  press Restart`, VIEW_W / 2, VIEW_H / 2 + 22);
      ctx.textAlign = "left";
    }
  }

  return (
    <GameShell
      title="Space Shooter"
      score={score}
      best={best}
      status={status}
      onRestart={restart}
      controls="Arrow keys / WASD to move · Space to fire · Touch and drag on mobile"
    >
      <canvas
        ref={canvasRef}
        className="rounded-md border border-primary/50 shadow-glow-primary touch-none"
        style={{ background: "#02030a" }}
      />
    </GameShell>
  );
}
