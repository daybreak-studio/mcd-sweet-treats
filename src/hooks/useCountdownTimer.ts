import { useEffect, useRef, useState } from "react";

export function useCountdownTimer(duration: number, countdownInterval = 1000) {
  const [remainingTime, setRemainingTime] = useState(duration);
  const [hasFinished, setHasFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // to prevent memory leaking
  useEffect(() => {
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    setHasFinished(false);
    setRemainingTime(duration);

    let beginTime = Date.now();

    timerRef.current = setInterval(() => {
      setRemainingTime(() => {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - beginTime) / 1000;

        if (elapsedTime <= 0) {
          setHasFinished(true);
        }
        return duration - elapsedTime;
      });
    }, countdownInterval);
  };

  const resetTimer = () => {
    setHasFinished(false);
    setRemainingTime(duration);
    timerRef.current && clearInterval(timerRef.current);
  };

  const finishTimer = () => {
    setHasFinished(true);
    timerRef.current && clearInterval(timerRef.current);
  };

  return {
    startTimer,
    resetTimer,
    finishTimer,
    remainingTime,
    hasFinished,
  };
}
