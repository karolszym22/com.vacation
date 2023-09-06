import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Menu from "../SideMenu/SideMenu";
interface Vacation {
  id: number;
  description: string;
  employerName: string;
  daysNum: number;
  personId: number;
  taskStatus: string;
  startDate: string;
  endDate: string
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


const MainWrapper = styled.div`
  display: flex;
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
`


const DocumentDownloadContainer = styled.div`
  width: 180px;
  height: 50px;
  border: 1px solid black;
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const TaskButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ color }) => color};
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

const Text = styled.p`
  font-size: 16px; 
`;


const DateInput = styled.input`
  font-size: 16px; 
  border: none;
  background-color: transparent;
  pointer-events: none; 
`;


const TextArea = styled.textarea`
  font-size: 16px; 
  border: 1px solid #ccc; 
  padding: 4px;
  resize: none; 
`;



const VacationPreview: React.FC = () => {
  const { paramValue } = useParams<{ paramValue: string }>();
  const [vacationData, setVacationData] = useState<Vacation | null>(null);
  const [taskEnums, setTaskEnums] = useState<string[]>([]);
  const userId = useSelector((state: RootState) => state.authorization.user.id);
  const [documentExistence, setDocumentExistence] = useState<string>("");
  const userType = useSelector(
    (state: RootState) => state.authorization.user.employerType
  );


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

  const downloadDocument = async () => {
    try {
      if (vacationData) {
        const downloadUrl = `http://localhost:8080/document/word/download`;
  
        const requestData = {
          personId: userId,
          vacationId: vacationData.id
        };
  
        const response = await fetch(downloadUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(requestData), 
        });
  
        if (response.ok) {
          console.log("Document downloaded successfully");
        } else {
          console.error("Error downloading document:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };
  


  useEffect(() => {
    console.log("Sending task...");
    console.log(vacationData, "sssssssssssssssss");
    console.log(vacationData?.taskStatus, "asdasdasdasdas");

    


    const sendTask = async () => {
      try {
        if (vacationData) {
          const taskData = {
            taskStatus: vacationData.taskStatus,
            userType: userType,
          };
          console.log(taskData);
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
            console.log(response.data);
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
  useEffect(() => {
    const checkDocumentExistence = async () => {
      console.log("istnieje1?", userId);
      console.log("istnieje2?", vacationData?.id);
      try {
        const response = await axios.get(
          `http://localhost:8080/document/word/exist?personId=${userId}&vacationId=${vacationData?.id}`
        );

        const data: string = response.data;
        setDocumentExistence(data);
      } catch (error) {
        console.error("Error checking document existence:", error);
      }
    };

    if (vacationData) {
      checkDocumentExistence();
    }
  }, [vacationData]);

  const employerHandleButton = async (taskEnum: string) => {
    try {
      let updatedVacationData;

      if (taskEnum === "DO_REALIZACJI") {
        updatedVacationData = { ...vacationData, taskStatus: "Zrealizowano" };

        const documentData = {
          description: updatedVacationData?.description,
          employerName: updatedVacationData?.employerName,
          daysNum: updatedVacationData?.daysNum,
          taskStatus: updatedVacationData?.taskStatus,
          vacationId: updatedVacationData?.id,
          personId: updatedVacationData?.personId,
          startDate: updatedVacationData?.startDate,
          endDate: updatedVacationData?.endDate,
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
      } else if (taskEnum === "ZWROC") {
        updatedVacationData = { ...vacationData, taskStatus: "Zwrócono" };
      } else if (taskEnum === "ODRZUC") {
        updatedVacationData = { ...vacationData, taskStatus: "Odrzucono" };
      } else if (taskEnum === "ZAAKCEPTUJ") {
        updatedVacationData = { ...vacationData, taskStatus: "Zaakceptowane" };
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
      if(taskEnum === "ZAAKCEPTUJ")
      {
        return (
          <TaskButton
             color="green"
            key={taskEnum}
            onClick={() => employerHandleButton(taskEnum)}
          >
            {taskEnum}
          </TaskButton>
        );
      }
      if(taskEnum === "ODRZUC")
      {
        return (
          <TaskButton
             color="red"
            key={taskEnum}
            onClick={() => employerHandleButton(taskEnum)}
          >
            {taskEnum}
          </TaskButton>
        );
      }
      if(taskEnum === "ZWROC")
      {
        return (
          <TaskButton
             color="purple"
            key={taskEnum}
            onClick={() => employerHandleButton(taskEnum)}
          >
            {taskEnum}
          </TaskButton>
        );
      }
      
    });
  };

  return (
    <MainWrapper>
      <Menu></Menu>
      <PreviewWrapper>
        {vacationData ? (
          <VacationDetails>
            <h2>Szczegóły urlopu</h2>
            <Text>Pracownik: {vacationData.employerName}</Text>
            <Text>Ilość dni zostaw: {vacationData.daysNum}</Text>
            <Text>Data rozpoczęcia:</Text>
            <DateInput type="date" value={vacationData.startDate} readOnly />
            <Text>Data zakończenia:</Text>
            <DateInput type="date" value={vacationData.endDate} readOnly />
            <Text>Opis:</Text>
            <TextArea rows={4} value={vacationData.description} readOnly />
            <p></p>
            {documentExistence === "exist" && (
              <DocumentDownloadContainer onClick={downloadDocument}>
                w realizacji
              </DocumentDownloadContainer>
            )}
          </VacationDetails>
        ) : (
          <p>Loading...</p>
        )}

        <ButtonContainer>{renderTaskButtons()}</ButtonContainer>
      </PreviewWrapper>
    </MainWrapper>
  );
};

export default VacationPreview;
