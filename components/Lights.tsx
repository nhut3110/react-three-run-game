"use client";

import { TILE_SIZE } from "@/constants";
import { useFrame } from "@react-three/fiber";
import { useRef, ElementRef } from "react";

export default function Lights() {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    if (directionalLightRef.current) {
      directionalLightRef.current.position.z =
        state.camera.position.z + 1 - TILE_SIZE;
      directionalLightRef.current.target.position.z =
        state.camera.position.z - TILE_SIZE;
      directionalLightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        castShadow
        position={[4, 4, 1]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={0.5} />
    </>
  );
}
