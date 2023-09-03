import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import RootState from "../../Reducers/Store/index";
import {addDays, isSaturday, isSunday } from "date-fns";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  label {
    margin-bottom: 4px;
  }

  input,
  button {
    margin-bottom: 8px;
  }
`;

interface Vacation {
  id: number;
  description: string;
  daysNum: number;
  done: boolean;
}
interface UserState {
  id: number;
  name: string;
  email: string;
}
interface AuthorizationState {
  user: UserState;
}

interface RootState {
  authorization: AuthorizationState;
}

function NewVacation() {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [description, setDescription] = useState("");
  const [done, setDone] = useState<boolean>(false);
  const [taskStatus, setTaskStatus] = useState("Pracownik:Dodane");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [daysNum, setDaysNum] = useState<number>(0);

  const personId = useSelector(
    (state: RootState) => state.authorization.user.id
  );
  const employerName = useSelector(
    (state: RootState) => state.authorization.user.name
  );


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
        startDate: startDateObj, // Użyj daty jako obiektu
        endDate: endDateObj,     // Użyj daty jako obiektu
      }),
    });
  
    if (!response.ok) {
      const responseData = await response.text(); // Pobierz dane z odpowiedzi jako tekst
      throw new Error(`Request failed with status: ${response.status}, Response data: ${responseData}`);
    }
  
    const validationResult = await response.text(); // Pobierz dane z odpowiedzi jako tekst
    console.log(validationResult);
  } catch (error) {
    console.error("Error validating date:", error);
  }
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const vacationData = {
      description,
      daysNum: calculateBusinessDays(new Date(startDate), new Date(endDate)),
      done,
      personId,
      employerName,
      taskStatus,
      startDate,
      endDate
    };

    try {
      const response = await fetch("http://localhost:8080/vacations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vacationData),
      });

      const newVacation: Vacation = await response.json();
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

  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="daysNum">Days:</label>
        <input
          type="number"
          id="daysNum"
          name="daysNum"
          value={daysNum}
          onChange={(e) => setDaysNum(parseInt(e.target.value))}
        />
        <label htmlFor="done">Done:</label>
        <input
          type="checkbox"
          id="done"
          name="done"
          checked={done}
          onChange={(e) => setDone(e.target.checked)}
        />
         <input
        type="date"
        id="startDate"
        name="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <label htmlFor="endDate">End Date:</label>
      <input
        type="date"
        id="endDate"
        name="endDate"
        value={endDate}
        onChange={(e) => handleEndDateChange(e.target.value)}
      />
        <button type="submit">Add Vacation</button>
      </StyledForm>
    </div>
  );
}

export default NewVacation;
