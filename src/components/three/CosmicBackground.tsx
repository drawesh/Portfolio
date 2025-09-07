import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { motion } from 'motion/react';
import { THREE, AdditiveBlending } from '../../utils/three';

interface StarFieldProps {
  count?: number;
}

function StarField({ count = 5000 }: StarFieldProps) {
  const mesh = useRef<THREE.Points>(null);

  // Generate random star positions
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Create a spherical distribution
      const radius = 500;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(1 - 2 * Math.random());
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Random star colors (bluish-white to warm white)
      const colorVariant = Math.random();
      if (colorVariant < 0.7) {
        // Most stars are white/blue-white
        colors[i * 3] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 2] = 1;
      } else if (colorVariant < 0.9) {
        // Some stars are warm/yellow
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.6 + Math.random() * 0.2;
      } else {
        // Few stars are purple/blue
        colors[i * 3] = 0.6 + Math.random() * 0.4;
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.4;
        colors[i * 3 + 2] = 1;
      }
    }
    
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      // Gentle rotation
      mesh.current.rotation.x = state.clock.elapsedTime * 0.0002;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.0001;
      mesh.current.rotation.z = state.clock.elapsedTime * 0.00005;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

function NebulaCloud() {
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.z = state.clock.elapsedTime * 0.0005;
      mesh.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, -200]} scale={[viewport.width * 2, viewport.height * 2, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <meshBasicMaterial
        transparent
        opacity={0.1}
        color="#4338ca"
        blending={AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function CosmicBackground() {
  return (
    <>
      <StarField count={3000} />
      <NebulaCloud />
    </>
  );
}