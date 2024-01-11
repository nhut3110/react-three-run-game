import { TILE_SIZE } from "@/constants";
import { boxGeometry, floor1Material } from "@/utils/meshProps";
import { Float, Text } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";

type Props = Pick<MeshProps, "position">;

const BlockStart = ({ position = [0, 0, 0] }: Props) => {
  return (
    <group position={position}>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          scale={0.5}
          font="/bebas-neue-v9-latin-regular.woff"
          position={[0.75, 0.65, 0]}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          rotation-y={-0.25}
        >
          Run
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
      <mesh
        position={[0, -0.1, 0]}
        receiveShadow
        geometry={boxGeometry}
        scale={[TILE_SIZE, 0.2, TILE_SIZE]}
        material={floor1Material}
      />
    </group>
  );
};

export default BlockStart;
