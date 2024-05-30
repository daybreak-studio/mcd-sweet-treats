import React from "react";
import Button from "../../Button/Button";
import ScriptNumber from "./ScriptNumber";

import Line1SVG from "./line-1.svg";
import Line2SVG from "./line-2.svg";
import Line3SVG from "./line-3.svg";
import Line4SVG from "./line-4.svg";
import HanddrawnLine from "./HanddrawnLine";

type Props = {
  onProceed: () => void;
};

const VideoInstuction = ({ onProceed }: Props) => {
  return (
    <div className="flex w-full flex-col items-center bg-light px-4 py-12  text-center">
      <h2 className="font-serif-xl mb-8 max-w-[15ch]">
        A few tips on looking your best for grandma
      </h2>
      <div className="mb-12 flex flex-col gap-4 font-bold">
        <div>
          <ScriptNumber number={1} /> Use{" "}
          <HanddrawnLine LineComponent={Line1SVG}>
            natural, front-facing
          </HanddrawnLine>{" "}
          light
        </div>
        <div>
          <ScriptNumber number={2} /> Position the camera above{" "}
          <HanddrawnLine LineComponent={Line2SVG}>eye level</HanddrawnLine>
        </div>
        <div>
          <ScriptNumber number={3} />
          Wear{" "}
          <HanddrawnLine LineComponent={Line3SVG}>
            neutral, solid colors
          </HanddrawnLine>
        </div>
        <div>
          <ScriptNumber number={4} />
          Choose a clean, &#8203;{" "}
          <HanddrawnLine LineComponent={Line4SVG}>
            uncluttered background
          </HanddrawnLine>
        </div>
      </div>
      <Button onClick={onProceed}>Got It</Button>
    </div>
  );
};

export default VideoInstuction;
