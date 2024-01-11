import { addDays, isSaturday, isSunday } from "date-fns";

export const calculateBusinessDays = (start: Date, end: Date) => {
    let currentDate = new Date(start);
    let businessDays = 0;

    while (currentDate <= end) {
      if (!isSaturday(currentDate) && !isSunday(currentDate)) {
        businessDays++;
      }
      currentDate = addDays(currentDate, 1);
    }

    return businessDays;
  };