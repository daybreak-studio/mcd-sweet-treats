import React, {
  ComponentType,
  MutableRefObject,
  SVGProps,
  useRef,
} from "react";
import { useResizeObserver } from "usehooks-ts";

type Props = {
  LineComponent: React.ComponentType<React.SVGProps<HTMLOrSVGElement>>;
  children: React.ReactNode;
};

const HanddrawnLine = ({ LineComponent, children }: Props) => {
  const containerRef = useRef() as MutableRefObject<HTMLElement>;
  return (
    <em ref={containerRef} className="relative inline-block not-italic">
      {children}
      {<LineComponent className="absolute -bottom-1 left-0 right-0" />}
    </em>
  );
};

export default HanddrawnLine;
