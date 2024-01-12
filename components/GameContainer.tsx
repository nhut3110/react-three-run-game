"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactModal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
import { useBoolean } from "usehooks-ts";
import useGame from "@/stores/useGame";
import { Phase } from "@/types";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import Interface from "./Interface";
import { LoadingScreen } from "./ui/LoadingScreen";
import { Controls } from "@/types";
import Experience from "./Experience";
import { SettingIcon } from "./ui/SettingIcon";
import { ResetIcon } from "./ui/ResetIcon";
import { TIME_RATIO } from "@/constants";

const GameContainer = () => {
  const { value: started, setValue: setStarted } = useBoolean(false);
  const phase = useGame((state) => state.phase);
  const setCount = useGame((state) => state.setCount);
  const setLimitTime = useGame((state) => state.setLimitTime);
  const restart = useGame((state) => state.restart);
  const { value: isModalOpen, setValue: setIsModalOpen } = useBoolean(false);
  const [numTraps, setNumTraps] = useState("");
  const audio = useMemo(() => new Audio("./audio/game-background.mp3"), []);
  const [isAudioOn, setIsAudioOn] = useState(true);

  // Handle audio toggle change
  const handleAudioToggle = () => {
    setIsAudioOn(!isAudioOn);
    if (isAudioOn) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  // Update useEffect for audio to respect the isAudioOn state
  useEffect(() => {
    if (started && isAudioOn) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [started, isAudioOn, audio]);

  const handleSettingsClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    const count = parseInt(numTraps, 10);
    if (
      !isNaN(count) &&
      /^[0-9]*\.?[0-9]+$/.test(count.toString()) &&
      count <= 100
    ) {
      setCount(count);
      setLimitTime(count * TIME_RATIO);
    }
    handleModalClose();
    restart();
  };

  useEffect(() => {
    ReactModal.setAppElement("#main");
  }, []);

  // Define animation variants
  const animationVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const renderCanvas = useCallback(() => {
    return (
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}
      >
        <Experience />
      </Canvas>
    );
  }, []);

  return (
    <KeyboardControls
      map={[
        {
          name: Controls.forward,
          keys: ["ArrowUp", "KeyW"],
        },
        {
          name: Controls.backward,
          keys: ["ArrowDown", "KeyS"],
        },
        {
          name: Controls.leftward,
          keys: ["ArrowLeft", "KeyA"],
        },
        {
          name: Controls.rightward,
          keys: ["ArrowRight", "KeyD"],
        },
        {
          name: Controls.jump,
          keys: ["Space"],
        },
      ]}
    >
      {renderCanvas()}
      <AnimatePresence>
        {started && (
          <motion.div
            variants={animationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <Interface />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!started && (
          <motion.div
            variants={animationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <LoadingScreen
              onStarted={() => setStarted(true)}
              started={started}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {phase === Phase.ready && started && (
        <div
          className="absolute top-4 left-4 w-10 h-10 cursor-pointer"
          onClick={handleSettingsClick}
        >
          <SettingIcon />
        </div>
      )}
      {started && (
        <div
          className="absolute top-4 right-4 w-10 h-10 cursor-pointer"
          onClick={restart}
        >
          <ResetIcon />
        </div>
      )}

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-medium mb-4">Set Number of Traps</h2>
            <input
              type="number"
              value={numTraps}
              onChange={(e) => setNumTraps(e.target.value)}
              className="border-2 border-gray-300 p-2 rounded-lg mb-4 w-full"
            />
            <div className="flex items-center justify-between mb-4 w-full">
              <label>Toggle Audio</label>
              <input
                type="checkbox"
                checked={isAudioOn}
                onChange={handleAudioToggle}
                className="mr-2 h-4 w-4"
              />
            </div>
            <button
              onClick={handleConfirm}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
            >
              <p className="w-full text-center text-lg">Confirm</p>
            </button>
          </div>
        </div>
      </ReactModal>
    </KeyboardControls>
  );
};

export default GameContainer;
