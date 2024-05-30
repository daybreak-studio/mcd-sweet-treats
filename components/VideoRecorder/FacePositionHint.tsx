import React from "react";

type Props = {};

const FacePositionHint = (props: Props) => {
  return (
    <div
      style={{
        width: "60%",
      }}
      className="max-auto font-serif-base -mt-[30%] flex aspect-[9/12] max-h-[60%] items-center justify-center rounded-[50%] border-2 border-dashed border-light py-32 text-center text-light"
    >
      <span className="max-w-[16ch]">
        Align your face to the center of this circle and start recording
      </span>
    </div>
  );
};

export default FacePositionHint;
