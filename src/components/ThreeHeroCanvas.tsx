import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { audioEngine } from '../utils/audioEngine';

interface ThreeHeroCanvasProps {
  performanceMode: 'high' | 'eco';
}

export const ThreeHeroCanvas: React.FC<ThreeHeroCanvasProps> = ({ performanceMode }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [earthMode, setEarthMode] = useState<'globe' | 'wireframe' | 'particles'>('globe');
  const [fps, setFps] = useState<number>(60);
  const mainGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: performanceMode === 'high',
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(performanceMode === 'high' ? Math.min(window.devicePixelRatio, 2) : 1);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Main rotating group
    const earthGroup = new THREE.Group();
    // Tilt Earth slightly on its axis (~23.5 degrees)
    earthGroup.rotation.z = (23.5 * Math.PI) / 180;
    scene.add(earthGroup);
    mainGroupRef.current = earthGroup;

    const globeRadius = 1.6;

    // 1. Base Earth Sphere (Deep obsidian ocean - lightweight geometry)
    const baseSphereGeom = new THREE.SphereGeometry(globeRadius, 24, 24);
    const baseSphereMat = new THREE.MeshStandardMaterial({
      color: 0x090b10,
      roughness: 0.7,
      metalness: 0.3,
      transparent: true,
      opacity: 0.95
    });
    const baseSphere = new THREE.Mesh(baseSphereGeom, baseSphereMat);
    earthGroup.add(baseSphere);

    // 2. Continents / Landmass Point Matrix
    // Generate procedural continent clusters on the sphere surface
    // Major land masses approx centers: India, Eurasia, Americas, Africa, Australia
    const continentCenters = [
      { lat: 20, lon: 78, r: 0.75 },     // India & South Asia
      { lat: 48, lon: 15, r: 0.85 },     // Europe
      { lat: 35, lon: 105, r: 0.95 },    // East Asia
      { lat: 55, lon: 60, r: 1.1 },      // Russia / Northern Eurasia
      { lat: 5, lon: 20, r: 0.9 },       // Central Africa
      { lat: -25, lon: 25, r: 0.6 },     // Southern Africa
      { lat: 40, lon: -100, r: 1.0 },    // North America
      { lat: -15, lon: -60, r: 0.8 },    // South America
      { lat: -25, lon: 135, r: 0.65 },   // Australia
      { lat: 0, lon: 115, r: 0.5 },      // Indonesia / SE Asia
      { lat: 30, lon: 45, r: 0.55 },     // Middle East
    ];

    const isContinent = (lat: number, lon: number) => {
      for (const c of continentCenters) {
        const dLat = lat - c.lat;
        let dLon = lon - c.lon;
        if (dLon > 180) dLon -= 360;
        if (dLon < -180) dLon += 360;
        const dist = Math.sqrt((dLat * Math.PI / 180) ** 2 + ((dLon * Math.cos(c.lat * Math.PI / 180)) * Math.PI / 180) ** 2);
        if (dist < c.r) return true;
      }
      return false;
    };

    // Latitude & Longitude to 3D Cartesian coordinates
    const latLonToVector3 = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(r * Math.sin(phi) * Math.cos(theta)),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    // Create Geo Continent Dots (optimized lightweight count)
    const dotCount = performanceMode === 'high' ? 950 : 450;
    const dotPositions: number[] = [];
    const dotColors: number[] = [];

    for (let i = 0; i < dotCount; i++) {
      // Golden spiral distribution on sphere
      const y = 1 - (i / (dotCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = i * 2.3999632; // Golden angle

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Convert to lat/lon
      const lat = Math.asin(y) * (180 / Math.PI);
      const lon = Math.atan2(z, -x) * (180 / Math.PI) - 180;

      if (isContinent(lat, lon)) {
        const vec = latLonToVector3(lat, lon, globeRadius + 0.012);
        dotPositions.push(vec.x, vec.y, vec.z);

        // Gradient color: Cyan/Blue to bright emerald/white for land
        if (Math.abs(lat - 18.52) < 15 && Math.abs(lon - 73.85) < 20) {
          // Highlight near India / Pune
          dotColors.push(0.3, 0.7, 1.0);
        } else {
          dotColors.push(0.2, 0.45, 0.85);
        }
      }
    }

    const continentGeom = new THREE.BufferGeometry();
    continentGeom.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    continentGeom.setAttribute('color', new THREE.Float32BufferAttribute(dotColors, 3));

    const continentMat = new THREE.PointsMaterial({
      size: performanceMode === 'high' ? 0.045 : 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.95
    });
    const continentPoints = new THREE.Points(continentGeom, continentMat);
    earthGroup.add(continentPoints);

    // 3. Latitude & Longitude Wireframe Meridians & Equator (lightweight)
    const wireframeSphereGeom = new THREE.SphereGeometry(globeRadius + 0.005, 16, 10);
    const wireframeSphereMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: earthMode === 'wireframe' ? 0.35 : 0.12
    });
    const wireframeMesh = new THREE.Mesh(wireframeSphereGeom, wireframeSphereMat);
    earthGroup.add(wireframeMesh);

    // 4. Pune, India Coordinate Pinpoint Beacon (18.5204° N, 73.8567° E)
    const puneLat = 18.5204;
    const puneLon = 73.8567;
    const punePos = latLonToVector3(puneLat, puneLon, globeRadius);

    // Pune marker beacon group
    const puneMarkerGroup = new THREE.Group();
    puneMarkerGroup.position.copy(punePos);
    puneMarkerGroup.lookAt(punePos.clone().multiplyScalar(2));

    // Pin core dot
    const pinDotGeom = new THREE.SphereGeometry(0.045, 16, 16);
    const pinDotMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const pinDot = new THREE.Mesh(pinDotGeom, pinDotMat);
    puneMarkerGroup.add(pinDot);

    // Vertical beacon radar pole
    const poleGeom = new THREE.CylinderGeometry(0.008, 0.008, 0.35, 8);
    poleGeom.translate(0, 0.175, 0);
    poleGeom.rotateX(Math.PI / 2);
    const poleMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.85 });
    const poleMesh = new THREE.Mesh(poleGeom, poleMat);
    puneMarkerGroup.add(poleMesh);

    // Radar pulsing ring
    const radarRingGeom = new THREE.RingGeometry(0.05, 0.08, 32);
    const radarRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    });
    const radarRing = new THREE.Mesh(radarRingGeom, radarRingMat);
    puneMarkerGroup.add(radarRing);

    earthGroup.add(puneMarkerGroup);

    // 5. Global Digital Connection Arcs (Pune -> Berlin, London, Tokyo, SF)
    const hubs = [
      { name: 'Berlin', lat: 52.52, lon: 13.405 },
      { name: 'London', lat: 51.507, lon: -0.127 },
      { name: 'Tokyo', lat: 35.676, lon: 139.65 },
      { name: 'San Francisco', lat: 37.774, lon: -122.419 },
      { name: 'Singapore', lat: 1.352, lon: 103.819 }
    ];

    const arcGroup = new THREE.Group();
    hubs.forEach((hub) => {
      const targetPos = latLonToVector3(hub.lat, hub.lon, globeRadius);
      
      // Calculate midpoint elevated above Earth surface
      const mid = new THREE.Vector3().addVectors(punePos, targetPos).multiplyScalar(0.5);
      const dist = punePos.distanceTo(targetPos);
      mid.setLength(globeRadius + dist * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(punePos, mid, targetPos);
      const points = curve.getPoints(36);
      const curveGeom = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.38
      });
      const arcLine = new THREE.Line(curveGeom, curveMat);
      arcGroup.add(arcLine);

      // Hub destination dot
      const hubGeom = new THREE.SphereGeometry(0.025, 8, 8);
      const hubMat = new THREE.MeshBasicMaterial({ color: 0x93c5fd });
      const hubMesh = new THREE.Mesh(hubGeom, hubMat);
      hubMesh.position.copy(targetPos);
      arcGroup.add(hubMesh);
    });

    earthGroup.add(arcGroup);

    // 6. Atmosphere Halo Mesh
    const atmosphereGeom = new THREE.SphereGeometry(globeRadius * 1.15, 32, 32);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.12
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeom, atmosphereMat);
    scene.add(atmosphereMesh);

    // 7. Ambient Deep Space Dust Particles
    const starCount = performanceMode === 'high' ? 300 : 100;
    const starGeom = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 12;
      starPos[i + 1] = (Math.random() - 0.5) * 10;
      starPos[i + 2] = (Math.random() - 0.5) * 10;
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.022,
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.5
    });
    const starPoints = new THREE.Points(starGeom, starMat);
    scene.add(starPoints);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const blueRimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    blueRimLight.position.set(-5, -2, -3);
    scene.add(blueRimLight);

    // Center Earth with India facing gently forward initially
    earthGroup.rotation.y = -1.2;

    // Mouse Interaction
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let radarScale = 1;
    let radarOpacity = 0.9;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.4;
      targetY = y * 0.3;

      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        earthGroup.rotation.y += deltaX * 0.008;
        earthGroup.rotation.x += deltaY * 0.008;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleClick = () => {
      audioEngine.playClickTone(580);
      // Give small pulse spin
      earthGroup.rotation.y += 0.25;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('click', handleClick);

    // Animation loop
    let animationId: number;
    let lastTime = performance.now();
    let frameCount = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const now = performance.now();
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;
      }

      // Smooth auto-rotation when not dragging
      if (!isDragging) {
        earthGroup.rotation.y += 0.003;
      }

      // Smooth parallax sway
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      earthGroup.position.x = currentX * 0.3;
      earthGroup.position.y = currentY * 0.2;

      // Animate radar pulse from Pune
      radarScale += 0.04;
      radarOpacity -= 0.02;
      if (radarScale > 2.8) {
        radarScale = 1;
        radarOpacity = 0.9;
      }
      radarRing.scale.set(radarScale, radarScale, 1);
      radarRingMat.opacity = Math.max(0, radarOpacity);

      // Stars slow drift
      starPoints.rotation.y -= 0.0004;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [earthMode, performanceMode]);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] flex items-center justify-center">
      {/* 3D Canvas element */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        title="Drag to rotate the interactive 3D Earth globe · Centered on Pune, India"
      />

      {/* Floating Pune Pin Indicator Card */}
      <div className="absolute top-4 left-4 bg-zinc-950/85 backdrop-blur-md border border-zinc-800/80 rounded-xl px-3 py-2 flex items-center gap-2.5 text-xs font-mono text-zinc-300 pointer-events-none shadow-lg">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        <div>
          <div className="text-white font-semibold text-[11px]">Pune, India</div>
          <div className="text-zinc-500 text-[10px]">18.5204° N, 73.8567° E</div>
        </div>
      </div>

      {/* Interactive geometric controls overlay (Zero-pill discipline: subtle buttons) */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-zinc-400 pointer-events-none">
        <div className="flex items-center gap-1.5 pointer-events-auto bg-zinc-950/85 backdrop-blur-md border border-zinc-800/80 rounded-lg p-1">
          <button
            onClick={() => {
              setEarthMode('globe');
              audioEngine.playClickTone(520);
            }}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              earthMode === 'globe'
                ? 'bg-zinc-800 text-white font-medium'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            3D Earth Globe
          </button>
          <button
            onClick={() => {
              setEarthMode('wireframe');
              audioEngine.playClickTone(580);
            }}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              earthMode === 'wireframe'
                ? 'bg-zinc-800 text-white font-medium'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Orbital Grid
          </button>
          <button
            onClick={() => {
              setEarthMode('particles');
              audioEngine.playClickTone(660);
            }}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              earthMode === 'particles'
                ? 'bg-zinc-800 text-white font-medium'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Digital Matrix
          </button>
        </div>

        {/* Tabular render telemetry */}
        <div className="hidden sm:flex items-center gap-2 bg-zinc-950/70 border border-zinc-800/60 rounded-md px-2.5 py-1 tabular-nums text-[11px] text-zinc-400">
          <span>WebGL 2.0</span>
          <span>·</span>
          <span>{fps} FPS</span>
          <span>·</span>
          <span>Earth Sphere (Pune Core)</span>
        </div>
      </div>
    </div>
  );
};
