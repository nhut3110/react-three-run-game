"use client";

import { useProgress } from "@react-three/drei";
import React, { useEffect, useMemo, useState } from "react";
import {
  CircleLoader,
  ClimbingBoxLoader,
  ClockLoader,
  HashLoader,
  PacmanLoader,
  RingLoader,
} from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import Button3d from "../3d-button/Button";

interface LoadingScreenProps {
  started: boolean;
  onStarted: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  started,
  onStarted,
}) => {
  const { progress } = useProgress();
  const [isReadyToStart, setIsReadyToStart] = useState(false);

  const loadingList = useMemo(() => {
    return [
      <ClimbingBoxLoader color="#36d7b7" key={1} />,
      <PacmanLoader color="#36d7b7" key={2} />,
      <CircleLoader color="#36d7b7" key={3} />,
      <ClockLoader color="#36d7b7" key={4} />,
      <HashLoader color="#36d7b7" key={5} />,
      <RingLoader color="#36d7b7" key={6} />,
    ];
  }, []);

  const randomIndex = useMemo(() => {
    return Math.floor(Math.random() * loadingList.length);
  }, [loadingList.length]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (progress >= 100) {
      timeoutId = setTimeout(() => setIsReadyToStart(true), 5000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [progress]);

  return (
    <AnimatePresence>
      {!started && (
        <motion.div
          className="fixed inset-0 bg-gray-500 flex items-center justify-center z-50 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <AnimatePresence>
            {isReadyToStart && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Button3d onClick={onStarted} />
              </motion.div>
            )}
          </AnimatePresence>

          {!isReadyToStart && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              {loadingList[randomIndex]}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
