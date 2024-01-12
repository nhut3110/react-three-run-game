"use client";

import { TILE_SIZE } from "@/constants";
import useGame from "@/stores/useGame";
import { Phase } from "@/types";
import { boxGeometry, floor1Material } from "@/utils/meshProps";
import { Float, Text } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { MeshProps } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";

type Props = Pick<MeshProps, "position">;

const BlockStart = ({ position = [0, 0, 0] }: Props) => {
  const phase = useGame((state) => state.phase);

  // Animation variants for the texts
  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <group position={position}>
      {phase === Phase.ready && (
        <Float floatIntensity={0.25} rotationIntensity={0.25}>
          <motion.group
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={textVariants}
          >
            <Text
              scale={0.2}
              font="/bebas-neue-v9-latin-regular.woff"
              position={[1, 0.65, 0]}
              maxWidth={0.25}
              lineHeight={0.75}
              textAlign="right"
              rotation-y={-0.25}
            >
              Start
              <meshBasicMaterial toneMapped={false} />
            </Text>
          </motion.group>
          <motion.group
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={textVariants}
          >
            <Text
              scale={0.2}
              font="/bebas-neue-v9-latin-regular.woff"
              position={[-1, 0.65, 0]}
              maxWidth={0.25}
              lineHeight={0.75}
              textAlign="left"
              rotation-y={0.25}
            >
              Run as fast as possible
              <meshBasicMaterial toneMapped={false} />
            </Text>
          </motion.group>
        </Float>
      )}

      <RigidBody
        type="fixed"
        position={[0, 0, 0]}
        colliders="hull"
        restitution={0.2}
        friction={0}
      >
        <mesh
          position={[0, 0, 0]}
          receiveShadow
          geometry={boxGeometry}
          scale={[TILE_SIZE, 0.2, TILE_SIZE]}
          material={floor1Material}
        />
      </RigidBody>
    </group>
  );
};

export default BlockStart;
