import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Types/Vacations/RootState";
import { CalendarDay } from "../../Types/Calendar/CalendarDay";
import { Vacation } from "../../Types/Vacations/Vacation";
import { TransformedData } from "../../Types/TransformedData";


const useCalendarData = () => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(
    currentDate.getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    currentDate.getFullYear()
  );
  const [vacationDays, setVacationDays] = useState<TransformedData[]>([]);
  const [calendar, setCalendar] = useState<CalendarDay[]>([]);
  const [currentEmployees, setCurrentEmployees] = useState<String[]>([]);
  const [, setMonthNumber] = useState<Number>();
  const userName = useSelector(
    (state: RootState) => state.authorization.user.name
  );

  const dispatch = useDispatch();

  const generateCalendar = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendar: CalendarDay[] = [];

    for (let i = 0; i < firstDay; i++) {
      calendar.push({ day: 0, month });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push({ day, month });
    }
    setCalendar(calendar);
  };

  const changeMonth = (amount: number) => {
    const newDate = new Date(currentYear, currentMonth + amount, 1);

    setCurrentYear(newDate.getFullYear());
    setCurrentMonth(newDate.getMonth());
  };
  const transformData = (
    data: Vacation[],
    setVacationDays: React.Dispatch<React.SetStateAction<TransformedData[]>>
  ) => {
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

  const fetchCalendarData = () => {
    const date = new Date(
      Date.parse(
        `1 ${new Date(currentYear, currentMonth).toLocaleString("default", {
          month: "long",
        })} 2000`
      )
    );

    const calculatedMonthNumber = date.getMonth() + 1;
    setMonthNumber(calculatedMonthNumber);

    fetch(
      `http://localhost:8080/vacations/calendarVacations/${calculatedMonthNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        transformData(data, setVacationDays);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    generateCalendar(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  useEffect(() => {
    fetchCalendarData();
  }, []);

  return {
    currentMonth,
    currentYear,
    calendar,
    vacationDays,
    currentEmployees,
    userName,
    handlePrevMonthClick: () => changeMonth(-1),
    handleNextMonthClick: () => changeMonth(1),
  };
};

export default useCalendarData;
