import useGame from "@/stores/useGame";
import { Phase } from "@/types";
import { addEffect } from "@react-three/fiber";
import { ElementRef, useRef, useEffect } from "react";

export default function Timer() {
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);
  const timeRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    const unsubscribe = addEffect(() => {
      const state = useGame.getState();
      let elapsedTime: string | number = 0;

      if (state.phase === Phase.playing) {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === Phase.done) {
        elapsedTime = state.endTime - state.startTime;
      }

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (timeRef.current) {
        timeRef.current.textContent = `${elapsedTime}`;
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div
        className="absolute top-[15%] left-0 w-full text-white text-[6vh] bg-opacity-30 bg-black py-2 text-center"
        ref={timeRef}
      >
        0
      </div>

      {phase === Phase.done && (
        <button
          className="flex justify-center absolute top-[40%] left-0 w-full text-white text-[80px] bg-opacity-30 pt-3 bg-black pointer-events-auto cursor-pointer"
          onClick={restart}
        >
          Restart
        </button>
      )}
    </>
  );
}
