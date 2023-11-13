import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Menu from "../../Components/SideMenu/SideMenu";
import Overlay from "../../Components/Overlay/Overlay";
import HeaderTop from "../../Components/Header/HeaderTop";
import { useSelector } from "react-redux";
import { RootState } from "../../Types/RootState";
interface EventDescriptionMap {
  [date: string]: string;
}

interface CalendarDay {
  day: number;
  month: number;
}

interface Overlay {
  overlayVisible: boolean;
  modalVisible: boolean;
  hamburgerVisible: boolean;
}

interface CalendarStatusColor {
  backgroundColor: string;
}

interface VacationDescriptionI {
  selectedOption: string;
}

interface DateElementProps {
  backgroundColor: "green" | "yellow" | "red" | "transparent";
}

interface ElementInformationDisplay {
  display: "block" | "none";
}

interface VacationData {
  id: number;
  startDate: string;
  endDate: string;
  employerName: string;
}

interface TransformedData {
  dayNumber: number;
  monthNumber: number;
  employeesList: string[];
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 800px) {
    font-size: 12px;
  }
  @media (max-width: 525px) {
    font-size: 10px;
  }
  @media (max-width: 460px) {
    font-size: 8px;
  }
  @media (max-width: 350px) {
    font-size: 7px;
  }
  @media (max-width: 310px) {
    font-size: 6px;
  }
`;
const Header = styled.div`
  width: 100%;
  height: 70px;
  background-color: rgb(248, 244, 244);
`;

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: sans-serif;
  color: #646262;
`;
const HeaderTitle = styled.h1`
  margin: 10px;
  color: #696666;
`;

const CalendarContainer = styled.div`
  width: 90%;
  margin-top: 80px 0px;
  border-radius: 5px;
  padding: 0px;
`;

const CalendarHelperContainer = styled.div`
  width: 90%;
  padding: 0px;
  display: flex;
  justify-content: space-between;
`;
const CalendarLegendContainer = styled.div`
  width: 90%;
  padding: 0px;
  display: flex;
  flex-direction: column;
`;

const StatusContainer = styled.div`
  display: flex;
  max-width: 320px;
  margin: 10px 0px;
`;

const StatusColor = styled.div<CalendarStatusColor>`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 15px;
  margin: 0px 10px;
`;

const StatusInformation = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const PrevButton = styled.button`
  font-size: 12px;
  border: none;
  margin: 5.5px;
  padding: 5px 7px;
  cursor: pointer;
  background-color: orange;
  font-weight: bold;
  color: white;
`;

const MonthYear = styled.h1`
  font-size: 24px;
`;

const NextButton = styled.button`
  font-size: 12px;
  border: none;
  margin: 5.5px;
  padding: 5px 7px;
  cursor: pointer;
  background-color: orange;
  font-weight: bold;
  color: white;
`;

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 0px;
  background-color: #ffa600b0;
  color: white;
`;

const Day = styled.div`
  padding: 5px;
  text-align: center;
  font-weight: bold;
  max-width: 200px;
`;

const Dates = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 100px 100px 100px 100px 100px;
`;
const DateElement = styled.div<DateElementProps>`
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: bold;
  color: #00000094;
  border-radius: 15px;
  background-color: ${(props) => props.backgroundColor};
`;
const DateElementInformation = styled.div<ElementInformationDisplay>`
  position: absolute;
  width: 100%;
  height: 100px;
  background-color: #00000092;
  color: white;
  border-radius: 15px;
  display: none;
  padding: 15px;
  box-sizing: border-box;
  ${DateElement}:hover & {
    display: ${(props) => props.display};
  }
`;
const DateInformationValue = styled.p`
  width: 100%;
  font-size: 10px;
  margin: 0px 5px;
  font-weight: bold;
`;

const EventModal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transform: scale(1.1);
  transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
`;

const EventModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1rem 1.5rem;
  width: 24rem;
  border-radius: 0.5rem;
`;

const CloseButton = styled.span`
  float: right;
  width: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  cursor: pointer;
  border-radius: 0.25rem;
  background-color: lightgray;
`;

const EventDate = styled.h2`
  font-size: 24px;
`;

const EventDescription = styled.textarea`
  width: 100%;
`;

const SaveEventButton = styled.button`
  font-size: 22px;
`;

