import { TILE_SIZE } from "@/constants";
import { boxGeometry, floor1Material } from "@/utils/meshProps";
import { useGLTF, Text } from "@react-three/drei";
import { MeshProps, useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Mesh } from "three";

type Props = Pick<MeshProps, "position">;

const BlockEnd = ({ position = [0, 0, 0] }: Props) => {
  const model = useGLTF("/hamburger.glb");
  const hamburgerRef = useRef<Mesh>(null);

  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  useFrame((_, delta) => {
    if (hamburgerRef.current) {
      hamburgerRef.current.rotation.y += delta;
    }
  });

  return (
    <group position={position}>
      <Text
        scale={1}
        font="/bebas-neue-v9-latin-regular.woff"
        position={[0, 2.25, 2]}
      >
        FINISH
        <meshBasicMaterial toneMapped={false} />
      </Text>
      <RigidBody
        type="fixed"
        position={[0, 0.25, 0]}
        colliders="hull"
        restitution={0.2}
        friction={0}
      >
        <primitive object={model.scene} scale={0.15} ref={hamburgerRef} />
      </RigidBody>

      <mesh
        position={[0, 0, 0]}
        receiveShadow
        geometry={boxGeometry}
        scale={[TILE_SIZE, 0.2, TILE_SIZE]}
        material={floor1Material}
      />
    </group>
  );
};

export default BlockEnd;
