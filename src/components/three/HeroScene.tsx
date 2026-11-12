"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Hero 3D: floating low-poly glass shapes with teal glow.
 * Procedural geometry only — no downloaded models, no assets.
 * The group follows the mouse with smooth easing (parallax depth).
 */
function Shapes() {
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
      {/* Icosahedron — glass-like, teal emissive */}
      <mesh position={[-2.1, 0.4, -0.5]}>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#0b2b26"
          emissive="#14E3C6"
          emissiveIntensity={0.55}
          metalness={0.6}
          roughness={0.25}
          flatShading
        />
      </mesh>
      {/* Torus — soft blue glow, used sparingly */}
      <mesh position={[2.2, -0.3, -1]}>
        <torusGeometry args={[0.85, 0.28, 16, 48]} />
        <meshStandardMaterial
          color="#0b1526"
          emissive="#3B82F6"
          emissiveIntensity={0.45}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
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
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={30} color="#14E3C6" />
      <pointLight position={[-4, -2, 3]} intensity={18} color="#3B82F6" />
      <Shapes />
    </Canvas>
  );
}
