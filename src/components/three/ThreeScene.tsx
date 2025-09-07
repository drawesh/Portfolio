import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment
} from '@react-three/drei';
import { motion } from 'motion/react';
import { THREE } from '../../utils/three';

import { CosmicBackground } from './CosmicBackground';
import { BlackHoleEffect } from './BlackHoleEffect';
import { GeometricShapes } from './GeometricShapes';
import { CodeMatrix } from './CodeMatrix';
import { WebGLFallback } from './WebGLFallback';

interface ThreeSceneProps {
  enableInteractions?: boolean;
  showBlackHole?: boolean;
  showCodeMatrix?: boolean;
  showGeometricShapes?: boolean;
  className?: string;
}

function Scene({ enableInteractions, showBlackHole, showCodeMatrix, showGeometricShapes }: Omit<ThreeSceneProps, 'className'>) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((state) => {
    if (cameraRef.current && enableInteractions) {
      // Subtle camera movement based on mouse
      const { mouse } = state;
      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, mouse.x * 2, 0.02);
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, mouse.y * 2, 0.02);
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      {/* Camera setup */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 10]}
        fov={75}
        near={0.1}
        far={1000}
      />

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#8b5cf6" />
      <spotLight
        position={[0, 20, 10]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#ffffff"
        castShadow
      />

      {/* Environment */}
      <Environment preset="night" />

      {/* Scene components */}
      <CosmicBackground />
      
      {showBlackHole && (
        <BlackHoleEffect position={[15, 5, -20]} scale={0.5} />
      )}
      
      {showGeometricShapes && <GeometricShapes />}
      
      {showCodeMatrix && <CodeMatrix />}

      {/* Controls */}
      {enableInteractions && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          rotateSpeed={0.5}
        />
      )}
    </>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
    </mesh>
  );
}

export function ThreeScene({
  enableInteractions = true,
  showBlackHole = true,
  showCodeMatrix = true,
  showGeometricShapes = true,
  className = "w-full h-full"
}: ThreeSceneProps) {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  // Fallback for browsers without WebGL support
  if (!webglSupported) {
    return <WebGLFallback />;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          // Additional WebGL context setup
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene
            enableInteractions={enableInteractions}
            showBlackHole={showBlackHole}
            showCodeMatrix={showCodeMatrix}
            showGeometricShapes={showGeometricShapes}
          />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}