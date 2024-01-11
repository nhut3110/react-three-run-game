"use client";

import { TILE_SIZE } from "@/constants";
import useGame from "@/stores/useGame";
import { Controls, Phase } from "@/types";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useRef, ElementRef, useEffect, useCallback, useState } from "react";
import * as THREE from "three";

export default function Player() {
  const [subscribeKeys, getKeys] = useKeyboardControls<Controls>();
  const bodyRef = useRef<ElementRef<typeof RigidBody>>(null);

  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);
  const blockCount = useGame((state) => state.blockCount);
  const phase = useGame((state) => state.phase);

  console.log(phase);

  const { rapier, world } = useRapier();

  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const jump = useCallback(() => {
    if (!bodyRef.current) return;

    const origin = bodyRef.current.translation();
    const direction = { x: 0, y: -1, z: 0 };

    origin.y -= 0.31;

    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);

    if (hit && hit.toi < 0.15) {
      bodyRef.current.applyImpulse({ x: 0, y: 0.5, z: 0 }, true);
    }
  }, [rapier.Ray, world]);

  const reset = useCallback(() => {
    bodyRef.current?.setTranslation({ x: 0, y: 0, z: 0 }, false);
    bodyRef.current?.setLinvel({ x: 0, y: 0, z: 0 }, false);
    bodyRef.current?.setAngvel({ x: 0, y: 0, z: 0 }, false);
  }, []);

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === Phase.ready) {
          reset();
        }
      }
    );

    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) jump();
      }
    );

    const unsubscribeAny = subscribeKeys(() => {
      start();
    });

    return () => {
      unsubscribeJump();
      unsubscribeAny();
      unsubscribeReset();
    };
  }, [jump, subscribeKeys, start, reset]);

  useFrame((state, delta) => {
    /** CONTROLS */
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStreight = 0.6 * delta;
    const torqueStreight = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStreight;
      torque.x -= torqueStreight;
    }

    if (backward) {
      impulse.z += impulseStreight;
      torque.x += torqueStreight;
    }

    if (leftward) {
      impulse.x -= impulseStreight;
      torque.z += torqueStreight;
    }

    if (rightward) {
      impulse.x += impulseStreight;
      torque.z -= torqueStreight;
    }

    if (bodyRef.current) {
      bodyRef.current.applyImpulse(impulse, true);
      bodyRef.current.applyTorqueImpulse(torque, true);
    }

    /** CAMERA */

    if (bodyRef.current) {
      const bodyPosition = bodyRef.current.translation();

      const cameraPosition = new THREE.Vector3();
      cameraPosition.copy(bodyPosition as THREE.Vector3);
      cameraPosition.z += 2.25;
      cameraPosition.y += 0.65;

      const cameraTarger = new THREE.Vector3();
      cameraTarger.copy(bodyPosition as THREE.Vector3);
      cameraTarger.y += 0.25;

      smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
      smoothedCameraTarget.lerp(cameraTarger, 5 * delta);

      state.camera.position.copy(smoothedCameraPosition);
      state.camera.lookAt(smoothedCameraTarget);

      /** PHASES */

      if (bodyPosition.z < -(blockCount * TILE_SIZE + 2)) {
        end();
      }

      if (bodyPosition.y < -4) {
        restart();
      }
    }
  });

  return (
    <RigidBody
      position={[0, 1, 0]}
      colliders="ball"
      restitution={0.2}
      friction={1}
      canSleep={false}
      ref={bodyRef}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color={"mediumpurple"} />
      </mesh>
    </RigidBody>
  );
}
