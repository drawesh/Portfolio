import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { THREE, AdditiveBlending, DoubleSide } from '../../utils/three';

interface AccretionDiskProps {
  radius?: number;
}

function AccretionDisk({ radius = 2 }: AccretionDiskProps) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh ref={mesh}>
      <ringGeometry args={[radius * 0.8, radius * 2, 64]} />
      <meshBasicMaterial
        color="#ff6b35"
        transparent
        opacity={0.6}
        blending={AdditiveBlending}
        side={DoubleSide}
      />
    </mesh>
  );
}

function GravitationalLensing() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      mesh.current.scale.setScalar(scale);
      mesh.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={mesh}>
      <circleGeometry args={[3, 64]} />
      <meshBasicMaterial
        transparent
        opacity={0.1}
        color="#ffffff"
        blending={AdditiveBlending}
        side={DoubleSide}
      />
    </mesh>
  );
}

function EventHorizon() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      // Subtle pulsing
      const scale = 0.8 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      mesh.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={mesh}>
      <circleGeometry args={[0.5, 32]} />
      <meshBasicMaterial color="#000000" transparent opacity={0.9} />
    </mesh>
  );
}

interface BlackHoleEffectProps {
  position?: [number, number, number];
  scale?: number;
}

export function BlackHoleEffect({ position = [0, 0, 0], scale = 1 }: BlackHoleEffectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Accretion disk */}
      <AccretionDisk radius={2} />
      
      {/* Gravitational lensing effect */}
      <GravitationalLensing />
      
      {/* Event horizon */}
      <EventHorizon />
      
      {/* Additional particle effects */}
      <group>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 3,
              Math.sin((i / 8) * Math.PI * 2) * 3,
              0
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial
              color="#ff6b35"
              transparent
              opacity={0.8}
              blending={AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}