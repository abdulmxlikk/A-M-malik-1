import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useTexture,
  Environment,
  Float,
  ContactShadows,
  PresentationControls,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

const CanMesh = () => {
  const canRef = useRef();
  // We use the provided image as the cylinder texture
  const texture = useTexture("/images/am-hero.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  // Adjusted repeat to attempt mapping the image nicely onto the cylinder
  // It might need to be adjusted based on the image's aspect ratio
  texture.repeat.set(1, 1);

  useFrame((state, delta) => {
    // Slow continuous rotation
    if (canRef.current) {
      canRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group>
      <mesh ref={canRef} castShadow position={[0, 0, 0]}>
        {/* Tall slim cylinder shape for energy drink */}
        <cylinderGeometry args={[1.3, 1.3, 7.5, 64]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.7}
          roughness={0.2}
          color="#ffffff"
        />
        {/* Can Top (Metallic) */}
        <mesh position={[0, 3.75, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.05, 64]} />
          <meshStandardMaterial metalness={0.9} roughness={0.1} color="#d4d4d4" />
        </mesh>
        {/* Can Bottom (Metallic) */}
        <mesh position={[0, -3.75, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.05, 64]} />
          <meshStandardMaterial metalness={0.9} roughness={0.1} color="#d4d4d4" />
        </mesh>
      </mesh>
    </group>
  );
};

export default function Can3D() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10,
      }}
    >
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 45 }}>
        {/* We use transparent background because the hero section will have the real background */}
        
        {/* Ambient lighting */}
        <ambientLight intensity={0.6} />

        {/* Soft white rim light */}
        <spotLight
          position={[10, 15, 10]}
          angle={0.2}
          penumbra={1}
          intensity={3}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        
        {/* Red glow on the opposite side */}
        <spotLight
          position={[-15, -10, -5]}
          color="#ff0022"
          angle={0.4}
          penumbra={1}
          intensity={8}
        />
        
        {/* Center highlight */}
        <pointLight position={[0, 5, 5]} intensity={1.5} color="#ffffff" />

        <PresentationControls
          global
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 300 }} // Snap back to center
          rotation={[0, 0.1, 0]}
          polar={[-Math.PI / 10, Math.PI / 10]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Float
            speed={2} // Animation speed
            rotationIntensity={0.3} // XYZ rotation intensity
            floatIntensity={0.8} // Up/down float intensity
          >
            <CanMesh />
          </Float>
        </PresentationControls>

        {/* Shadow on the floor */}
        <ContactShadows
          position={[0, -4.5, 0]}
          opacity={0.8}
          scale={15}
          blur={2.5}
          far={5}
          color="#000000"
        />

        {/* Subtle floating smoke / dust particles for realism */}
        <Sparkles 
          count={80} 
          scale={12} 
          size={5} 
          speed={0.3} 
          opacity={0.3} 
          color="#ffffff" 
        />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
