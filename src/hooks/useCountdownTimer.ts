import { useRef, useState } from "react";

export function useCountdownTimer(duration: number) {
  const [elapsedTime, setElapsedTime] = useState(duration);
  const [hasFinished, setHasFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setHasFinished(false);
    setElapsedTime(duration);

    timerRef.current = setInterval(() => {
      setElapsedTime((prevDuration) => {
        const newDuration = prevDuration - 1;
        if (newDuration <= 0) {
          setHasFinished(true);
        }
        return newDuration;
      });
    }, 1000);
  };

  const resetTimer = () => {
    setHasFinished(false);
    setElapsedTime(duration);
    timerRef.current && clearInterval(timerRef.current);
  };

  const finishTimer = () => {
    setHasFinished(true);
    timerRef.current && clearInterval(timerRef.current);
  };

  return { startTimer, resetTimer, finishTimer, elapsedTime, hasFinished };
}
