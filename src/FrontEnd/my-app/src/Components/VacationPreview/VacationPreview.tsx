import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";

interface Vacation {
  id: number;
  description: string;
  employerName: string;
  daysNum: number;
  personId: number;
  taskStatus: string
}
interface UserState {
  id: number;
  name: string;
  email: string;
  employerType: string;
}

interface AuthorizationState {
  user: UserState;
}

interface RootState {
  authorization: AuthorizationState;
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
  const userType = useSelector((state: RootState) => state.authorization.user.employerType);
  
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
    console.log(vacationData, "sssssssssssssssss");
    console.log(vacationData?.taskStatus, "asdasdasdasdas")
    
    const sendTask = async () => {
      try {
        if (vacationData) {
          const taskData = {
            taskStatus: vacationData.taskStatus,
            userType: userType,
          };
          console.log(taskData)
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
            console.log(response.data.taskEnums)
            setTaskEnums(response.data.taskEnums);
          } else {
            console.error("Failed to send task.");
          }
        }
      } catch (error) {
        console.error("Error sending task:", error);
      }
    };
  
    sendTask();
  }, [vacationData, userType]);

  const handleTaskButtonClick = (action: string) => {};

  
  
const employerHandleButton = async (taskEnum: string) => {
    try {
      let updatedVacationData
      if(taskEnum === "ZAAKCEPTUJ")
      {
        updatedVacationData = { ...vacationData, taskStatus: "Zrealizowano" };
      }else if(taskEnum === "ZWROC")
      {
        updatedVacationData = { ...vacationData, taskStatus: "Zwrócone" };
      }
      else if(taskEnum === "ODRZUC")
      {
        updatedVacationData = { ...vacationData, taskStatus: "Odrzucono" };
      }
      
  
      const documentData = {
        description: updatedVacationData?.description,
        employerName: updatedVacationData?.employerName,
        daysNum: updatedVacationData?.daysNum,
        taskStatus: updatedVacationData?.taskStatus,
        vacationId: updatedVacationData?.id,
        personId: updatedVacationData?.personId,
      };
  
      const documentResponse = await axios.post(
        `http://localhost:8080/document/word`,
        documentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (documentResponse.status === 200) {
        console.log("Document data sent successfully.");
      } else {
        console.error("Failed to send document data.");
      }
      const response = await axios.put(
        `http://localhost:8080/vacations/${updatedVacationData?.id}`,
        updatedVacationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 204) {
        console.log("Vacation data updated successfully.");
      } else {
        console.error("Failed to update vacation data.");
      }
    } catch (error) {
      console.error("Error handling vacation:", error);
    }
  };

  const renderTaskButtons = () => {
    return taskEnums.map((taskEnum) => {
   
        return (
          <TaskButton
            key={taskEnum}
            onClick={() => employerHandleButton(taskEnum)}
          >
            {taskEnum}
          </TaskButton>
        );
      
    });
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
