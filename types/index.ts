import { MeshProps } from "@react-three/fiber";

export type Mesh = Pick<MeshProps, "position" | "material" | "geometry">;

export enum Controls {
  forward = "forward",
  backward = "backward",
  leftward = "leftward",
  rightward = "rightward",
  jump = "jump",
}

export enum Phase {
  ready = "ready",
  playing = "playing",
  done = "done",
}
