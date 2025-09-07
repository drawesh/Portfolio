import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { THREE, Vector3, DoubleSide } from '../../utils/three';

interface FloatingShapeProps {
  position: [number, number, number];
  geometry: 'box' | 'sphere' | 'torus' | 'octahedron' | 'icosahedron';
  color: string;
  scale?: number;
  speed?: number;
}

function FloatingShape({ position, geometry, color, scale = 1, speed = 1 }: FloatingShapeProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (mesh.current) {
      // Floating animation
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
      
      // Hover effect
      const targetScale = hovered ? scale * 1.2 : scale;
      mesh.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const renderGeometry = () => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.5, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[0.5, 0.2, 16, 100]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.5]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[0.5]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      {renderGeometry()}
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function WireframeShape({ position, size = 1 }: { position: [number, number, number]; size?: number }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.1;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.15;
      mesh.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={mesh} position={position} scale={size}>
      <dodecahedronGeometry args={[1]} />
      <meshBasicMaterial
        color="#3b82f6"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function ParticleOrb({ position }: { position: [number, number, number] }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh} position={position}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

function InteractiveRing({ position, radius = 2 }: { position: [number, number, number]; radius?: number }) {
  const ring = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { viewport, mouse } = useThree();

  useFrame((state) => {
    if (ring.current) {
      // Rotate based on mouse position
      ring.current.rotation.x = (mouse.y * viewport.height) / 2 * 0.1;
      ring.current.rotation.y = (mouse.x * viewport.width) / 2 * 0.1;
      
      // Base rotation
      ring.current.rotation.z += 0.01;
      
      // Scale effect when hovered
      const targetScale = hovered ? 1.1 : 1;
      ring.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <mesh
      ref={ring}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <ringGeometry args={[radius, radius + 0.1, 64]} />
      <meshBasicMaterial
        color={hovered ? "#ff6b35" : "#3b82f6"}
        transparent
        opacity={0.6}
        side={DoubleSide}
      />
    </mesh>
  );
}

export function GeometricShapes() {
  const shapes = [
    { position: [-8, 2, -5] as [number, number, number], geometry: 'icosahedron' as const, color: '#3b82f6', speed: 0.8 },
    { position: [8, -2, -3] as [number, number, number], geometry: 'octahedron' as const, color: '#8b5cf6', speed: 1.2 },
    { position: [-5, -4, -8] as [number, number, number], geometry: 'torus' as const, color: '#06b6d4', speed: 0.6 },
    { position: [6, 4, -6] as [number, number, number], geometry: 'sphere' as const, color: '#10b981', speed: 1.0 },
    { position: [0, -6, -10] as [number, number, number], geometry: 'box' as const, color: '#f59e0b', speed: 0.9 },
  ];

  const wireframes = [
    { position: [-12, 0, -15] as [number, number, number], size: 0.5 },
    { position: [12, 3, -12] as [number, number, number], size: 0.8 },
    { position: [0, 8, -20] as [number, number, number], size: 1.2 },
  ];

  const orbs = [
    { position: [-10, 6, -8] as [number, number, number] },
    { position: [10, -5, -7] as [number, number, number] },
    { position: [3, 7, -12] as [number, number, number] },
  ];

  return (
    <group>
      {/* Main floating shapes */}
      {shapes.map((shape, index) => (
        <FloatingShape
          key={`shape-${index}`}
          position={shape.position}
          geometry={shape.geometry}
          color={shape.color}
          speed={shape.speed}
          scale={0.8}
        />
      ))}

      {/* Wireframe shapes */}
      {wireframes.map((wireframe, index) => (
        <WireframeShape
          key={`wireframe-${index}`}
          position={wireframe.position}
          size={wireframe.size}
        />
      ))}

      {/* Particle orbs */}
      {orbs.map((orb, index) => (
        <ParticleOrb
          key={`orb-${index}`}
          position={orb.position}
        />
      ))}

      {/* Interactive rings */}
      <InteractiveRing position={[-15, -2, -10]} radius={1.5} />
      <InteractiveRing position={[15, 2, -8]} radius={2} />
      <InteractiveRing position={[0, -8, -15]} radius={2.5} />
    </group>
  );
}