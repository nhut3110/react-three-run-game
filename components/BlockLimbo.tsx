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
import { TILE_SIZE } from "@/constants";

type Props = Pick<MeshProps, "position">;

const BlockLimbo = ({ position = [0, 0, 0] }: Props) => {
  const obstacle = useRef<ElementRef<typeof RigidBody>>(null);
  const [timeOffset] = useState(() => Math.random() + 0.2 * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const kinematicPosition = new THREE.Vector3(...(position as THREE.Vector3));
    kinematicPosition.y = Math.sin(time + timeOffset) + 1.15;

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
          scale={[TILE_SIZE, 0.2, TILE_SIZE]}
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
            scale={[3.5, 0.3, 0.3]}
            castShadow
            receiveShadow
          />
        </RigidBody>
      </group>
    </>
  );
};

export default BlockLimbo;
