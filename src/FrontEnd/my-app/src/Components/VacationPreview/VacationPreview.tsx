import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Menu from "../SideMenu/SideMenu";
import wordIcon from "../../resources/word.png";
import { Vacation } from "../../Types/Vacations/Vacation";
import { RootState } from "../../Types/Vacations/RootState";
import { FiEdit3 } from "react-icons/fi";
import HeaderTop from "../Header/HeaderTop";
import { OverlayVisibleContext } from "../Context/OverlayVisibleContext";
import Overlay from "../Overlay/Overlay";
import { downloadDocument } from "../../Utils/downloadDocument";
import useSendTask from "../../Hooks/VacationPreview/useSendTask";
import useCheckDocumentExistence from "../../Hooks/VacationPreview/useCheckDocumentExistence";
import useFetchUserList from "../../Hooks/Messages/useFetchUserList";
import useFetchVacationData from "../../Hooks/VacationPreview/useFetchVacationData";

interface Overlay {
  overlayVisible: boolean;
  modalVisible: boolean;
  hamburgerVisible: boolean;
}



const VacationPreview: React.FC = () => {
 
  const { paramValue } = useParams<{ paramValue: string }>();
  const userId = useSelector((state: RootState) => state.authorization.user.id);
  const userName = useSelector(
    (state: RootState) => state.authorization.user.name
  );
  const [, setIsMenuOpen] = useState(false);
  const { overlayVisible } = useContext(OverlayVisibleContext);
  const { modalVisible } = useContext(OverlayVisibleContext);
  const { hamburgerVisible } = useContext(OverlayVisibleContext);
  const [errorMessage, setErrorMessage] = useState("");




  const userType = useSelector(
    (state: RootState) => state.authorization.user.employerType
  );

  const {vacationData} = useFetchVacationData(paramValue)
   const taskEnums = useSendTask(vacationData, userType)
  const documentExistence = useCheckDocumentExistence(userId, vacationData);



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

  const handleDownloadClick = () => {
    if(vacationData)
    {
      downloadDocument(vacationData, userId);
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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <MainWrapper>
      <Overlay
        overlayVisible={overlayVisible}
        modalVisible={modalVisible}
        hamburgerVisible={hamburgerVisible}
        onClose={closeMenu}
        errorMessage={errorMessage}
      />

      <Menu></Menu>
      <PreviewWrapper>
        <HeaderTop
          userName={userName}
          headerText="Szczegółowy podgląd urlopu"
        />
        <Header>
          {" "}
          <HeaderTitle>Informacje o urlopie</HeaderTitle>
        </Header>

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
                <TextArea rows={4} value={vacationData.description} readOnly />
              </DetailsContainer>
              <AdditionalDetailsContainer>
                <CommentContainer>
                  <CommentTitle>Komentarz:</CommentTitle>
                  <CommentContainerArea>
                    <CommentIcon/>
                    <CommentArea
                      readOnly={
                        userType !== "PRACODAWCA" && userType !== "TESTER"
                      }
                    ></CommentArea>
                  </CommentContainerArea>
                </CommentContainer>
                <DocumentDownloadContainer>
                  <DownloadTitle>Dokumenty:</DownloadTitle>
                  {documentExistence === "exist" && (
                    <DocumentDownload onClick={() => handleDownloadClick ()}>
                    <WordIcon></WordIcon>
                    Pobierz wniosek
                  </DocumentDownload>
                  
                  )}
                </DocumentDownloadContainer>
              </AdditionalDetailsContainer>
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


const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 15px;
  background-color: #eceaea;
`;
const DocumentDownloadContainer = styled.div`
  width: 200px;
  height: 50px;
  border-top: 10px solid #0000;

  color: #928d8d;
  @media (max-width: 800px) {
    margin-bottom: 10px;
  }
`;
const DocumentDownload = styled.div`
  width: 180px;
  height: 50px;
  margin-top: 10px;
  display: flex;
  cursor: pointer;
`;
const WordIcon = styled.div`
  background-image: url(${wordIcon});
  color: white;
  height: 32px;
  width: 34px;
  margin: 5px 20px;
  background-color: white;
`;
const ButtonContainer = styled.div`
  display: flex;

  justify-content: start;
  gap: 10px;
  margin-top: 20px;
  @media (max-width: 800px) {
    justify-content: center;
  }
`;

const TaskButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ color }) => color};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  @media (max-width: 400px) {
    margin-bottom: 10px;
    padding: 4px 8px;
    font-size: 12px;
  }
`;

const WrapperContainer = styled.div`
  margin: 100px;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  @media (max-width: 800px) {
    margin: 5px;
    margin-top: 100px;
  }
  background-color: white;
  -webkit-box-shadow: 0px 2px 17px -7px rgba(66, 68, 90, 1);
-moz-box-shadow: 0px 2px 17px -7px rgba(66, 68, 90, 1);
box-shadow: 0px 2px 17px -7px rgba(66, 68, 90, 1);
`;
const VacationDetails = styled.div`
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column;
  }
  background-color: white;
  
`;
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 50px;
`;
const AdditionalDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-content: center;
  padding: 0px 50px;
  margin-top: 100px;
  @media (max-width: 800px) {
    margin: 5px;
    margin-top: 10px;
  }
`;

const CommentTitle = styled.div`
  font-size: 15px;
  border-bottom: 1px solid #928d8d;
`;
const DownloadTitle = styled.div`
  font-size: 15px;
`;
const CommentContainer = styled.div`
  width: 200px;
  height: 90px;
  margin: 10px 0px;
  color: #928d8d;
`;
const CommentContainerArea = styled.div`
  display: flex;
  width: 300px;
`;
const CommentIcon = styled(FiEdit3)`
  width: 45px;
  height: 45px;
  margin: 5px;
  color: white;
  padding: 10px;
  background-color: #3fe43f;
`;
const CommentArea = styled.textarea`
  width: 200px;
  height: 40px;
  margin-top: 10px;
  resize: vertical;
  border: 1px solid #928d8d;
  @media (max-width: 400px) {
    width: 120px;
    height: 50px;
  }
`;
const Header = styled.div`
  width: 100%;
  height: 70px;
  background-color: rgb(201, 194, 194);
`;
const HeaderTitle = styled.h1`
  margin: 10px;
  color: #696666;
  
`;


const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Text = styled.p`
  font-size: 16px;
  @media (max-width: 400px) {
    font-size: 12px;
  }
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
  @media (max-width: 400px) {
    margin-bottom: 10px;
    padding: 4px 8px;
    font-size: 12px;
  }
`;