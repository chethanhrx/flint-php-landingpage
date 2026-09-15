import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RAW_SHARDS, to3DPoints } from '../lib/flintGeometry';
import { Rotate3d, Sparkles, Image as ImageIcon } from 'lucide-react';

interface FlintRock3DProps {
  className?: string;
  allowToggle2D?: boolean;
}

export const FlintRock3D: React.FC<FlintRock3DProps> = ({
  className = '',
  allowToggle2D = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setViewMode('2d');
    }
  }, []);

  useEffect(() => {
    if (viewMode !== '3d' || !mountRef.current) return;

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        setViewMode('2d');
        return;
      }
    } catch {
      setWebglSupported(false);
      setViewMode('2d');
      return;
    }

    const container = mountRef.current;
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 520;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // 2. Materials
    // Obsidian / dark chiseled flint stone with crisp facet reflections
    const rockMaterial = new THREE.MeshStandardMaterial({
      color: 0x22262d,
      roughness: 0.32,
      metalness: 0.2,
      envMapIntensity: 0.8,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    // Vivid FlintPHP Orange Lightning
    const lightningMaterial = new THREE.MeshStandardMaterial({
      color: 0xea580c,
      emissive: 0xc2410c,
      emissiveIntensity: 0.85,
      roughness: 0.18,
      metalness: 0.1,
    });

    // 3. Build Extruded Meshes preserving exact 2D coordinates
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const geometriesToDispose: THREE.BufferGeometry[] = [];

    const createExtrudedMesh = (
      points: [number, number][],
      depth: number,
      bevelThickness: number,
      bevelSize: number,
      mat: THREE.Material,
      zOffset: number = 0,
      tiltX: number = 0,
      tiltY: number = 0
    ) => {
      const shape = new THREE.Shape();
      if (points.length === 0) return null;
      shape.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        shape.lineTo(points[i][0], points[i][1]);
      }
      shape.closePath();

      const extrudeSettings: THREE.ExtrudeGeometryOptions = {
        depth,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize,
        bevelThickness,
      };

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.center(); // Center geometry for micro-transforms
      geometriesToDispose.push(geo);

      // Re-calculate original center offset
      let avgX = 0;
      let avgY = 0;
      points.forEach(([px, py]) => {
        avgX += px;
        avgY += py;
      });
      avgX /= points.length;
      avgY /= points.length;

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(avgX, avgY, zOffset);
      mesh.rotation.x = tiltX;
      mesh.rotation.y = tiltY;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      return mesh;
    };

    // Construct Rock Facets
    const rockShards = [
      { pts: to3DPoints(RAW_SHARDS.L1), depth: 0.22, z: 0.04, tx: 0.02, ty: -0.02 },
      { pts: to3DPoints(RAW_SHARDS.L2), depth: 0.24, z: 0.06, tx: -0.02, ty: -0.03 },
      { pts: to3DPoints(RAW_SHARDS.L3), depth: 0.21, z: 0.03, tx: -0.01, ty: -0.01 },
      { pts: to3DPoints(RAW_SHARDS.L4), depth: 0.19, z: 0.01, tx: 0.01, ty: -0.01 },
      { pts: to3DPoints(RAW_SHARDS.R1), depth: 0.23, z: 0.05, tx: -0.02, ty: 0.02 },
      { pts: to3DPoints(RAW_SHARDS.R2), depth: 0.20, z: 0.02, tx: 0.01, ty: 0.01 },
    ];

    rockShards.forEach((s) => {
      const mesh = createExtrudedMesh(s.pts, s.depth, 0.03, 0.015, rockMaterial, s.z, s.tx, s.ty);
      if (mesh) rootGroup.add(mesh);
    });

    // Construct Lightning & Spark Shards
    const lightningParts = [
      { pts: to3DPoints(RAW_SHARDS.lightning), depth: 0.26, z: 0.08, tx: 0, ty: 0 },
      { pts: to3DPoints(RAW_SHARDS.sparkTop), depth: 0.2, z: 0.07, tx: 0.01, ty: 0.02 },
      { pts: to3DPoints(RAW_SHARDS.sparkRight), depth: 0.2, z: 0.07, tx: -0.02, ty: 0.01 },
    ];

    lightningParts.forEach((l) => {
      const mesh = createExtrudedMesh(l.pts, l.depth, 0.025, 0.012, lightningMaterial, l.z, l.tx, l.ty);
      if (mesh) rootGroup.add(mesh);
    });

    // 4. Subtle Ambient Spark Particles floating near the lightning
    const particleCount = 28;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);
    const particleBaseY = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Localized around spark area (x: 0.2 to 0.9, y: -0.5 to 1.8)
      particlePositions[i * 3] = 0.4 + (Math.random() - 0.4) * 0.9;
      particlePositions[i * 3 + 1] = 0.2 + (Math.random() - 0.5) * 1.6;
      particlePositions[i * 3 + 2] = 0.2 + (Math.random() - 0.5) * 0.6;
      particleBaseY[i] = particlePositions[i * 3 + 1];
      particleSpeeds[i] = 0.15 + Math.random() * 0.35;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    geometriesToDispose.push(particleGeo);

    const particleMat = new THREE.PointsMaterial({
      color: 0xffaa44,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particles);

    // 5. Lighting Setup
    // Key Studio Light (cool/neutral white soft directional light)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.45);
    keyLight.position.set(-4, 5, 6);
    scene.add(keyLight);

    // Fill Light
    const fillLight = new THREE.DirectionalLight(0xb8c2cc, 0.65);
    fillLight.position.set(4, -3, 4);
    scene.add(fillLight);

    // Subtle Rim Light from behind
    const rimLight = new THREE.DirectionalLight(0xd4e2ee, 0.85);
    rimLight.position.set(2, 4, -4);
    scene.add(rimLight);

    // Orange Point Light radiating from the Spark to cast warm light on adjacent obsidian fractures
    const sparkPointLight = new THREE.PointLight(0xea580c, 2.4, 5.5);
    sparkPointLight.position.set(0.5, 0.8, 0.5);
    scene.add(sparkPointLight);

    // Soft Ambient
    const ambientLight = new THREE.AmbientLight(0xdcdbd8, 1.1);
    scene.add(ambientLight);

    // 6. Interactive Mouse Parallax (subtle and restrained to preserve logo silhouette)
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (
        clientX >= -100 &&
        clientX <= rect.width + 100 &&
        clientY >= -100 &&
        clientY <= rect.height + 100
      ) {
        const nx = (clientX / rect.width) * 2 - 1;
        const ny = -(clientY / rect.height) * 2 + 1;
        // Strict boundary clamp: max 0.14 rad (~8 degrees)
        targetRotY = THREE.MathUtils.clamp(nx * 0.14, -0.14, 0.14);
        targetRotX = THREE.MathUtils.clamp(-ny * 0.14, -0.14, 0.14);
      } else {
        targetRotX = 0;
        targetRotY = 0;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // 8. Render Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax damping
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      // Subtle resting idle float and breathing rotation
      const floatY = Math.sin(elapsedTime * 1.1) * 0.06;
      const idleRotY = Math.sin(elapsedTime * 0.7) * 0.05;
      const idleRotX = Math.cos(elapsedTime * 0.5) * 0.03;

      rootGroup.position.y = floatY;
      rootGroup.rotation.x = currentRotX + idleRotX;
      rootGroup.rotation.y = currentRotY + idleRotY;

      // Subtle pulse on the orange spark light
      const pulse = 1.8 + Math.sin(elapsedTime * 2.8) * 0.4;
      sparkPointLight.intensity = pulse;
      lightningMaterial.emissiveIntensity = 0.75 + Math.sin(elapsedTime * 2.8) * 0.25;

      // Animate tiny spark particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3 + 1;
        positions[idx] += particleSpeeds[i] * 0.004;
        if (positions[idx] > particleBaseY[i] + 0.6) {
          positions[idx] = particleBaseY[i] - 0.2;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometriesToDispose.forEach((g) => g.dispose());
      rockMaterial.dispose();
      lightningMaterial.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [viewMode]);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-orange-500/10 via-stone-200/40 to-transparent opacity-80 pointer-events-none blur-2xl" />

      {/* 3D Viewport Container */}
      {viewMode === '3d' && webglSupported ? (
        <div
          ref={mountRef}
          className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] flex items-center justify-center cursor-grab active:cursor-grabbing drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
          aria-label="Interactive 3D representation of the FlintPHP Rock Symbol"
        />
      ) : (
        /* Crisp 2D Fallback / Exact Brand Source */
        <div className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] flex items-center justify-center p-8">
          <img
            src="/flintphp-rock.svg"
            alt="FlintPHP Rock and Spark Brand Symbol"
            className="w-auto h-[320px] sm:h-[400px] lg:h-[460px] max-w-full drop-shadow-[0_16px_36px_rgba(28,25,23,0.15)] transition-transform duration-500 hover:scale-[1.02]"
          />
        </div>
      )}

      {/* Floating Control Pill (3D / 2D toggle & indicator) */}
      {allowToggle2D && webglSupported && (
        <div
          className={`absolute bottom-3 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 text-xs text-stone-600 shadow-sm transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-80'
          }`}
        >
          <button
            type="button"
            onClick={() => setViewMode(viewMode === '3d' ? '2d' : '3d')}
            className="flex items-center gap-1.5 hover:text-stone-900 transition-colors cursor-pointer"
            title={viewMode === '3d' ? 'Switch to 2D Vector Logo' : 'Switch to Interactive 3D Rock'}
          >
            {viewMode === '3d' ? (
              <>
                <Rotate3d className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
                <span className="font-medium">3D Flint</span>
                <span className="text-[10px] text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded font-mono font-semibold">
                  Obsidian
                </span>
              </>
            ) : (
              <>
                <ImageIcon className="w-3.5 h-3.5 text-orange-600" />
                <span className="font-medium">2D Vector</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Subtle Hint on first hover */}
      <div className="absolute top-4 left-4 pointer-events-none hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-stone-400 uppercase tracking-wider">
        <Sparkles className="w-3 h-3 text-orange-600/80" />
        <span>Asset 1 • Official Flint Symbol</span>
      </div>
    </div>
  );
};
