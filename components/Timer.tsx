import useGame from "@/stores/useGame";
import { Phase } from "@/types";
import { useEffect, useState } from "react";

export default function Timer() {
  const restart = useGame((state) => state.restart);
  const end = useGame((state) => state.end);
  const phase = useGame((state) => state.phase);
  const limitTime = useGame((state) => state.limitTime);
  const [timeLeft, setTimeLeft] = useState(limitTime);

  useEffect(() => {
    setTimeLeft(limitTime);
  }, [limitTime]);

  useEffect(() => {
    let intervalId: NodeJS.Timer | undefined; // Initialize to undefined

    if (phase === Phase.playing) {
      setTimeLeft(limitTime); // Reset timer to limit time
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 0.1; // Decrease time by 0.1 seconds
          if (newTime <= 0) {
            clearInterval(intervalId); // Stop the timer
            end(); // Call the end function
            return 0;
          }
          return newTime;
        });
      }, 100); // Update every 0.1 seconds
    }

    // Cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [phase, limitTime, end]);

  return (
    <>
      <div className="absolute top-[15%] left-0 w-full text-white text-[6vh] bg-opacity-30 bg-black py-2 text-center">
        {timeLeft.toFixed(2)}
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
