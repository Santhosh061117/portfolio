/**
 * Audio / Haptic Feedback Engine using Web Audio API
 * Generates tactile, micro-mechanical synthesized clicks and frequency sweeps.
 * Zero external libraries, zero network requests, instant and battery-safe.
 */

let audioCtx = null;
let soundEnabled = true;

// Initialize on first user gesture
function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isAudioEnabled() {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem('santhosh_portfolio_sound');
  return stored !== 'false';
}

export function setAudioEnabled(enabled) {
  soundEnabled = enabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('santhosh_portfolio_sound', enabled ? 'true' : 'false');
  }
}

/**
 * Play a subtle mechanical click sound (buttons, tabs, switches)
 */
export function playClickSound() {
  if (!isAudioEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(950, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.025);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.026);
  } catch (e) {
    // Ignore audio errors silently
  }
}

/**
 * Play a frequency sweep sound (theme toggle, logic state shift)
 */
export function playSwitchSound(direction = 'up') {
  if (!isAudioEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const startFreq = direction === 'up' ? 380 : 720;
    const endFreq = direction === 'up' ? 720 : 380;

    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.065);
  } catch (e) {
    // Ignore audio errors
  }
}

/**
 * Play telemetry / continuum pulse sound (layer activation, bus signal)
 */
export function playTelemetrySound() {
  if (!isAudioEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.setValueAtTime(880, now + 0.03);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(now + 0.075);
  } catch (e) {
    // Ignore
  }
}
