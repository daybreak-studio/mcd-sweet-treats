import React from "react";

import NumberSVG1 from "./number-1.svg";
import NumberSVG2 from "./number-2.svg";
import NumberSVG3 from "./number-3.svg";
import NumberSVG4 from "./number-4.svg";

type Props = {
  number: number;
};

const ScriptNumber = ({ number }: Props) => {
  return (
    <span className="-mb-1 mr-1 inline-block h-4 w-4">
      {number === 1 && <NumberSVG1 />}
      {number === 2 && <NumberSVG2 />}
      {number === 3 && <NumberSVG3 />}
      {number === 4 && <NumberSVG4 />}
    </span>
  );
};

export default ScriptNumber;
