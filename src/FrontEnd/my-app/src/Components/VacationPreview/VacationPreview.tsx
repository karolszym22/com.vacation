import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

interface Vacation {
  description: string;
  employerName: string;
  daysNum: number;
}

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const TaskButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const VacationDetails = styled.div`
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
`;

const VacationPreview: React.FC = () => {
  const { paramValue } = useParams<{ paramValue: string }>();
  const [vacationData, setVacationData] = useState<Vacation | null>(null);
  const [taskEnums, setTaskEnums] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/vacations/${paramValue}`
        );
        const data: Vacation = await response.json();
        setVacationData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [paramValue]);

  useEffect(() => {
    console.log("Sending task...");

    const sendTask = async () => {
      try {
        const taskData = {
          taskStatus: `Pracodawca:Zaakceptowane`,
          userType: "HR",
        };

        const response = await axios.post(
          `http://localhost:8080/tasks/tasksToDo`,
          taskData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log("Task sent successfully:", response.data.taskEnums);
          setTaskEnums(response.data.taskEnums);
        } else {
          console.error("Failed to send task.");
        }
      } catch (error) {
        console.error("Error sending task:", error);
      }
    };

    sendTask();
  }, []);

  const handleTaskButtonClick = (action: string) => {};

  const renderTaskButtons = () => {
    return taskEnums.map((taskEnum) => (
      <TaskButton
        key={taskEnum}
        onClick={() => handleTaskButtonClick(taskEnum)}
      >
        {taskEnum}
      </TaskButton>
    ));
  };

  return (
    <div>
      {vacationData ? (
        <VacationDetails>
          <h2>Vacation Details</h2>
          <p>Description: {vacationData.description}</p>
          <p>Employer: {vacationData.employerName}</p>
          <p>Days: {vacationData.daysNum}</p>
        </VacationDetails>
      ) : (
        <p>Loading...</p>
      )}

      <ButtonContainer>{renderTaskButtons()}</ButtonContainer>
    </div>
  );
};

export default VacationPreview;
