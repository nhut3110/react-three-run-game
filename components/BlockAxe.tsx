"use client";

import {
  boxGeometry,
  floor2Material,
  obstacleMaterial,
} from "@/utils/meshProps";
import { MeshProps, useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import * as THREE from "three";

import { ElementRef } from "react";

type Props = Pick<MeshProps, "position">;

const BlockAxe = ({ position = [0, 0, 0] }: Props) => {
  const obstacle = useRef<ElementRef<typeof RigidBody>>(null);
  const [timeOffset] = useState(() => Math.random() + 0.2 * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const kinematicPosition = new THREE.Vector3(...(position as THREE.Vector3));
    kinematicPosition.x = Math.sin(time + timeOffset) * 1.25;
    kinematicPosition.y += 0.75;

    if (obstacle.current) {
      obstacle.current.setNextKinematicTranslation(kinematicPosition);
    }
  });

  return (
    <>
      <group position={position}>
        <mesh
          position={[0, -0.1, 0]}
          receiveShadow
          geometry={boxGeometry}
          scale={[4, 0.2, 4]}
          material={floor2Material}
        />
        <RigidBody
          type="kinematicPosition"
          restitution={0.2}
          friction={0}
          ref={obstacle}
          position={[0, 0.3, 0]}
        >
          <mesh
            material={obstacleMaterial}
            geometry={boxGeometry}
            scale={[1.5, 1.5, 0.3]}
            castShadow
            receiveShadow
          />
        </RigidBody>
      </group>
    </>
  );
};

export default BlockAxe;
