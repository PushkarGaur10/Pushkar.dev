import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import styles from '../../styles/Three/scene.module.css'
import WaveParticles from './Waveparticles';

const ParticleModel = ({ setLoading, scale }) => {
  const { scene } = useGLTF("/Three/flower.glb", true, (loader) => {
    loader.manager.onLoad = () => setLoading(false); // Set loading false when model loads
  });
  const particlesRef = useRef();
 
  useEffect(() => {
    // Create an empty buffer geometry
    const particleGeometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    // Define gradient colors
    const colorStops = {
      left: new THREE.Color(0xFDA172), // Skin Pink (on the left side)
      leftMiddle: new THREE.Color(0xFA8128), // Orange (middle-left)
      middle: new THREE.Color(0xED7014), // Red (middle)
      right: new THREE.Color(0x800020), // Burgundy Red (on the right side)
      red: new THREE.Color(0xFF0000), // Burgundy Red (on the right side)
      black: new THREE.Color(0x000000), // Burgundy Red (on the right side)
    };

    // Collect all vertices from the model
    const allVertices = [];
    let minX = Infinity;
    let maxX = -Infinity;

    // Traverse the model's scene to find all meshes and extract their vertices
    scene.traverse((child) => {
      if (child.isMesh) {
        const positionAttribute = child.geometry.attributes.position;

        for (let i = 0; i < positionAttribute.count; i++) {
          const vertex = [
            positionAttribute.getX(i),
            positionAttribute.getY(i),
            positionAttribute.getZ(i),
          ];

          allVertices.push(vertex);

          // Track min and max X positions (instead of Y)
          if (vertex[0] < minX) minX = vertex[0];
          if (vertex[0] > maxX) maxX = vertex[0];
        }
      }
    });

    // Randomly select a percentage of vertices
    const particleCount = Math.floor(allVertices.length * 0.4); // Choose 20% of the vertices
    const selectedIndices = new Set();

    while (selectedIndices.size < particleCount) {
      const randomIndex = Math.floor(Math.random() * allVertices.length);
      selectedIndices.add(randomIndex);
    }

    // Create vertices and colors arrays based on the selected indices
    selectedIndices.forEach((index) => {
      const vertex = allVertices[index];
      vertices.push(...vertex);

      // Map X position to a color gradient
      const xPos = vertex[0];
      const t = (xPos - minX) / (maxX - minX); // Normalize X position between 0 and 1

      let color;
      if (t > 0.85) {
        color = colorStops.black; // Burgundy Red on the far right
      }
      else if (t > 0.65) {
        color = colorStops.right; // Burgundy Red on the far right
      } else if (t > 0.55) {
        color = colorStops.red; // Red in the middle
      }else if (t > 0.35) {
        color = colorStops.middle; // Red in the middle
      } else if (t > 0.20) {
        color = colorStops.leftMiddle; // Orange in the middle-left
      } else {
        color = colorStops.left; // Skin Pink on the far left
      }

      colors.push(color.r, color.g, color.b); // Push the RGB values
    });

    // Convert vertices and colors arrays to Float32Arrays
    particleGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    particleGeometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3)
    );

    // Create a Points material (particles) with vertex colors enabled
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.015,
      vertexColors: true, // Enable vertex colors
    });

    // Create a Points mesh from the geometry and material
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current.add(particles);
  }, [scene]);

  // Return the group and ensure its position is centered
  return (
    <group
      ref={particlesRef}
      scale={[scale, scale, scale]} // Apply dynamic scaling
      position={[0, 0, 0]} // Ensure the model is centered
      rotation={[
        THREE.MathUtils.degToRad(-220), // X-axis 90° clockwise
        THREE.MathUtils.degToRad(-90),  // Y-axis 90° anticlockwise
        0,                              // Z-axis
      ]}
    />
  );
};

const ParticleViewer = ({ setLoading }) => {
  const [scale, setScale] = useState(1); // Default scale (100%)

  useEffect(() => {
    // Function to check screen size and update scale
    const updateScale = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setScale(0.75); // Scale down to 60% on mobile
      } else {
        setScale(1); // Full scale on desktop
      }
    };

    updateScale(); // Initial check
    window.addEventListener("resize", updateScale); // Listen for resizes

    return () => {
      window.removeEventListener("resize", updateScale); // Cleanup listener
    };
  }, []);

  return (
    <>
    <Canvas camera={{ position: [0, 0, 4.5], fov: 75 }}> {/* Adjust camera position for better view */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={5} color='white' />

      <ParticleModel className={styles.rose} setLoading={setLoading} scale={scale}/>
      <WaveParticles radius={1.15 * scale} amplitude={0.007 * scale} speed={0.5} rotation={[0.5, 0, -Math.PI / 4]} />
      <WaveParticles radius={1.15 * scale} amplitude={0.007 * scale} speed={0.5} rotation={[0.5, 0, Math.PI / 4]} />
      <WaveParticles radius={1.15 * scale} amplitude={0.007 * scale} speed={0.5} rotation={[0.5, Math.PI / 2, 0]} />
      <WaveParticles radius={1.15 * scale} amplitude={0.007 * scale} speed={0.5} rotation={[Math.PI / 2, 0.5, 0]} />

      <OrbitControls enableZoom={false} />
    </Canvas>
    </>
  );
};

export default ParticleViewer;




