"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import styles from "../../styles/Three/scene.module.css";

function ParticleRose() {
  const { scene } = useGLTF("/Three/2rose.glb"); // Ensure correct path
  const roseRef = useRef(); // For rotating the particles
  const particlesRef = useRef(new THREE.Group()); // Particle group

  useEffect(() => {
    // Scale up the model
    scene.scale.set(7, 7, 7);

    // Center the model by computing its bounding box and shifting its position
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);

    // Create a new BufferGeometry for the particle system
    const particleGeometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    const colorStops = {
      left: new THREE.Color(0xFDA172),       // Skin Pink (bottom)
      leftMiddle: new THREE.Color(0xFA8128),   // Orange (lower-middle)
    };

    let minY = Infinity;
    let maxY = -Infinity;
    const allVertices = [];

    scene.traverse((child) => {
      if (child.isMesh && child.geometry && child.geometry.attributes.position) {
        child.updateMatrixWorld(true);
        const posAttr = child.geometry.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
          const vertex = new THREE.Vector3().fromBufferAttribute(posAttr, i);
          vertex.applyMatrix4(child.matrixWorld);
          allVertices.push(vertex);
          if (vertex.y < minY) minY = vertex.y;
          if (vertex.y > maxY) maxY = vertex.y;
        }
      }
    });

    allVertices.forEach((vertex) => {
      vertices.push(vertex.x, vertex.y, vertex.z);
      const t = (vertex.y - minY) / (maxY - minY); // Normalized Y position

      let color;
      if (t > 0.95) {
        color = colorStops.left; // Top
      } else {
        color = colorStops.leftMiddle;
      }
      colors.push(color.r, color.g, color.b);
    });

    particleGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );

    // Create the particle system
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.01,
      vertexColors: true,
      depthTest: false,
      transparent: true,
      opacity: 0.9,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current.add(particles);
  }, [scene]);

  // Rotate the particle system
  useFrame(() => {
    if (roseRef.current) {
      roseRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={roseRef} position={[0, -5, 0]}>
      {/* Hide the actual rose model by NOT rendering <primitive object={scene} /> */}
      <primitive object={particlesRef.current} />
    </group>
  );
}

const ParticleViewer = () => {
  return (
    <div className={styles.rosecontainer}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <ParticleRose />
        <OrbitControls enableZoom={false} target={[0, -2, 0]} />
      </Canvas>
    </div>
  );
};

export default ParticleViewer;
