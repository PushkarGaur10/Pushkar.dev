import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const createParticleSystem = (radius, particleCount) => {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const colors = [];

  const colorsByRegion = {
    left: new THREE.Color(0xFDA172), // Skin Pink (on the left side)
    leftMiddle: new THREE.Color(0xFA8128), // on the edge
    middle: new THREE.Color(0xED7014), // middle to edge
    red: new THREE.Color(0xFF0000),
  };

  const colorStart = new THREE.Color(0xff5733); // Start color
  const colorEnd = new THREE.Color(0xffc300); // End color

  for (let i = 0; i < particleCount; i++) {
    const r = radius + Math.random() * 0.1;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    // Generate spherical coordinates
    const x = r * Math.sin(phi) * Math.cos(theta) * 2; // Increase horizontal spread
    const y = (r * Math.sin(phi) * Math.sin(theta)) * 0.2; // Reduce vertical spread
    const z = r * Math.cos(phi) * 2; // Increase horizontal spread

    positions.push(x, y, z);

 // Assign colors based on the x-coordinate
 let color;
 if (x < -1) {
   color = colorsByRegion.left;
 } else if (x < -0.5) {
   color = colorsByRegion.leftMiddle;
 } else {
   color = colorsByRegion.middle;
 }

 colors.push(color.r, color.g, color.b);

  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  );

  const material = new THREE.PointsMaterial({
    size: 0.015,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
  });

  return new THREE.Points(geometry, material);
};

const WaveParticles = ({ radius = 1.5, amplitude = 0.01, speed = 1, rotation = [0, 0, 0] }) => {
  const particlesRef = useRef();

  if (!particlesRef.current) {
    particlesRef.current = createParticleSystem(radius, 1000); // Pre-create particles
  }

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * speed;
    const positions = particlesRef.current.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      // Apply wave motion subtly to the y-coordinate
      const waveEffect = amplitude * Math.sin(2 * Math.PI * (x + time) * 0.5); // Reduced amplitude effect
      positions[i + 1] = y + waveEffect * 0.3; // Further limit the wave effect on y
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group rotation={rotation}>
      <primitive object={particlesRef.current} />
    </group>
  );
};

export default WaveParticles;
