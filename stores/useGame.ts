import { TIME_RATIO } from "@/constants";
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
  setCount: (count: number) => void;
  limitTime: number;
  setLimitTime: (time: number) => void;
};

const useGame = create<GameState>()(
  subscribeWithSelector((set) => {
    return {
      blockCount: 10,
      phase: Phase.ready,
      startTime: 0,
      endTime: 0,
      blockSeed: 0,
      limitTime: 10,

      setCount: (count: number) => {
        set(() => {
          return {
            blockCount: count,
            limitTime: count * TIME_RATIO,
          };
        });
      },

      setLimitTime: (time: number) => {
        set(() => {
          return { limitTime: time };
        });
      },

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
            ? {
                phase: Phase.ready,
                blockSeed: Math.random(),
                limitTime: state.blockCount * TIME_RATIO,
              }
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
