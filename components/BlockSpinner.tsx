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

const BlockSpinner = ({ position = [0, 0, 0] }: Props) => {
  const obstacle = useRef<ElementRef<typeof RigidBody>>(null);
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (obstacle.current) {
      const rotation = new THREE.Quaternion();
      rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));

      obstacle.current.setNextKinematicRotation(rotation);
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
        >
          <mesh
            material={obstacleMaterial}
            geometry={boxGeometry}
            position={[0, 0.3, 0]}
            scale={[3.5, 0.3, 0.3]}
            castShadow
            receiveShadow
          />
        </RigidBody>
      </group>
    </>
  );
};

export default BlockSpinner;
