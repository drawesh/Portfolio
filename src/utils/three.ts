// Centralized Three.js imports to prevent multiple instances
// This ensures all Three.js usage goes through a single instance

// Re-export everything from Three.js
export * from 'three';

// Re-export the main THREE object
import * as THREE from 'three';
export { THREE };
export default THREE;

// Common Three.js objects that are frequently used
export const {
  Vector3,
  Mesh,
  Group,
  Points,
  AdditiveBlending,
  DoubleSide,
  MathUtils,
  ACESFilmicToneMapping,
} = THREE;