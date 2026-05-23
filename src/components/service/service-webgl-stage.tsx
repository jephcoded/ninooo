"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Line, useTexture } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

type StagePart = {
  name: string;
};

type ServiceWebGLStageProps = {
  progress: number;
  stageOneSrc: string;
  stageTwoSrc: string;
  parts: StagePart[];
  compact?: boolean;
  onPartSelect: (partName: string) => void;
};

const labelDefinitions = [
  {
    anchor: [-1.4, 0.9, 0.58],
    label: [-3.1, 1.55, 1.02],
  },
  {
    anchor: [1.55, 0.86, 0.62],
    label: [3.15, 1.5, 1.04],
  },
  {
    anchor: [-1.9, -0.78, 0.52],
    label: [-3.2, -1.52, 1.04],
  },
  {
    anchor: [1.9, -0.82, 0.58],
    label: [3.2, -1.5, 1.08],
  },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function ServiceScene({
  progress,
  stageOneSrc,
  stageTwoSrc,
  parts,
  compact,
  onPartSelect,
}: ServiceWebGLStageProps) {
  const rootRef = useRef<THREE.Group>(null);
  const stageOneRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>>(null);
  const stageTwoRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>>(null);
  const accentGlowRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);
  const textures = useTexture([stageOneSrc, stageTwoSrc]);

  textures.forEach((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
  });

  useFrame((state, delta) => {
    const eased = clamp(progress, 0, 1);
    const stageOneOpacity = 1 - clamp((eased - 0.34) / 0.22, 0, 1);
    const stageTwoOpacity = clamp((eased - 0.3) / 0.24, 0, 1);
    const orbitPhase = Math.sin(state.clock.elapsedTime * 0.32);

    if (rootRef.current) {
      rootRef.current.rotation.x = THREE.MathUtils.damp(rootRef.current.rotation.x, THREE.MathUtils.lerp(0.18, 0.04, eased), 4.2, delta);
      rootRef.current.rotation.y = THREE.MathUtils.damp(rootRef.current.rotation.y, THREE.MathUtils.lerp(-0.16, 0.18, eased) + orbitPhase * 0.34, 3.2, delta);
      rootRef.current.rotation.z = THREE.MathUtils.damp(rootRef.current.rotation.z, orbitPhase * 0.03, 3.4, delta);
      rootRef.current.position.y = THREE.MathUtils.damp(rootRef.current.position.y, THREE.MathUtils.lerp(-0.18, 0.2, eased), 4.2, delta);
      rootRef.current.scale.x = THREE.MathUtils.damp(rootRef.current.scale.x, compact ? 0.66 : 1, 4.6, delta);
      rootRef.current.scale.y = THREE.MathUtils.damp(rootRef.current.scale.y, compact ? 0.66 : 1, 4.6, delta);
      rootRef.current.scale.z = THREE.MathUtils.damp(rootRef.current.scale.z, compact ? 0.66 : 1, 4.6, delta);
    }

    if (stageOneRef.current) {
      stageOneRef.current.position.x = THREE.MathUtils.damp(stageOneRef.current.position.x, THREE.MathUtils.lerp(-0.18, -0.9, eased), 4.8, delta);
      stageOneRef.current.position.y = THREE.MathUtils.damp(stageOneRef.current.position.y, THREE.MathUtils.lerp(0.1, 0.4, eased), 4.8, delta);
      stageOneRef.current.rotation.z = THREE.MathUtils.damp(stageOneRef.current.rotation.z, THREE.MathUtils.lerp(-0.05, -0.16, eased), 4.8, delta);
      stageOneRef.current.scale.x = THREE.MathUtils.damp(stageOneRef.current.scale.x, THREE.MathUtils.lerp(1, 0.88, eased), 4.8, delta);
      stageOneRef.current.scale.y = THREE.MathUtils.damp(stageOneRef.current.scale.y, THREE.MathUtils.lerp(1, 0.88, eased), 4.8, delta);
      stageOneRef.current.material.opacity = stageOneOpacity;
    }

    if (stageTwoRef.current) {
      stageTwoRef.current.position.x = THREE.MathUtils.damp(stageTwoRef.current.position.x, THREE.MathUtils.lerp(1.1, 0.12, eased), 4.8, delta);
      stageTwoRef.current.position.y = THREE.MathUtils.damp(stageTwoRef.current.position.y, THREE.MathUtils.lerp(-0.34, 0.02, eased), 4.8, delta);
      stageTwoRef.current.rotation.z = THREE.MathUtils.damp(stageTwoRef.current.rotation.z, THREE.MathUtils.lerp(0.18, -0.04, eased), 4.8, delta);
      stageTwoRef.current.scale.x = THREE.MathUtils.damp(stageTwoRef.current.scale.x, THREE.MathUtils.lerp(0.84, 1.02, eased), 4.8, delta);
      stageTwoRef.current.scale.y = THREE.MathUtils.damp(stageTwoRef.current.scale.y, THREE.MathUtils.lerp(0.84, 1.02, eased), 4.8, delta);
      stageTwoRef.current.material.opacity = stageTwoOpacity;
    }

    if (accentGlowRef.current) {
      accentGlowRef.current.material.opacity = THREE.MathUtils.damp(
        accentGlowRef.current.material.opacity,
        THREE.MathUtils.lerp(0.18, 0.34, 1 - Math.abs(eased - 0.5) * 1.4),
        3.8,
        delta,
      );
      accentGlowRef.current.rotation.z += delta * 0.08;
    }

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, THREE.MathUtils.lerp(-0.18, 0.22, eased) - orbitPhase * 0.16, 3.4, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, THREE.MathUtils.lerp(compact ? 0.08 : 0.14, compact ? -0.08 : -0.04, eased), 3.8, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, (compact ? 10.8 : 8.9) + Math.cos(state.clock.elapsedTime * 0.32) * 0.18, 3.2, delta);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#04080d"]} />
      <fog attach="fog" args={["#04080d", 7, 17]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 6]} intensity={1.7} color="#f8fbff" />
      <pointLight position={[-5, 2, 5]} intensity={24} color="#ff9a3d" />
      <pointLight position={[5, -2, 4]} intensity={10} color="#59b0ff" />
      <pointLight position={[0, 3, 7]} intensity={10} color="#ffffff" />

      <mesh rotation-x={-Math.PI / 2} position={[0, -2.65, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <shadowMaterial opacity={0.28} transparent />
      </mesh>

      <group ref={rootRef}>
        <mesh position={[0, 0, -1.1]}>
          <boxGeometry args={[7.9, 4.7, 0.42]} />
          <meshStandardMaterial color="#0f172a" metalness={0.42} roughness={0.5} />
        </mesh>

        <mesh position={[0, 0, -1.28]}>
          <planeGeometry args={[8.4, 5]} />
          <meshBasicMaterial color="#0f172a" transparent opacity={0.8} />
        </mesh>

        <mesh ref={accentGlowRef} position={[0.2, 0.1, -0.6]}>
          <planeGeometry args={[8, 4.8]} />
          <meshBasicMaterial color="#ff9c40" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
        </mesh>

        <mesh position={[0, -2.1, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.4, 3.8, 80]} />
          <meshBasicMaterial color="#ff9c40" transparent opacity={0.16} side={THREE.DoubleSide} />
        </mesh>

        <Float speed={2.1} rotationIntensity={0.2} floatIntensity={0.42}>
          <mesh ref={stageOneRef} position={[-0.18, 0.1, 0.1]}>
            <planeGeometry args={[5.45, 3.16]} />
            <meshStandardMaterial map={textures[0]} transparent opacity={1} roughness={0.42} metalness={0.05} side={THREE.FrontSide} alphaTest={0.06} />
          </mesh>
        </Float>

        <Float speed={2.35} rotationIntensity={0.24} floatIntensity={0.46}>
          <mesh ref={stageTwoRef} position={[1.1, -0.34, 1.25]} rotation={[0, 0, 0.18]}>
            <planeGeometry args={[4.9, 2.86]} />
            <meshStandardMaterial map={textures[1]} transparent opacity={0} roughness={0.3} metalness={0.08} side={THREE.FrontSide} alphaTest={0.06} />
          </mesh>
        </Float>

        {parts.slice(0, 4).map((part, index) => {
          const definition = labelDefinitions[index] ?? labelDefinitions[0];

          return (
            <group key={part.name}>
              <Line
                points={[definition.anchor, definition.label]}
                color="#ff9c40"
                lineWidth={1.3}
                transparent
                opacity={0.7}
              />
              <mesh position={definition.anchor}>
                <sphereGeometry args={[0.08, 32, 32]} />
                <meshStandardMaterial color="#ff9c40" emissive="#ff9c40" emissiveIntensity={1.8} />
              </mesh>
              <mesh position={definition.label}>
                <sphereGeometry args={[0.05, 20, 20]} />
                <meshBasicMaterial color="#ffd29c" />
              </mesh>
              <Html transform distanceFactor={7.1} position={definition.label}>
                <button
                  type="button"
                  onClick={() => onPartSelect(part.name)}
                  className="max-w-[9.2rem] rounded-full border border-white/18 bg-[rgba(5,10,16,0.82)] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_22px_rgba(0,0,0,0.3)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 hover:border-[rgba(255,156,64,0.7)]"
                >
                  {part.name}
                </button>
              </Html>
            </group>
          );
        })}
      </group>
    </>
  );
}

export function ServiceWebGLStage(props: ServiceWebGLStageProps) {
  const { compact = false } = props;

  return (
    <Canvas
      camera={{ position: [0, compact ? 0.04 : 0.2, compact ? 10.8 : 8.9], fov: compact ? 50 : 34 }}
      dpr={compact ? [1, 1.25] : [1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      shadows
    >
      <Suspense fallback={null}>
        <ServiceScene {...props} />
      </Suspense>
    </Canvas>
  );
}
