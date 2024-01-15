import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { addDays, isSaturday, isSunday } from "date-fns";
import { Vacation } from "../../Types/Vacations/Vacation";
import { AuthorizationState } from "../../Types/User/AuthorizationState";
import { OverlayVisibleContext } from "../../Components/Context/OverlayVisibleContext";

interface RootState {
    authorization: AuthorizationState;
  }



export function useNewVacation() {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [personVacations, setPersonVacations] = useState([]);
  const [description, setDescription] = useState("");
  const [done, setDone] = useState(false);
  const [taskStatus, setTaskStatus] = useState("W realizacji");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [daysNum, setDaysNum] = useState(0);
  const { overlayVisible } = useContext(OverlayVisibleContext);
  const { modalVisible } = useContext(OverlayVisibleContext);
  const { hamburgerVisible } = useContext(OverlayVisibleContext);
  const { setOverlayVisible } = useContext(OverlayVisibleContext);
  const { setModalVisible } = useContext(OverlayVisibleContext);
  const [errorMessage, setErrorMessage] = useState("");

  const userName = useSelector((state: RootState) => state.authorization.user.name);
  const personId = useSelector((state: RootState) => state.authorization.user.id);
  const employerName = useSelector((state: RootState) => state.authorization.user.name);


  useEffect(() => {
    fetch(`http://localhost:8080/vacations/personVacations/${personId}`)
      .then((response) => response.json())
      .then((data) => {
        setPersonVacations(data);
        console.log(personVacations);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const calculateBusinessDays = (start: Date, end: Date) => {
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

  const handleEndDateChange = async (newEndDate: string) => {
    setEndDate(newEndDate);
    console.log("Sending request with data:", {
      personId,
      startDate,
      endDate: newEndDate,
    });

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(newEndDate);
    try {
      const response = await fetch("http://localhost:8080/dateValidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personId,
          startDate: startDateObj,
          endDate: endDateObj,
        }),
      });

      if (!response.ok) {
        const responseData = await response.text();
        throw new Error(
          `Request failed with status: ${response.status}, Response data: ${responseData}`
        );
      }

      const validationResult = await response.text();
      console.log(validationResult);
    } catch (error) {
      console.error("Error validating date:", error);
      setErrorMessage(
        "Tworzony przez Ciebie urlop koliduje z innym urlopem dziejącym się w tym samym okresie"
      );
      setModalVisible(true)
      setOverlayVisible(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!description || !startDate || !endDate) {
      alert("Wypełnij wszystkie pola przed wysłaniem formularza.");
      return;
    }

    const vacationData = {
      description,
      daysNum: calculateBusinessDays(new Date(startDate), new Date(endDate)),
      done,
      personId,
      employerName,
      taskStatus,
      startDate,
      endDate,
    };

    try {
      const response = await fetch("http://localhost:8080/vacations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vacationData),
      });

      const newVacation = await response.json();
      setVacations([...vacations, newVacation]);
      setDescription("");
      setDaysNum(0);
      setStartDate("");
      setEndDate("");
      setDone(false);
    } catch (error) {
      console.error("Error adding vacation:", error);
    }
  };

  

  return {
    vacations,
    personVacations,
    description,
    setDescription,
    done,
    setDone,
    taskStatus,
    setTaskStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    daysNum,
    setDaysNum,
    overlayVisible,
    modalVisible,
    hamburgerVisible,
    errorMessage,
    userName,
    personId,
    employerName,
    calculateBusinessDays,
    handleEndDateChange,
    handleSubmit,
  };
}
