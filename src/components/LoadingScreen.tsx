"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Floating Particles ─── */
function Particles({ count = 800 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += 0.0003;
    mesh.current.rotation.x += 0.0001;
    // Subtle mouse-driven parallax
    mesh.current.rotation.y += mouse.current.x * 0.0005;
    mesh.current.rotation.x += mouse.current.y * 0.0005;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#000000"
        transparent
        opacity={0.15}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Logo Plane in 3D Scene ─── */
function LogoPlane({ progress }: { progress: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load("/images/logo_final.png");
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle breathing / floating
    mesh.current.position.y = Math.sin(t * 0.5) * 0.05;
    mesh.current.rotation.z = Math.sin(t * 0.3) * 0.015;
    // Scale up as progress increases
    const s = 0.6 + progress * 0.4;
    mesh.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[2.4, 2.4]} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        transparent
        alphaTest={0.01}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}



/* ─── Camera Controller ─── */
function CameraController({ exiting }: { exiting: boolean }) {
  const { camera } = useThree();

  useFrame(() => {
    if (exiting) {
      // Zoom camera through the logo
      camera.position.z += (0.2 - camera.position.z) * 0.02;
    } else {
      camera.position.z += (4 - camera.position.z) * 0.02;
    }
  });

  return null;
}

/* ─── Main Loading Screen ─── */
export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    let frame: number;
    let current = 0;
    const step = () => {
      // Ease towards 100 at different speeds
      if (current < 30) {
        current += 0.8 + Math.random() * 1.2;
      } else if (current < 70) {
        current += 0.4 + Math.random() * 0.8;
      } else if (current < 95) {
        current += 0.2 + Math.random() * 0.4;
      } else {
        current += 0.5;
      }

      if (current >= 100) {
        current = 100;
        setProgress(1);
        // Brief pause at 100, then exit
        setTimeout(() => setExiting(true), 400);
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 1800);
        return;
      }
      setProgress(current / 100);
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center transition-opacity duration-[1200ms] ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Three.js Canvas */}
      <div className="absolute inset-0">
        <Canvas
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 5], fov: 45 }}
        >
          <CameraController exiting={exiting} />
          <Particles />
          <LogoPlane progress={progress} />

        </Canvas>
      </div>

      {/* Bottom progress indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-10">
        {/* Counter */}
        <span
          className="text-[11px] tracking-[0.5em] uppercase text-black/40 font-bold tabular-nums"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {String(Math.round(progress * 100)).padStart(3, "0")}
        </span>

        {/* Progress bar */}
        <div className="w-[120px] h-px bg-black/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-black/40 transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Tagline */}
      <div
        className={`absolute bottom-36 left-1/2 -translate-x-1/2 text-center transition-all duration-700 ${
          progress > 0.5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p
          className="text-[9px] tracking-[0.6em] uppercase text-black/25 font-medium"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Defining Modern Menswear
        </p>
      </div>
    </div>
  );
}
