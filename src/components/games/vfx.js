/*
 * Tiny 2D canvas particle system + screen shake helper shared across games.
 */

export class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  emit(x, y, color, opts = {}) {
    const count = opts.count ?? 12;
    const speed = opts.speed ?? 180;
    const speedJitter = opts.speedJitter ?? 0.6;
    const life = opts.life ?? 0.7;
    const size = opts.size ?? 3;
    const gravity = opts.gravity ?? 0;
    const drag = opts.drag ?? 0.92;
    const spread = opts.spread ?? Math.PI * 2;
    const angleBase = opts.angle ?? 0;
    const shape = opts.shape ?? "rect";

    for (let i = 0; i < count; i++) {
      const a = angleBase + (Math.random() - 0.5) * spread;
      const s = speed * (1 + (Math.random() - 0.5) * speedJitter);
      this.particles.push({
        x, y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        life: life * (0.7 + Math.random() * 0.5),
        age: 0,
        size: size * (0.7 + Math.random() * 0.6),
        color,
        gravity,
        drag,
        shape,
      });
    }
  }

  update(dt) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.age += dt;
      if (p.age >= p.life) {
        this.particles.splice(i, 1);
        continue;
      }
      p.vx *= Math.pow(p.drag, dt * 60);
      p.vy *= Math.pow(p.drag, dt * 60);
      p.vy += p.gravity * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
  }

  draw(ctx) {
    for (const p of this.particles) {
      const t = 1 - p.age / p.life;
      ctx.globalAlpha = Math.max(0, t);
      ctx.fillStyle = p.color;
      const s = p.size * (0.4 + t * 0.6);
      if (p.shape === "circle") {
        ctx.beginPath();
        ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
      }
    }
    ctx.globalAlpha = 1;
  }

  clear() {
    this.particles.length = 0;
  }
}

/**
 * Tiny screen-shake controller. kick() bumps intensity, decay() shrinks it
 * each frame, offset() returns the current frame's translation to feed into
 * ctx.translate inside a save/restore the caller manages.
 */
export function createScreenShake() {
  let intensity = 0;
  return {
    kick(v) { intensity = Math.max(intensity, v); },
    decay(dt) {
      if (intensity <= 0.01) intensity = 0;
      else intensity *= Math.pow(0.001, dt);
    },
    offset() {
      if (intensity <= 0) return { dx: 0, dy: 0 };
      return {
        dx: (Math.random() - 0.5) * intensity,
        dy: (Math.random() - 0.5) * intensity,
      };
    },
  };
}
