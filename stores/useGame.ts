import { Phase } from "@/types";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type GameState = {
  blockCount: number;
  phase: Phase;
  start: () => void;
  restart: () => void;
  end: () => void;
  startTime: number;
  endTime: number;
  blockSeed: number;
};

const useGame = create<GameState>()(
  subscribeWithSelector((set) => {
    return {
      blockCount: 5,
      phase: Phase.ready,
      startTime: 0,
      endTime: 0,
      blockSeed: 0,

      start: () => {
        set((state) => {
          return state.phase === Phase.ready
            ? { phase: Phase.playing, startTime: Date.now() }
            : {};
        });
      },
      restart: () => {
        set((state) => {
          return state.phase !== Phase.ready
            ? { phase: Phase.ready, blockSeed: Math.random() }
            : {};
        });
      },
      end: () => {
        set((state) => {
          return state.phase !== Phase.done
            ? { phase: Phase.done, endTime: Date.now() }
            : {};
        });
      },
    };
  })
);

export default useGame;
