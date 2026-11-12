"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Hero 3D: floating low-poly glass shapes with teal glow.
 * Procedural geometry only — no downloaded models, no assets.
 * The group follows the mouse with smooth easing (parallax depth).
 */
function Shapes({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    if (!g) return;
    // Smooth mouse parallax.
    const px = state.pointer.x;
    const py = state.pointer.y;
    pointer.current.x += (px - pointer.current.x) * Math.min(1, delta * 3);
    pointer.current.y += (py - pointer.current.y) * Math.min(1, delta * 3);
    g.rotation.y = pointer.current.x * 0.35;
    g.rotation.x = -pointer.current.y * 0.22;
    // Gentle float.
    g.position.y = Math.sin(t * 0.6) * 0.12;
    g.children.forEach((child, i) => {
      child.rotation.x += delta * (0.15 + i * 0.05);
      child.rotation.y += delta * (0.2 + i * 0.04);
      child.position.y = Math.sin(t * 0.8 + i * 1.7) * 0.15;
    });
  });

  return (
    <group ref={group}>
      {/* Icosahedron — glass-like, teal emissive.
          On mobile this is the top-right edge shape (small, dim). */}
      <mesh position={mobile ? [1.35, 2.4, -0.5] : [-2.1, 0.4, -0.5]} scale={mobile ? 0.55 : 1}>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#0b2b26"
          emissive="#14E3C6"
          emissiveIntensity={mobile ? 0.3 : 0.55}
          metalness={0.6}
          roughness={0.25}
          flatShading
          transparent
          opacity={mobile ? 0.8 : 1}
        />
      </mesh>
      {/* Torus — soft blue glow, used sparingly.
          On mobile this is the bottom-right edge shape (small, dim). */}
      <mesh position={mobile ? [1.35, -2.3, -1] : [2.2, -0.3, -1]} scale={mobile ? 0.6 : 1}>
        <torusGeometry args={[0.85, 0.28, 16, 48]} />
        <meshStandardMaterial
          color="#0b1526"
          emissive="#3B82F6"
          emissiveIntensity={mobile ? 0.25 : 0.45}
          metalness={0.6}
          roughness={0.3}
          transparent
          opacity={mobile ? 0.8 : 1}
        />
      </mesh>
      {/* Cube + small sphere — desktop only. Mobile gets 2 shapes max. */}
      {!mobile && (
        <>
          {/* Cube — teal wireframe accent */}
          <mesh position={[0.4, 1.3, -1.6]}>
            <boxGeometry args={[0.7, 0.7, 0.7]} />
            <meshStandardMaterial
              color="#14E3C6"
              emissive="#14E3C6"
              emissiveIntensity={0.25}
              metalness={0.4}
              roughness={0.4}
              wireframe
            />
          </mesh>
          {/* Small sphere — warm accent dot */}
          <mesh position={[-0.6, -1.2, -0.8]}>
            <sphereGeometry args={[0.32, 24, 24]} />
            <meshStandardMaterial
              color="#0b2b26"
              emissive="#2DD4BF"
              emissiveIntensity={0.9}
              metalness={0.3}
              roughness={0.2}
            />
          </mesh>
        </>
      )}
    </group>
  );
}

export default function HeroScene() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      // Mobile: pixel ratio capped at 1.5 to cut GPU work.
      dpr={mobile ? [1, 1.5] : [1, 1.75]}
      // Mobile: camera pulled back so the two shapes sit at the
      // top-right / bottom-right edges, clear of the centred text.
      camera={mobile ? { position: [0, 0, 7], fov: 55 } : { position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={30} color="#14E3C6" />
      <pointLight position={[-4, -2, 3]} intensity={18} color="#3B82F6" />
      <Shapes mobile={mobile} />
    </Canvas>
  );
}
