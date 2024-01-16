import { useState } from 'react';

const useMonthChange = () => {
    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState<number>(
      currentDate.getMonth()
    );
    const [currentYear, setCurrentYear] = useState<number>(
      currentDate.getFullYear()
    );

  const changeMonth = (amount: number) => {
    const newDate = new Date(currentYear, currentMonth + amount, 1);

    setCurrentYear(newDate.getFullYear());
    setCurrentMonth(newDate.getMonth());
  };

  return {
    currentYear,
    currentMonth,
    changeMonth,
  };
};

export default useMonthChange;