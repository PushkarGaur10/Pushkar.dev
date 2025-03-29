import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
  Html,
} from "@react-three/drei";
import styles from "@/styles/Ball.module.css";

const Ball = (props) => {
  // Use a default image if props.imgUrl is not provided
  const [decal] = useTexture([props.imgUrl || '/skills/html1.png']);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const SkillsOverlay = () => (
  <Html center position={[0, 2.5, 0]}>
    <div className={styles.skillsOverlay}>
      <h2>My Skills</h2>
      <ul>
        <li>React</li>
        <li>Three.js</li>
        <li>Next.js</li>
        <li>JavaScript</li>
        <li>CSS</li>
      </ul>
    </div>
  </Html>
);

const BallCanvas = ({ icon }) => {
  // Provide a default icon if none is passed
  const imageUrl = icon || '/skills/html1.png';

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<Html center><div>Loading...</div></Html>}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={imageUrl} />
        <SkillsOverlay />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
