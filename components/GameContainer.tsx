"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { KeyboardControls } from "@react-three/drei";
import Interface from "./Interface";
import { Controls } from "@/types";

const GameContainer = () => {
  return (
    <KeyboardControls
      map={[
        {
          name: Controls.forward,
          keys: ["ArrowUp", "KeyW"],
        },
        {
          name: Controls.backward,
          keys: ["ArrowDown", "KeyS"],
        },
        {
          name: Controls.leftward,
          keys: ["ArrowLeft", "KeyA"],
        },
        {
          name: Controls.rightward,
          keys: ["ArrowRight", "KeyD"],
        },
        {
          name: Controls.jump,
          keys: ["Space"],
        },
      ]}
    >
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}
      >
        <Experience />
      </Canvas>
      <Interface />
    </KeyboardControls>
  );
};

export default GameContainer;
