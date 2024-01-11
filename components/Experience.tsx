"use client";

import Lights from "./Lights";
import Level from "./Level";
import { Physics } from "@react-three/rapier";
import Player from "./Player";
import useGame from "@/stores/useGame";

const Experience = () => {
  const blockCount = useGame((state) => state.blockCount);
  const blockSeed = useGame((state) => state.blockSeed);

  return (
    <>
      <color args={["#bdedfc"]} attach="background" />

      <Physics>
        <Lights />
        <Level count={blockCount} seed={blockSeed} />
        <Player />
      </Physics>
    </>
  );
};

export default Experience;
