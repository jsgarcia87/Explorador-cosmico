/**
 * SpaceAudio.js — NASA-Grade Procedural Web Audio API Soundscape Engine
 * 100% synthesized soundscape without heavy external audio files.
 * Features:
 *  - Sub-bass Cosmic Drone with slow LFO filter modulation
 *  - Solar plasma convection hum
 *  - Relativistic gravitational resonance for Gargantua/Pulsars
 *  - Futuristic sci-fi telemetry UI feedback clicks
 */

class SpaceAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.droneFilter = null;
    this.droneGain = null;
    this.lfo = null;
    this.currentMode = 'solar';
  }

  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();

    // Main ambient drone gain (soft and immersive)
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.droneGain.connect(this.ctx.destination);

    // Filter for deep atmospheric warmth
    this.droneFilter = this.ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.setValueAtTime(240, this.ctx.currentTime);
    this.droneFilter.Q.setValueAtTime(4.5, this.ctx.currentTime);
    this.droneFilter.connect(this.droneGain);

    // Osc 1 — Deep Sub-bass (55 Hz - A1)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);
    this.droneOsc1.connect(this.droneFilter);
    this.droneOsc1.start();

    // Osc 2 — Harmonic Fifth (82.41 Hz - E2)
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(82.41, this.ctx.currentTime);
    this.droneOsc2.connect(this.droneFilter);
    this.droneOsc2.start();

    // Slow LFO modulating filter cutoff
    this.lfo = this.ctx.createOscillator();
    this.lfo.type = 'sine';
    this.lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime); // 12.5s cycle
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(80, this.ctx.currentTime);
    this.lfo.connect(lfoGain);
    lfoGain.connect(this.droneFilter.frequency);
    this.lfo.start();
  }

  toggle() {
    this.init();
    if (!this.ctx) return false;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.enabled = !this.enabled;
    const now = this.ctx.currentTime;
    if (this.enabled) {
      this.droneGain.gain.cancelScheduledValues(now);
      this.droneGain.gain.linearRampToValueAtTime(0.18, now + 1.2);
      this.playClickFeedback(880, 0.08);
    } else {
      this.droneGain.gain.cancelScheduledValues(now);
      this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 0.6);
    }
    return this.enabled;
  }

  setMode(mode, targetId = null) {
    if (!this.ctx || !this.enabled) return;
    this.currentMode = mode;
    const now = this.ctx.currentTime;

    if (mode === 'solar') {
      if (targetId === 'sol') {
        // Warm solar plasma resonance
        this.droneOsc1.frequency.exponentialRampToValueAtTime(65.41, now + 1.0);
        this.droneOsc2.frequency.exponentialRampToValueAtTime(98.0, now + 1.0);
        this.droneFilter.frequency.linearRampToValueAtTime(420, now + 1.0);
      } else {
        // Standard planetary space drone
        this.droneOsc1.frequency.exponentialRampToValueAtTime(55, now + 1.0);
        this.droneOsc2.frequency.exponentialRampToValueAtTime(82.41, now + 1.0);
        this.droneFilter.frequency.linearRampToValueAtTime(240, now + 1.0);
      }
    } else if (mode === 'deep') {
      if (targetId === 'agujero') {
        // Deep relativistic gravitational thrum (low rumble + high Q resonance)
        this.droneOsc1.frequency.exponentialRampToValueAtTime(41.2, now + 1.0); // E1
        this.droneOsc2.frequency.exponentialRampToValueAtTime(61.74, now + 1.0);
        this.droneFilter.frequency.linearRampToValueAtTime(320, now + 1.0);
      } else {
        // Deep cosmic void
        this.droneOsc1.frequency.exponentialRampToValueAtTime(48, now + 1.0);
        this.droneOsc2.frequency.exponentialRampToValueAtTime(72, now + 1.0);
        this.droneFilter.frequency.linearRampToValueAtTime(180, now + 1.0);
      }
    } else if (mode === 'constelaciones') {
      // Ethereal night observatory chime harmonics
      this.droneOsc1.frequency.exponentialRampToValueAtTime(110, now + 1.0); // A2
      this.droneOsc2.frequency.exponentialRampToValueAtTime(164.81, now + 1.0); // E3
      this.droneFilter.frequency.linearRampToValueAtTime(380, now + 1.0);
    }
  }

  playClickFeedback(freq = 660, duration = 0.06) {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + duration);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }
}

export const spaceAudio = new SpaceAudioEngine();
