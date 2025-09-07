import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { motion } from 'motion/react';
import { THREE } from '../../utils/three';

interface CodeParticleProps {
  position: [number, number, number];
  text: string;
  color?: string;
  size?: number;
  speed?: number;
}

function CodeParticle({ position, text, color = '#00ff00', size = 0.5, speed = 1 }: CodeParticleProps) {
  const textRef = useRef<any>(null);

  useFrame((state) => {
    if (textRef.current) {
      // Floating animation
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.5;
      
      // Subtle rotation
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Fade in/out effect
      const opacity = 0.7 + Math.sin(state.clock.elapsedTime * 2 + position[2]) * 0.3;
      if (textRef.current.material) {
        textRef.current.material.opacity = opacity;
      }
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={size}
      color={color}
      anchorX="center"
      anchorY="middle"
      transparent
      fillOpacity={0.8}
    >
      {text}
    </Text>
  );
}

function FloatingKeyboard() {
  const keyboardRef = useRef<THREE.Group>(null);
  const keys = useMemo(() => {
    const keyLayout = [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    const keys: Array<{ key: string; position: [number, number, number] }> = [];
    keyLayout.forEach((row, rowIndex) => {
      row.forEach((key, keyIndex) => {
        keys.push({
          key,
          position: [
            (keyIndex - row.length / 2) * 0.8,
            (2 - rowIndex) * 0.8,
            0
          ] as [number, number, number]
        });
      });
    });

    return keys;
  }, []);

  useFrame((state) => {
    if (keyboardRef.current) {
      keyboardRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      keyboardRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
      keyboardRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={keyboardRef} position={[0, 2, -8]} scale={0.3}>
        {keys.map((keyData, index) => (
          <group key={index} position={keyData.position}>
            {/* Key base */}
            <mesh>
              <boxGeometry args={[0.6, 0.6, 0.1]} />
              <meshBasicMaterial
                color="#1a1a1a"
                transparent
                opacity={0.8}
              />
            </mesh>
            {/* Key text */}
            <Text
              position={[0, 0, 0.06]}
              fontSize={0.3}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {keyData.key}
            </Text>
          </group>
        ))}
      </group>
    </Float>
  );
}

function MatrixRain() {
  const characters = useMemo(() => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const columns = 20;
    const drops: Array<{
      char: string;
      position: [number, number, number];
      speed: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < 15; j++) {
        drops.push({
          char: chars[Math.floor(Math.random() * chars.length)],
          position: [
            (i - columns / 2) * 1.5,
            10 - j * 1.2,
            -15 + Math.random() * 5
          ] as [number, number, number],
          speed: 0.5 + Math.random() * 1,
          opacity: Math.random()
        });
      }
    }

    return drops;
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        if (child.position.y < -15) {
          child.position.y = 10;
          // Change character occasionally
          if (Math.random() < 0.1) {
            const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            characters[index].char = chars[Math.floor(Math.random() * chars.length)];
          }
        } else {
          child.position.y -= characters[index].speed * delta * 10;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {characters.map((drop, index) => (
        <Text
          key={index}
          position={drop.position}
          fontSize={0.4}
          color="#00ff41"
          anchorX="center"
          anchorY="middle"
          transparent
          fillOpacity={drop.opacity}
        >
          {drop.char}
        </Text>
      ))}
    </group>
  );
}

export function CodeMatrix() {
  const codeSnippets = [
    'const portfolio = () => {',
    '  return <Amazing />',
    '}',
    'React.useState()',
    'TypeScript',
    'Three.js',
    '{ innovation }',
    'async/await',
    'useEffect()',
    'WebGL',
    'GLSL',
    'Vector3',
    'mesh.rotation',
    'useState',
    'useFrame',
    'component',
    'props',
    'state',
    'render',
    'animation'
  ];

  return (
    <group>
      {/* Floating code snippets */}
      {codeSnippets.map((snippet, index) => (
        <CodeParticle
          key={`code-${index}`}
          position={[
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 20,
            -20 + Math.random() * 10
          ]}
          text={snippet}
          color={index % 3 === 0 ? '#3b82f6' : index % 3 === 1 ? '#8b5cf6' : '#10b981'}
          size={0.3 + Math.random() * 0.3}
          speed={0.5 + Math.random() * 1}
        />
      ))}

      {/* Floating keyboard */}
      <FloatingKeyboard />

      {/* Matrix rain effect */}
      <MatrixRain />

      {/* Additional tech symbols */}
      {['</', '/>', '{', '}', '[]', '()', '=>', '!=', '===', '++'].map((symbol, index) => (
        <Float key={`symbol-${index}`} speed={1 + Math.random()} rotationIntensity={1} floatIntensity={2}>
          <Text
            position={[
              (Math.random() - 0.5) * 25,
              (Math.random() - 0.5) * 15,
              -10 + Math.random() * 5
            ]}
            fontSize={0.8}
            color="#06b6d4"
            anchorX="center"
            anchorY="middle"
            transparent
            fillOpacity={0.6}
          >
            {symbol}
          </Text>
        </Float>
      ))}
    </group>
  );
}