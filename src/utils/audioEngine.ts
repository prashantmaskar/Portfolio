/**
 * Generative Web Audio Engine & Sound FX for interactive portfolio
 * Generative ambient soundscapes and arcade game audio
 */

class AudioController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private ambientInterval: number | null = null;
  private activeOscillators: OscillatorNode[] = [];

  private chordProgressions = [
    [130.81, 155.56, 196.00, 246.94, 311.13], // C minor 9
    [116.54, 146.83, 174.61, 220.00, 261.63], // Bb add 9
    [103.83, 130.81, 155.56, 196.00, 233.08], // Ab maj 7
    [155.56, 196.00, 233.08, 293.66, 349.23], // Eb maj 9
  ];
  private currentChordIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleAmbient(): boolean {
    this.initContext();
    if (!this.ctx || !this.ambientGain) return false;

    if (this.isMuted) {
      this.isMuted = false;
      this.startAmbient();
      return true;
    } else {
      this.isMuted = true;
      this.stopAmbient();
      return false;
    }
  }

  public getIsPlaying(): boolean {
    return !this.isMuted;
  }

  private startAmbient() {
    if (!this.ctx || !this.ambientGain) return;
    
    // Ramp up ambient volume
    this.ambientGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.ambientGain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 2.5);

    this.playChordStep();
    if (this.ambientInterval) clearInterval(this.ambientInterval);
    this.ambientInterval = window.setInterval(() => {
      this.playChordStep();
    }, 6000);
  }

  private stopAmbient() {
    if (!this.ctx || !this.ambientGain) return;

    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }

    // Gentle fade out
    this.ambientGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.ambientGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

    setTimeout(() => {
      this.activeOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore already stopped
        }
      });
      this.activeOscillators = [];
    }, 1300);
  }

  private playChordStep() {
    if (!this.ctx || !this.ambientGain || this.isMuted) return;

    const chord = this.chordProgressions[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chordProgressions.length;

    // Filter node for smooth ambient warmth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(850, this.ctx.currentTime + 3);
    filter.frequency.exponentialRampToValueAtTime(380, this.ctx.currentTime + 5.9);
    filter.connect(this.ambientGain);

    chord.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      // Slight detune for analog lushness
      osc.detune.setValueAtTime((idx - 2) * 4, this.ctx.currentTime);

      oscGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      oscGain.gain.linearRampToValueAtTime(0.035 / (idx + 1), this.ctx.currentTime + 2);
      oscGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 5.8);

      osc.connect(oscGain);
      oscGain.connect(filter);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 6.0);
      this.activeOscillators.push(osc);
    });
  }

  // Interactive UI sound effects
  public playClickTone(pitch: number = 440) {
    if (this.isMuted && !this.ctx) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Audio context policy safe
    }
  }

  // Spaceship arcade game laser SFX
  public playLaserSound() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(820, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch {
      // ignore
    }
  }

  // Spaceship explosion sound
  public playExplosionSound() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      // Filtered noise buffer
      const bufferSize = this.ctx.sampleRate * 0.3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(700, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.28);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start();
      noise.stop(this.ctx.currentTime + 0.3);
    } catch {
      // ignore
    }
  }

  // Powerup / point scored
  public playScoreSound() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.04, this.ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.05 + 0.12);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(this.ctx.currentTime + idx * 0.05);
        osc.stop(this.ctx.currentTime + idx * 0.05 + 0.13);
      });
    } catch {
      // ignore
    }
  }
}

export const audioEngine = new AudioController();

// Speech synthesis controller for "Read Aloud" functionality
class SpeechController {
  private isSpeaking = false;

  public speak(text: string, onEnd?: () => void) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Choose an English or natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(
      (v) => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Daniel') || v.name.includes('Samantha')) && v.lang.startsWith('en')
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (naturalVoice) utterance.voice = naturalVoice;

    this.isSpeaking = true;
    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  public stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
    }
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const speechController = new SpeechController();
