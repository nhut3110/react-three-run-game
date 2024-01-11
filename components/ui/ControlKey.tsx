"use client";

import { useKeyboardControls } from "@react-three/drei";
import { Controls } from "@/types";

type Props = {
  large?: boolean;
  keyName: `${Controls}`;
};

export default function ControlKey({ keyName, large = false }: Props) {
  const isActive = useKeyboardControls<Controls>((state) => state[keyName]);

  return (
    <div
      className={`${
        large ? "w-36" : "w-10"
      } h-10 m-1 border border-solid border-white bg-white bg-opacity-60 ${
        isActive ? "bg-opacity-95 " : "bg-opacity-40"
      }`}
    ></div>
  );
}
