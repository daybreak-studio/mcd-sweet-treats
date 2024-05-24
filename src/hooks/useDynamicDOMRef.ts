import { useCallback, useState } from "react";

/**
 * This hook triggers re-render when the reference of the target ref changes.
 * @returns
 */
export function useDynamicDOMRef<T extends HTMLElement>(): [
  (node: T) => void,
  T | undefined,
] {
  const [elm, setElm] = useState<T | undefined>(undefined);
  const ref = useCallback((node: T) => {
    setElm(node);
  }, []);

  return [ref, elm];
}
