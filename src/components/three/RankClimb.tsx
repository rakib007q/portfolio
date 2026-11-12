"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * SEO signature scene: glowing bars rising to #1.
 * Bars animate up once when this component mounts — the parent only
 * mounts it when it scrolls into view (IntersectionObserver), so the
 * climb is the scroll storytelling moment. Procedural only.
 */
const HEIGHTS = [0.7, 1.1, 1.6, 2.1, 2.8];

function Bars() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = Math.min(state.clock.elapsedTime / 1.2, 1);
    // Ease-out cubic.
    const e = 1 - Math.pow(1 - t, 3);
    group.current?.children.forEach((child, i) => {
      const target = HEIGHTS[i] ?? 1;
      child.scale.y = Math.max(0.02, target * e);
      // Keep the base on the ground while scaling.
      child.position.y = (target * e) / 2 - 1.4;
    });
  });

  return (
    <group ref={group}>
      {HEIGHTS.map((h, i) => {
        const isTop = i === HEIGHTS.length - 1;
        return (
          <mesh key={i} position={[i * 0.95 - 1.9, h / 2 - 1.4, 0]} scale={[1, 0.02, 1]}>
            <boxGeometry args={[0.62, 1, 0.62]} />
            <meshStandardMaterial
              color={isTop ? "#0b2b26" : "#0b1118"}
              emissive={isTop ? "#14E3C6" : "#3B82F6"}
              emissiveIntensity={isTop ? 1.1 : 0.35}
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function RankClimb() {
  return (
    <div className="relative h-64 w-full sm:h-72" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.4, 6.5], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 4, 4]} intensity={25} color="#14E3C6" />
        <Bars />
      </Canvas>
      <p className="absolute right-4 top-2 rounded-full bg-[#14E3C6] px-3 py-1 text-sm font-bold text-[#070B10]">
        #1
      </p>
    </div>
  );
}
