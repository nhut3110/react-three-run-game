"use client";

import Timer from "./Timer";
import ControlKey from "./ui/ControlKey";

export default function Interface() {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      <Timer />

      <div className="absolute bottom-[10%] left-0 w-full">
        <div className="flex justify-center">
          <ControlKey keyName="forward" />
        </div>
        <div className="flex justify-center">
          <ControlKey keyName="leftward" />
          <ControlKey keyName="backward" />
          <ControlKey keyName="rightward" />
        </div>
        <div className="flex justify-center">
          <ControlKey large keyName="jump" />
        </div>
      </div>
    </div>
  );
}
