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
interface Overlay {
  overlayVisible: boolean;
  modalVisible: boolean;
  hamburgerVisible: boolean;
}

interface VacationDescriptionI {
  selectedOption: string;
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
  max-height: auto;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0px;
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
  font-weight: bold;
`;

const Dates = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 100px 100px 100px 100px 100px 100px;
`;
const DateElement = styled.div`
 padding: 60px;
  cursor: pointer;
    border-left: 1px solid #ccc;
  border-right: 1px solid #ccc; 
  border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
      display: flex; 
  align-items: flex-start; 
  justify-content: flex-start; 
    position: relative; 
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventModalVisible, setEventModalVisible] = useState<boolean>(false);
  const [eventModalDate, setEventModalDate] = useState<Date | null>(null);
  const [eventDescription, setEventDescription] = useState<string>("");

  const userName = useSelector(
    (state: RootState) => state.authorization.user.name
  );

  const generateCalendar = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendar: number[] = [];

    for (let i = 0; i < firstDay; i++) {
      calendar.push(0);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(day);
    }

    return calendar;
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

  const getEventDescription = (date: Date): string | undefined => {
    const key = date.toDateString();
    const eventDescriptions: EventDescriptionMap = JSON.parse(
      localStorage.getItem("eventDescriptions") || "{}"
    );
    return eventDescriptions[key];
  };

  useEffect(() => {
    generateCalendar(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

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
            <PrevButton id="prevBtn">Poprzedni</PrevButton>
            <MonthYear id="monthYear">
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
              }) +
                " " +
                currentYear}
            </MonthYear>
            <NextButton id="nextBtn">Następny</NextButton>
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
            <Dates>
              {generateCalendar(currentMonth, currentYear).map((day, index) => (
                <DateElement
                  key={index}
                  onClick={() => {
                    if (day !== 0) {
                      openEventModal(currentYear, currentMonth, day);
                    }
                  }}
                >
                  {day !== 0 ? day : null}
                </DateElement>
              ))}
            </Dates>
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
      </FormWrapper>
    </MainWrapper>
  );
};

export default Calendar;
