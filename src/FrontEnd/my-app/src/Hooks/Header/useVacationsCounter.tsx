import React, { useEffect, useState } from 'react';

interface VacationCounterProps {
  realizedVacationsCount: number;
  rejectedVacationsCount: number;
  duringVacationCount: number;
}

const useVacationsCounter: React.FC<VacationCounterProps> = ({
  realizedVacationsCount,
  rejectedVacationsCount,
  duringVacationCount,
}) => {
  const [realizedCounter, setRealizedCounter] = useState(0);
  const [rejectedCounter, setRejectedCounter] = useState(0);
  const [duringCounter, setDuringCounter] = useState(0);

  const animateCounter = (target: number, setCounter: React.Dispatch<React.SetStateAction<number>>) => {
    let currentNumber = 0;
    const duration = 1000; 
    //const frameRate = 60;

    const updateCounter = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;

      const progress = Math.min(1, (timestamp - startTimestamp) / duration);

      const value = Math.floor(progress * target);
      currentNumber = value;

      setCounter(currentNumber);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    let startTimestamp: number | null = null;

    const startAnimation = () => {
      startTimestamp = null;
      requestAnimationFrame(updateCounter);
    };

    startAnimation();
  };

  useEffect(() => {
    animateCounter(realizedVacationsCount, setRealizedCounter);
    animateCounter(rejectedVacationsCount, setRejectedCounter);
    animateCounter(duringVacationCount, setDuringCounter);
  }, [realizedVacationsCount, rejectedVacationsCount, duringVacationCount]);

  return (
    <div>
      <div>Realized Vacations: {realizedCounter}</div>
      <div>Rejected Vacations: {rejectedCounter}</div>
      <div>During Vacation: {duringCounter}</div>
    </div>
  );
};

export default useVacationsCounter;