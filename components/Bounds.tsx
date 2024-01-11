import { TILE_SIZE } from "@/constants";
import {
  boxGeometry,
  wallMaterial,
  wallTransparentMaterial,
} from "@/utils/meshProps";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

type Props = {
  length?: number;
};

export default function Bounds({ length = 1 }: Props) {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          receiveShadow
          scale={[0.3, 1.5, length * TILE_SIZE]}
          position={[-2.15, 0.75, 2 - (length * TILE_SIZE) / 2]}
        />

        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          castShadow
          scale={[0.3, 1.5, length * TILE_SIZE]}
          position={[2.15, 0.75, 2 - (length * TILE_SIZE) / 2]}
        />

        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          castShadow
          scale={[4.6, 1.5, 0.3]}
          position={[0, 0.75, -length * TILE_SIZE + 2]}
        />
        <mesh
          geometry={boxGeometry}
          material={wallTransparentMaterial}
          scale={[4.6, 1.5, 0.3]}
          position={[0, 0.75, 2]}
        />
        <CuboidCollider
          restitution={0.2}
          friction={1}
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2) + 2]}
        />
      </RigidBody>
    </>
  );
}
