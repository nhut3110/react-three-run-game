"use client";

import Lights from "./Lights";
import Level from "./Level";
import { Physics } from "@react-three/rapier";
import Player from "./Player";
import useGame from "@/stores/useGame";
import { Suspense } from "react";

const Experience = () => {
  const blockCount = useGame((state) => state.blockCount);
  const blockSeed = useGame((state) => state.blockSeed);

  return (
    <>
      <color args={["#bdedfc"]} attach="background" />
      <Suspense fallback={null}>
        <Physics>
          <Lights />
          <Level count={blockCount} seed={blockSeed} />
          <Player />
        </Physics>
      </Suspense>
    </>
  );
};

export default Experience;