const Calendar: React.FC = () => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(
    currentDate.getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    currentDate.getFullYear()
  );

  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventModalVisible, setEventModalVisible] = useState<boolean>(false);
  const [eventModalDate, setEventModalDate] = useState<Date | null>(null);
  const [eventDescription, setEventDescription] = useState<string>("");
  const [monthNumber, setMonthNumber] = useState<Number>();
  const [vacationDays, setVacationDays] = useState<TransformedData[]>([]);
  const [calendar, setCalendar] = useState<CalendarDay[]>([]);
  const [currentEmployees, setCurrentEmployees] = useState<String[]>([]);

  const [dateElementBackgroundColors, setDateElementBackgroundColors] =
    useState<Array<"red" | "yellow" | "green" | "transparent">>([]);

  const userName = useSelector(
    (state: RootState) => state.authorization.user.name
  );

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
    console.log("MOJ KALENDARZ: ", calendar);
  };

  const openEventModal = (year: number, month: number, day: number) => {
    setEventModalDate(new Date(year, month, day));
    setEventDescription(getEventDescription(new Date(year, month, day)) || "");
    setEventModalVisible(true);
  };

  const closeEventModal = () => {
    setEventModalDate(null);
    setEventDescription("");
    setEventModalVisible(false);
  };

  const saveEvent = () => {
    if (eventModalDate) {
      const key = eventModalDate.toDateString();
      const eventDescriptions: EventDescriptionMap = JSON.parse(
        localStorage.getItem("eventDescriptions") || "{}"
      );
      eventDescriptions[key] = eventDescription;
      localStorage.setItem(
        "eventDescriptions",
        JSON.stringify(eventDescriptions)
      );
      closeEventModal();
    }
  };

  const getPolishMonthName = (englishMonthName: string): string => {
    const monthNames: { [key: string]: string } = {
      January: "Styczeń",
      February: "Luty",
      March: "Marzec",
      April: "Kwiecień",
      May: "Maj",
      June: "Czerwiec",
      July: "Lipiec",
      August: "Sierpień",
      September: "Wrzesień",
      October: "Październik",
      November: "Listopad",
      December: "Grudzień",
    };

    const date = new Date(Date.parse(`1 ${englishMonthName} 2000`));
    const monthNumber = date.getMonth() + 1;

    return monthNames[englishMonthName] || englishMonthName;
  };

  const getEventDescription = (date: Date): string | undefined => {
    const key = date.toDateString();
    const eventDescriptions: EventDescriptionMap = JSON.parse(
      localStorage.getItem("eventDescriptions") || "{}"
    );
    return eventDescriptions[key];
  };

  const changeMonth = (amount: number) => {
    const newDate = new Date(currentYear, currentMonth + amount, 1);

    setCurrentYear(newDate.getFullYear());
    setCurrentMonth(newDate.getMonth());
  };

  const handlePrevMonthClick = () => {
    changeMonth(-1);
  };

  const handleNextMonthClick = () => {
    changeMonth(1);
  };

  useEffect(() => {
    generateCalendar(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  const transformData = (
    data: VacationData[],
    setVacationDays: React.Dispatch<React.SetStateAction<TransformedData[]>>
  ) => {
    const transformedData: TransformedData[] = [];
    console.log(data);
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
          (entry) => entry.dayNumber === dayNumber && entry.monthNumber === monthNumber
        );
        if (!entry) {
          entry = { dayNumber, monthNumber, employeesList: [] };
          transformedData.push(entry);
        }
  
        entry.employeesList.push(item.employerName);
      }
    });
    setVacationDays(transformedData);
    console.log(vacationDays, "MOJE NOWE WAKACJE KURW")
  };

  useEffect(() => {
    const date = new Date(
      Date.parse(
        `1 ${new Date(currentYear, currentMonth).toLocaleString("default", {
          month: "long",
        })} 2000`
      )
    );
  
    const calculatedMonthNumber = date.getMonth() + 1;
    setMonthNumber(calculatedMonthNumber);
    alert(calculatedMonthNumber);
    fetch(
      `http://localhost:8080/vacations/calendarVacations/${calculatedMonthNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        transformData(data, setVacationDays);
        console.log("MOJE POBRANE WAKACJE", vacationDays)
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const stateVacationNumber = (day: number, month: number) => {
    console.log(month)
    let backgroundColor:
      | "#f3201d57"
      | "#edf10f4c"
      | "#2dfc0349"
      | "transparent" = "transparent";
    if (vacationDays.length > 0) {
      vacationDays.forEach((currentDay) => {
        if (currentDay.dayNumber === day && currentDay.monthNumber === month) {
          if (currentDay.employeesList.length === 1) {
            backgroundColor = "#2dfc0349";
          } else if (currentDay.employeesList.length === 2) {
            backgroundColor = "#edf10f4c";
          } else if (currentDay.employeesList.length > 2) {
            backgroundColor = "#f3201d57";
          }
        }
      });
    }

    return backgroundColor;
  };

  const stateElementInformation = (day: number, month: number) => {
    let display: "block" | "none" = "none";
    vacationDays.forEach((currentDay) => {
      if (currentDay.dayNumber === day && currentDay.monthNumber === month) {
        display = "block";
        return display;
      }
    });

    return display;
  };
  
  const showVacationEmployees = (day: number, month: number) => {
    const foundDay = vacationDays.find(
      (currentDay) => currentDay.dayNumber === day && currentDay.monthNumber === month
    );
  
    if (foundDay) {
      console.log("udało sie");
      const employees = foundDay.employeesList;
  
      return (
        <div>
          {employees.map((employee, index) => (
            <DateInformationValue key={index}>{employee}</DateInformationValue>
          ))}
        </div>
      );
    } else {
      console.log("nie udało sie");
      return <div></div>;
    }
  };

  const fetchCurrentEmployees = (day: number) => {
    vacationDays.forEach((currentDay) => {
      if (currentDay.dayNumber === day) {
        console.log(currentDay.dayNumber, day);
        setCurrentEmployees(currentDay.employeesList);
        setIsHovered(false);
      }
    });
  };

  return (
    <MainWrapper>
      <Menu />
      <FormWrapper>
        <HeaderTop userName={userName} headerText="Generator urlopów" />
        <Header>
          <HeaderTitle>Nowy urlop</HeaderTitle>
        </Header>
        <CalendarContainer>
          <CalendarHeader>
            <PrevButton id="prevBtn" onClick={handlePrevMonthClick}>
              Poprzedni
            </PrevButton>
            <MonthYear id="monthYear">
              {getPolishMonthName(
                new Date(currentYear, currentMonth).toLocaleString("default", {
                  month: "long",
                })
              ) +
                " " +
                currentYear}
            </MonthYear>
            <NextButton id="nextBtn" onClick={handleNextMonthClick}>
              Następny
            </NextButton>
          </CalendarHeader>
          <DaysContainer>
            <Day>Poniedziałek</Day>
            <Day>Wtorek</Day>
            <Day>Środa</Day>
            <Day>Czwartek</Day>
            <Day>Piątek</Day>
            <Day>Sobota</Day>
            <Day>Niedziela</Day>
          </DaysContainer>

          <Dates>
            {calendar.map((calendarDay, index) => (
              <DateElement
                key={index}
                backgroundColor={stateVacationNumber(calendarDay?.day, calendarDay.month)}
                onMouseEnter={() => fetchCurrentEmployees(calendarDay?.day)}
                onMouseLeave={() => setIsHovered(true)}
              >
                {calendarDay?.day !== 0 ? calendarDay.day : null}
                <DateElementInformation
                  display={stateElementInformation(calendarDay?.day, calendarDay.month)}
                >{showVacationEmployees(calendarDay?.day, calendarDay.month)}
                </DateElementInformation>
              </DateElement>
            ))}
          </Dates>

          {eventModalVisible && (
            <EventModal>
              <EventModalContent>
                <CloseButton className="close" onClick={closeEventModal}>
                  &times;
                </CloseButton>
                <EventDate id="eventDate">
                  {eventModalDate?.toDateString()}
                </EventDate>
                <EventDescription
                  className="area"
                  id="eventDescription"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.currentTarget.value)}
                />
                <SaveEventButton id="saveEventBtn" onClick={saveEvent}>
                  Save
                </SaveEventButton>
              </EventModalContent>
            </EventModal>
          )}
        </CalendarContainer>

        <CalendarHelperContainer>
          <CalendarLegendContainer>
            <h1>FAQ</h1>
            <StatusContainer>
              <StatusColor backgroundColor={"#2dfc0367"} />
              <StatusInformation>Jedna osoba ma urlop</StatusInformation>
            </StatusContainer>
            <StatusContainer>
              <StatusColor backgroundColor={"#eef10fa3"} />
              <StatusInformation>Dwie osoby mają urlop</StatusInformation>
            </StatusContainer>
            <StatusContainer>
              <StatusColor backgroundColor={"#f3211d93"} />
              <StatusInformation>
                Wiecej niż dwie osoby mają urlop
              </StatusInformation>
            </StatusContainer>
          </CalendarLegendContainer>
        </CalendarHelperContainer>
      </FormWrapper>
    </MainWrapper>
  );
};

export default Calendar;
