"use client";

import { useEffect, useMemo } from "react";
import BlockAxe from "./BlockAxe";
import BlockEnd from "./BlockEnd";
import BlockLimbo from "./BlockLimbo";
import BlockSpinner from "./BlockSpinner";
import BlockStart from "./BlockStart";
import Bounds from "./Bounds";
import { TILE_SIZE } from "@/constants";
import { useIsMounted } from "usehooks-ts";

type Props = {
  count?: number;
  types?: TupleUnion<Traps>;
  seed?: number;
  onLoaded?: () => void;
};

type Traps = keyof typeof traps;

type TupleUnion<U extends string, R extends any[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S?]
    : TupleUnion<Exclude<U, S>, [...R, S?]>;
}[U];

const traps = {
  BlockSpinner,
  BlockLimbo,
  BlockAxe,
};

const Level = ({
  count = 10,
  types = ["BlockAxe", "BlockLimbo", "BlockSpinner"],
  seed = 0,
  onLoaded,
}: Props) => {
  const isMounted = useIsMounted();

  const blocks = useMemo(() => {
    return [...Array(count)].map((_, idx) => {
      const randomBlock = types[
        Math.floor(Math.random() * types.length)
      ] as Traps;

      const Component = traps[randomBlock];

      return (
        <Component
          key={`${idx}-${seed}`}
          position={[0, 0, (idx + 1) * -TILE_SIZE]}
        />
      );
    });
  }, [count, types, seed]);

  useEffect(() => {
    if (isMounted()) onLoaded?.();
  }, [isMounted, onLoaded]);

  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {blocks}
      <BlockEnd
        position={[0, 0, (count + 1) * -TILE_SIZE]}
        key={`${seed}-${count}-${Math.random()}`}
      />
      <Bounds length={count + 2} key={`${seed}-${count}-${Math.random()}`} />
    </>
  );
};

export default Level;
