import React, { useEffect, useRef, useState } from 'react';
import { audioEngine } from '../utils/audioEngine';
import { X, Play, RotateCcw, Volume2, VolumeX, Trophy } from 'lucide-react';

interface SpaceshipGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

interface Asteroid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  points: number[];
  rotation: number;
  vRot: number;
}

interface Laser {
  x: number;
  y: number;
  vy: number;
}

export const SpaceshipGameModal: React.FC<SpaceshipGameModalProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('prashant_spaceship_highscore') || '0');
    } catch {
      return 0;
    }
  });
  const [soundEnabled, setSoundEnabled] = useState(true);

  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const shipRef = useRef({
    x: 300,
    y: 450,
    vx: 0,
    vy: 0,
    angle: -Math.PI / 2,
    speed: 0,
  });

  const lasersRef = useRef<Laser[]>([]);
  const asteroidsRef = useRef<Asteroid[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lastShotRef = useRef<number>(0);
  const scoreRef = useRef<number>(0);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = true;
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === ' ' && gameState === 'playing') {
        e.preventDefault();
        fireLaser();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, gameState, onClose]);

  const fireLaser = () => {
    const now = performance.now();
    if (now - lastShotRef.current < 160) return;
    lastShotRef.current = now;

    const ship = shipRef.current;
    lasersRef.current.push({
      x: ship.x,
      y: ship.y - 18,
      vy: -11
    });

    if (soundEnabled) {
      audioEngine.playLaserSound();
    }
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    scoreRef.current = 0;
    lasersRef.current = [];
    asteroidsRef.current = [];
    particlesRef.current = [];

    const canvas = canvasRef.current;
    if (canvas) {
      shipRef.current.x = canvas.width / 2;
      shipRef.current.y = canvas.height - 80;
    }
    audioEngine.playClickTone(500);
  };

  // Main game animation loop
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let spawnCounter = 0;

    const loop = () => {
      animationId = requestAnimationFrame(loop);

      // Clear with subtle trail
      ctx.fillStyle = 'rgba(9, 9, 11, 0.35)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Starfield background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      if (Math.random() < 0.2) {
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1.5, 1.5);
      }

      if (gameState === 'playing') {
        const ship = shipRef.current;

        // Player input physics
        const keys = keysPressed.current;
        const accel = 0.55;
        const friction = 0.92;

        if (keys['ArrowLeft'] || keys['a'] || keys['A']) ship.vx -= accel;
        if (keys['ArrowRight'] || keys['d'] || keys['D']) ship.vx += accel;
        if (keys['ArrowUp'] || keys['w'] || keys['W']) ship.vy -= accel;
        if (keys['ArrowDown'] || keys['s'] || keys['S']) ship.vy += accel;

        ship.vx *= friction;
        ship.vy *= friction;
        ship.x += ship.vx;
        ship.y += ship.vy;

        // Wall bounds
        ship.x = Math.max(20, Math.min(canvas.width - 20, ship.x));
        ship.y = Math.max(30, Math.min(canvas.height - 30, ship.y));

        // Engine thruster particles
        if (Math.abs(ship.vx) > 0.1 || Math.abs(ship.vy) > 0.1 || keys[' ']) {
          particlesRef.current.push({
            x: ship.x + (Math.random() - 0.5) * 8,
            y: ship.y + 14,
            vx: (Math.random() - 0.5) * 1.5,
            vy: 2.5 + Math.random() * 2,
            alpha: 1,
            color: Math.random() > 0.5 ? '#60a5fa' : '#3b82f6',
            size: 2 + Math.random() * 2,
          });
        }

        // Draw Player Ship (Vector wireframe design)
        ctx.save();
        ctx.translate(ship.x, ship.y);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -18);
        ctx.lineTo(-12, 14);
        ctx.lineTo(0, 8);
        ctx.lineTo(12, 14);
        ctx.closePath();
        ctx.stroke();

        // Ship cockpit core glow
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Spawn Asteroids / Debris
        spawnCounter++;
        if (spawnCounter % 40 === 0) {
          const radius = 16 + Math.random() * 22;
          const pointsCount = 7;
          const points: number[] = [];
          for (let p = 0; p < pointsCount; p++) {
            points.push(radius * (0.8 + Math.random() * 0.4));
          }

          asteroidsRef.current.push({
            x: 30 + Math.random() * (canvas.width - 60),
            y: -30,
            vx: (Math.random() - 0.5) * 1.2,
            vy: 1.8 + Math.random() * 2.2,
            radius,
            points,
            rotation: 0,
            vRot: (Math.random() - 0.5) * 0.04
          });
        }

        // Update Lasers
        for (let i = lasersRef.current.length - 1; i >= 0; i--) {
          const laser = lasersRef.current[i];
          laser.y += laser.vy;

          ctx.fillStyle = '#60a5fa';
          ctx.shadowColor = '#3b82f6';
          ctx.shadowBlur = 8;
          ctx.fillRect(laser.x - 1.5, laser.y, 3, 14);
          ctx.shadowBlur = 0;

          if (laser.y < -20) {
            lasersRef.current.splice(i, 1);
          }
        }

        // Update Asteroids & Collision Check
        for (let aIdx = asteroidsRef.current.length - 1; aIdx >= 0; aIdx--) {
          const ast = asteroidsRef.current[aIdx];
          ast.x += ast.vx;
          ast.y += ast.vy;
          ast.rotation += ast.vRot;

          // Draw Asteroid
          ctx.save();
          ctx.translate(ast.x, ast.y);
          ctx.rotate(ast.rotation);
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          const step = (Math.PI * 2) / ast.points.length;
          ast.points.forEach((r, idx) => {
            const angle = idx * step;
            const px = Math.cos(angle) * r;
            const py = Math.sin(angle) * r;
            if (idx === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          });
          ctx.closePath();
          ctx.stroke();
          ctx.restore();

          // Check laser hits
          for (let lIdx = lasersRef.current.length - 1; lIdx >= 0; lIdx--) {
            const l = lasersRef.current[lIdx];
            const dist = Math.hypot(l.x - ast.x, l.y - ast.y);
            if (dist < ast.radius + 6) {
              // Destroyed asteroid!
              lasersRef.current.splice(lIdx, 1);
              asteroidsRef.current.splice(aIdx, 1);

              // Spawn explosion particles
              for (let p = 0; p < 16; p++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 1 + Math.random() * 4;
                particlesRef.current.push({
                  x: ast.x,
                  y: ast.y,
                  vx: Math.cos(angle) * speed,
                  vy: Math.sin(angle) * speed,
                  alpha: 1,
                  color: Math.random() > 0.5 ? '#f59e0b' : '#38bdf8',
                  size: 2 + Math.random() * 3
                });
              }

              if (soundEnabled) {
                audioEngine.playExplosionSound();
                audioEngine.playScoreSound();
              }

              setScore((prev) => {
                const newScore = prev + 100;
                if (newScore > highScore) {
                  setHighScore(newScore);
                  try {
                    localStorage.setItem('prashant_spaceship_highscore', String(newScore));
                  } catch {
                    // ignore
                  }
                }
                return newScore;
              });

              break;
            }
          }

          // Check player collision
          if (ast) {
            const distToShip = Math.hypot(ship.x - ast.x, ship.y - ast.y);
            if (distToShip < ast.radius + 12) {
              // Player hit!
              if (soundEnabled) {
                audioEngine.playExplosionSound();
              }
              setGameState('gameover');
            }
          }

          // Remove if offscreen
          if (ast && ast.y > canvas.height + 40) {
            asteroidsRef.current.splice(aIdx, 1);
          }
        }
      }

      // Update Particles
      for (let pIdx = particlesRef.current.length - 1; pIdx >= 0; pIdx--) {
        const p = particlesRef.current[pIdx];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.035;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        if (p.alpha <= 0) {
          particlesRef.current.splice(pIdx, 1);
        }
      }
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isOpen, gameState, soundEnabled, highScore]);

  // Touch / mouse steering for mobile and desktop
  const handleCanvasPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    shipRef.current.x = x;
    shipRef.current.y = y;
    fireLaser();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Game Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold tracking-tight text-white text-base">
              Orbital Defender · Arcade
            </span>
            <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
              Interactive Arcade Easter Egg
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>BEST: {highScore}</span>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              title="Toggle Game Audio"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              title="Close Arcade (ESC)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Game Canvas Container */}
        <div className="relative w-full aspect-[4/3] bg-zinc-950 flex items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            width={600}
            height={450}
            onPointerMove={handleCanvasPointer}
            onPointerDown={handleCanvasPointer}
            className="w-full h-full cursor-crosshair touch-none"
          />

          {/* HUD Overlay */}
          {gameState === 'playing' && (
            <div className="absolute top-4 left-6 right-6 flex items-center justify-between text-xs font-mono pointer-events-none">
              <div className="text-blue-400 font-bold text-sm tracking-wider">
                SCORE: {score}
              </div>
              <div className="text-zinc-500">
                [WASD / Drag] Move · [Space] Fire
              </div>
            </div>
          )}

          {/* Menu Overlay */}
          {gameState === 'menu' && (
            <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                Orbital Interceptor
              </h3>
              <p className="text-zinc-400 text-sm max-w-sm mb-6 leading-relaxed">
                Pilot the vector spaceship, blast incoming polygonal debris, and defend the orbital relay.
              </p>
              <button
                onClick={startGame}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-sm transition-colors shadow-lg shadow-blue-500/20"
              >
                <Play className="w-4 h-4 fill-white" />
                Launch Flight
              </button>
              <div className="mt-6 text-xs text-zinc-500 font-mono">
                Controls: WASD / Arrow Keys / Mouse Drag to maneuver · Spacebar to shoot
              </div>
            </div>
          )}

          {/* Game Over Overlay */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 bg-zinc-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
              <span className="text-xs font-mono text-red-400 tracking-wider mb-1">
                SYSTEM CRITICAL
              </span>
              <h3 className="font-display text-3xl font-bold text-white mb-2">
                Mission Terminated
              </h3>
              <p className="text-zinc-300 font-mono text-base mb-6">
                FINAL SCORE: <span className="text-blue-400 font-bold">{score}</span>
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={startGame}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-sm transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-medium text-sm transition-colors"
                >
                  Back to Portfolio
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-zinc-900/40 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 font-mono">
          <span>Engine: HTML5 Canvas 2D + Web Audio API</span>
          <span>Prashant Maskar Interactive Arcade</span>
        </div>
      </div>
    </div>
  );
};
