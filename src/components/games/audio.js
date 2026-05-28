/*
 * Web Audio synth helpers shared across games. Lazily creates a single
 * AudioContext on the first user gesture (autoplay-policy friendly) and exposes
 * a small palette of arcade SFX. No external assets.
 */

let ctx = null;
let muted = false;

if (typeof window !== "undefined") {
  try { muted = localStorage.getItem("games:muted") === "1"; } catch (_) {}
}

function ensureContext() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    ctx = new C();
  }
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

export function isMuted() { return muted; }

export function setMuted(v) {
  muted = !!v;
  try { localStorage.setItem("games:muted", muted ? "1" : "0"); } catch (_) {}
}

export function toggleMuted() {
  setMuted(!muted);
  return muted;
}

function tone({ freq = 440, type = "sine", duration = 0.15, gain = 0.18, attack = 0.005, decay = 0.12, sweep = 0 } = {}) {
  if (muted) return;
  const ac = ensureContext();
  if (!ac) return;
  const t0 = ac.currentTime;
  const osc = ac.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (sweep) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq + sweep), t0 + duration);
  const g = ac.createGain();
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + decay);
  osc.connect(g).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

function noiseBurst({ duration = 0.18, gain = 0.25, color = "white", filterFreq = 1200, filterQ = 1 } = {}) {
  if (muted) return;
  const ac = ensureContext();
  if (!ac) return;
  const t0 = ac.currentTime;
  const length = Math.floor(ac.sampleRate * duration);
  const buf = ac.createBuffer(1, length, ac.sampleRate);
  const data = buf.getChannelData(0);
  let lastOut = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    if (color === "pink") {
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    } else {
      data[i] = white;
    }
  }
  const src = ac.createBufferSource();
  src.buffer = buf;
  const filt = ac.createBiquadFilter();
  filt.type = "bandpass";
  filt.frequency.value = filterFreq;
  filt.Q.value = filterQ;
  const g = ac.createGain();
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  src.connect(filt).connect(g).connect(ac.destination);
  src.start(t0);
  src.stop(t0 + duration + 0.02);
}

export function laser() {
  tone({ freq: 880, type: "square", duration: 0.12, gain: 0.10, attack: 0.001, decay: 0.10, sweep: -600 });
}

export function explosion() {
  noiseBurst({ duration: 0.35, gain: 0.30, color: "pink", filterFreq: 700, filterQ: 1.2 });
  tone({ freq: 110, type: "sawtooth", duration: 0.28, gain: 0.18, attack: 0.001, decay: 0.25, sweep: -70 });
}

export function blip(freq = 520) {
  tone({ freq, type: "triangle", duration: 0.08, gain: 0.12, attack: 0.002, decay: 0.07 });
}

export function lineClear(lines = 1) {
  // simple ascending arpeggio; bigger clears = higher peak
  const notes = [440, 554, 659, 880];
  const ac = ensureContext();
  if (!ac) return;
  const step = 0.05;
  for (let i = 0; i < Math.min(notes.length, lines + 1); i++) {
    setTimeout(() => tone({ freq: notes[i], type: "square", duration: 0.10, gain: 0.10, decay: 0.08 }), i * step * 1000);
  }
}

export function merge(value) {
  // higher tile value -> higher pitch, capped
  const idx = Math.min(10, Math.log2(Math.max(2, value)));
  const freq = 220 * Math.pow(1.12, idx);
  tone({ freq, type: "triangle", duration: 0.14, gain: 0.14, decay: 0.12 });
}

export function gameOver() {
  const ac = ensureContext();
  if (!ac) return;
  const notes = [330, 277, 220, 165];
  notes.forEach((f, i) => setTimeout(() => tone({ freq: f, type: "sawtooth", duration: 0.18, gain: 0.16, decay: 0.16 }), i * 110));
}

export function hit() {
  noiseBurst({ duration: 0.10, gain: 0.18, color: "white", filterFreq: 1600, filterQ: 0.8 });
}

export function powerUp() {
  const ac = ensureContext();
  if (!ac) return;
  const notes = [440, 660, 880, 1320];
  notes.forEach((f, i) => setTimeout(() => tone({ freq: f, type: "triangle", duration: 0.10, gain: 0.12, decay: 0.09 }), i * 60));
}
