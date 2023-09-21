import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Menu from "../SideMenu/SideMenu";
import wordIcon from "../../resources/word.png";
import { Vacation } from "../../Types/Vacation";
import { RootState } from "../../Types/RootState";
const MainWrapper = styled.div`
  display: flex;
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const DocumentDownloadContainer = styled.div`
  width: 200px;
  height: 50px;
  border-top: 10px solid #0000;
  margin-bottom: 150px;
`;
const DocumentDownload = styled.div`
  width: 180px;
  height: 50px;
  display: flex;
  cursor: pointer;
`;
const WordIcon = styled.div`
  background-image: url(${wordIcon});
  color: white;
  height: 34px;
  width: 34px;
  margin: 5px 20px;
  background-color: white;
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
  font-weight: bold;
`;

const WrapperContainer = styled.div`
  margin: 100px;
  padding: 10px;
  border-top: 1px solid black;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;
const VacationDetails = styled.div`
  display: flex;
`;
const AdditionalDetails = styled.div`
  display: flex;
  flex-direction: column;
`;
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 50px;
`;

const CommentTitle = styled.div`
  font-size: 15px;
`;

const CommentContainer = styled.div`
  width: 200px;
  height: 90px;
  margin: 100px 0px;
`;
const CommentArea = styled.textarea`
  width: 100%;
  height: 100%;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  border: none;
  background-color: #fbf6ed;
  padding: 4px;
  resize: none;
  width: 90%;
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
        const response = await axios.get(
          `http://localhost:8080/vacations/${paramValue}`
        );
        const data: Vacation = response.data; 
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
          vacationId: vacationData.id,
        };

        const response = await fetch(downloadUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
    const sendTask = async () => {
      try {
        if (vacationData) {
          const taskData = {
            taskStatus: vacationData.taskStatus,
            userType: userType,
          };
          console.log(taskData);
          const response = await axios.post(
            `http://localhost:8080/tasksToDo`,
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
      if (taskEnum === "ZAAKCEPTUJ") {
        return (
          <TaskButton
            color="#dcc024d1"
            key={taskEnum}
            onClick={() => employerHandleButton(taskEnum)}
          >
            {taskEnum}
          </TaskButton>
        );
      }
      if (taskEnum === "ODRZUC") {
        return (
          <TaskButton
            color="#f3201dd7"
            key={taskEnum}
            onClick={() => employerHandleButton(taskEnum)}
          >
            {"ODRZUĆ"}
          </TaskButton>
        );
      }
      if (taskEnum === "ZWROC") {
        return (
          <TaskButton
            color="#cf19bdd6"
            key={taskEnum}
            onClick={() => employerHandleButton(taskEnum)}
          >
            {"ZWRÓĆ"}
          </TaskButton>
        );
      }
      if (taskEnum === "DODAJ") {
        return (
          <TaskButton
            color="#e06228d5"
            key={taskEnum}
            onClick={() => employerHandleButton(taskEnum)}
          >
            {taskEnum}
          </TaskButton>
        );
      }
      if (taskEnum === "DO_REALIZACJI") {
        return (
          <TaskButton
            color="#4de028d4"
            key={taskEnum}
            onClick={() => employerHandleButton(taskEnum)}
          >
            {"DO REALIZACJI"}
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
          <WrapperContainer>
            <VacationDetails>
              <DetailsContainer>
                <h2>Szczegóły urlopu</h2>
                <Text>Pracownik: {vacationData.employerName}</Text>
                <Text>Ilość dni: {vacationData.daysNum}</Text>
                <Text>Data rozpoczęcia:</Text>
                <DateInput
                  type="date"
                  value={vacationData.startDate}
                  readOnly
                />
                <Text>Data zakończenia:</Text>
                <DateInput type="date" value={vacationData.endDate} readOnly />
                <Text>Opis:</Text>
                <TextArea
                  rows={4}
                  value={vacationData.description}
                  readOnly
                />
              </DetailsContainer>
              <DetailsContainer>
                <CommentContainer>
                  <CommentTitle>Komentarz:</CommentTitle>
                  <CommentArea readOnly={userType !== "PRACODAWCA" && userType !== "TESTER"}></CommentArea>
                </CommentContainer>
                <DocumentDownloadContainer>
                  {documentExistence === "exist" && (
                    <DocumentDownload onClick={downloadDocument}>
                      <WordIcon></WordIcon>
                      Pobierz wniosek
                    </DocumentDownload>
                  )}
                </DocumentDownloadContainer>
              </DetailsContainer>
            </VacationDetails>

            <p></p>

            <ButtonContainer>{renderTaskButtons()}</ButtonContainer>
            <ButtonsContainer></ButtonsContainer>
          </WrapperContainer>
        ) : (
          <p>Brak dokumentu...</p>
        )}
      </PreviewWrapper>
    </MainWrapper>
  );
};

export default VacationPreview;
