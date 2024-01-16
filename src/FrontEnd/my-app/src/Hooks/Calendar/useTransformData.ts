import { useEffect, Dispatch, SetStateAction } from "react";
import { Vacation } from "../../Types/Vacations/Vacation";
import { TransformedData } from "../../Types/Calendar/TransformedData";

const useTransformedVacation = (
  currentYear: number,
  currentMonth: number,
  setVacationDays: Dispatch<SetStateAction<TransformedData[]>>
) => {
  useEffect(() => {
    const transformData = (data: Vacation[]) => {
      const transformedData: TransformedData[] = [];
      data.forEach((item) => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);
        const daysDiff = Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        for (let i = 0; i <= daysDiff; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);
          const dayNumber = currentDate.getDate();
          const monthNumber = currentDate.getMonth();
          let entry = transformedData.find(
            (entry) =>
              entry.dayNumber === dayNumber && entry.monthNumber === monthNumber
          );
          if (!entry) {
            entry = { dayNumber, monthNumber, employeesList: [] };
            transformedData.push(entry);
          }

          entry.employeesList.push(item.employerName);
        }
      });
      setVacationDays(transformedData);
    };

    const date = new Date(
      Date.parse(
        `1 ${new Date(currentYear, currentMonth).toLocaleString("default", {
          month: "long",
        })} 2000`
      )
    );

    const calculatedMonthNumber = date.getMonth() + 1;

    fetch(
      `http://localhost:8080/vacations/calendarVacations/${calculatedMonthNumber}`
    )
      .then((response) => response.json())
      .then((data: Vacation[]) => {
        transformData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [currentYear, currentMonth, setVacationDays]);
};

export default useTransformedVacation;
