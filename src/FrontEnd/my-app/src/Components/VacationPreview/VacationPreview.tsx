import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Menu from "../SideMenu/SideMenu";
import wordIcon from "../../resources/word.png";
import { RootState } from "../../Types/Vacations/RootState";
import { FiEdit3 } from "react-icons/fi";
import HeaderTop from "../Header/HeaderTop";
import { OverlayVisibleContext } from "../Context/OverlayVisibleContext";
import Overlay from "../Overlay/Overlay";
import { downloadDocument } from "../../Utils/downloadDocument";
import useSendTask from "../../Hooks/VacationPreview/useSendTask";
import useCheckDocumentExistence from "../../Hooks/VacationPreview/useCheckDocumentExistence";
import useFetchVacationData from "../../Hooks/VacationPreview/useFetchVacationData";
import OverlayWarning from "../OverlayWarning/OverlayWarning";
import { SlArrowRight } from "react-icons/sl";
import { FaCircleDot } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { getInitials } from "../../Utils/getInitials.";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Overlay {
  overlayVisible: boolean;
  modalVisible: boolean;
  hamburgerVisible: boolean;
}

interface VacationStepData {
  title: string;
  steps: string[];
}

const VacationPreview: React.FC = () => {
  const { paramValue } = useParams<{ paramValue: string }>();
  const userId = useSelector((state: RootState) => state.authorization.user.id);
  const userName = useSelector(
    (state: RootState) => state.authorization.user.name
  );
  const userType = useSelector(
    (state: RootState) => state.authorization.user.employerType
  );

  const initialsColor = useSelector(
    (state: RootState) => state.authorization.user.employerInitialsColor
  );
  const navigate = useNavigate();

  const [, setIsMenuOpen] = useState(false);
  const { overlayVisible } = useContext(OverlayVisibleContext);
  const { modalVisible } = useContext(OverlayVisibleContext);
  const { hamburgerVisible } = useContext(OverlayVisibleContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [showOverlayWarning, setShowOverlayWarning] = useState(false);
  const { vacationData } = useFetchVacationData(paramValue);
  const taskEnums = useSendTask(vacationData, userType);
  const documentExistence = useCheckDocumentExistence(userId, vacationData);

  const [currentStep, setCurrentStep] = useState("");

  const steps = [
    "Rozpocznij",
    "Zatwierdź przez Pracodawcę",
    "Zatwierdź przez HR",
    "Zakończ",
  ];
  const renderVacationSteps = (steps: string[], currentStep: string) => {
    return steps.map((step) => (
      <VacationStep key={step}>
        <CustomCircleIcon
          as={step === currentStep ? SlArrowRight : FaCircleDot}
        />
        <StepName style={step === currentStep ? { fontWeight: "bold" } : {}}>
          {step}
        </StepName>
      </VacationStep>
    ));
  };

  const renderInformationsContainer = (data: VacationStepData[]) => {
    return data.map((item, index) => (
      <InformationsContainer key={index}>
        <VacationInformationsTitle>{item.title}</VacationInformationsTitle>
        {vacationData &&
          item.steps &&
          renderVacationSteps(item.steps, vacationData.step)}
      </InformationsContainer>
    ));
  };
  const informationsContainerData = [
    {
      title: "Proces",
      steps: ["Start", "Akcpetacja Pracodawcy", "Akcpetacja HR", "Koniec"],
    },
  ];

  const employerHandleButton = async (
    taskEnum: string,
    currentStep: string
  ) => {
    try {
      let updatedVacationData;

      if (taskEnum === "DO_REALIZACJI") {
        updatedVacationData = {
          ...vacationData,
          taskStatus: "Zrealizowano",
          step: "Koniec",
        };
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
        updatedVacationData = {
          ...vacationData,
          taskStatus: "Zwrócono",
          step: "Koniec",
        };
      } else if (taskEnum === "ODRZUC") {
        updatedVacationData = {
          ...vacationData,
          taskStatus: "Odrzucono",
          step: "Akcpetacja Pracodawcy",
        };
      } else if (taskEnum === "ZAAKCEPTUJ") {
        updatedVacationData = {
          ...vacationData,
          taskStatus: "Zaakceptowane",
          step: "Akcpetacja HR",
        };
      }
      console.log(updatedVacationData);
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
      window.location.reload();
    } catch (error) {
      console.error("Error handling vacation:", error);
    }
  };

  const handleDownloadClick = () => {
    if (vacationData) {
      downloadDocument(vacationData, userId);
    }
  };

  const renderTaskButtons = () => {
    return taskEnums.map((taskEnum) => {
      if (taskEnum === "ZAAKCEPTUJ") {
        const step = "Akcpetacja HR";
        return (
          <TaskButton
            color="#dcc024d1"
            key={taskEnum}
            onClick={() => employerHandleButton(taskEnum, step)}
          >
            {taskEnum}
          </TaskButton>
        );
      }
      if (taskEnum === "ODRZUC") {
        const step = "Koniec";
        return (
          <TaskButton
            color="#f3201dd7"
            key={taskEnum}
            onClick={() => employerHandleButton(taskEnum, step)}
          >
            {"ODRZUĆ"}
          </TaskButton>
        );
      }
      if (taskEnum === "ZWROC") {
        const step = "Koniec";
        return (
          <TaskButton
            color="#cf19bdd6"
            key={taskEnum}
            onClick={() => employerHandleButton(taskEnum, step)}
          >
            {"ZWRÓĆ"}
          </TaskButton>
        );
      }
      if (taskEnum === "DODAJ") {
        const step = "Akcpetacja Pracodawcy";
        return (
          <TaskButton
            color="#e06228d5"
            key={taskEnum}
            onClick={() => employerHandleButton(taskEnum, step)}
          >
            {taskEnum}
          </TaskButton>
        );
      }
      if (taskEnum === "DO_REALIZACJI") {
        const step = "Koniec";
        return (
          <TaskButton
            color="#4de028d4"
            key={taskEnum}
            onClick={() => employerHandleButton(taskEnum, step)}
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

  const handleDeleteClick = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/vacations/${vacationData?.id}`
      );

      if (response.status === 204) {
        console.log("Vacation deleted successfully.");
        setShowOverlayWarning(true)
      } else {
        console.error("Failed to delete vacation.");
      }
    } catch (error) {
      console.error("Error deleting vacation:", error);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
  
    if (showOverlayWarning) {
      timeoutId = setTimeout(() => {
        setShowOverlayWarning(false);
        navigate("/")
      }, 1500);
    }
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showOverlayWarning]);


  return (
    <MainWrapper>
      <OverlayWarning show={showOverlayWarning} />
      <Overlay
        overlayVisible={overlayVisible}
        modalVisible={modalVisible}
        hamburgerVisible={hamburgerVisible}
        onClose={closeMenu}
        errorMessage={errorMessage}
      />

      <Menu></Menu>
      <PreviewWrapper>
        {vacationData ? (
          <HeaderContainer>
            <HeaderTop
              userName={userName}
              userType={userType}
              headerText="Szczegółowy podgląd urlopu"
            />
            <Header>
              <CustomerInitiated
                color={vacationData ? vacationData.employeeTheme : "black"}
              >
                {getInitials(
                  vacationData ? vacationData.employerName : "Nie istnieje"
                )}
              </CustomerInitiated>{" "}
              <HeaderTitle>Informacje o urlopie</HeaderTitle>
            </Header>
            <HeaderBottom>
              <EditIcon />
              <TrashIcon onClick={handleDeleteClick} />
            </HeaderBottom>
            <WrapperContainer>
              <VacationContainer>
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
                    <DateInput
                      type="date"
                      value={vacationData.endDate}
                      readOnly
                    />
                    <Text>Opis:</Text>
                    <TextArea
                      rows={4}
                      value={vacationData.description}
                      readOnly
                    />
                  </DetailsContainer>
                  <AdditionalDetailsContainer>
                    <CommentContainer>
                      <CommentTitle>Komentarz:</CommentTitle>
                      <CommentContainerArea>
                        <CommentIcon />
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
                        <DocumentDownload onClick={() => handleDownloadClick()}>
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
              </VacationContainer>
              <VacationInformations>
                <InformationsContainer>
                  <VacationInformationsTitle>
                    Informacje
                  </VacationInformationsTitle>
                  <InformationsProcess>Proces</InformationsProcess>
                  <ProcessValue>Nowy urlop</ProcessValue>
                </InformationsContainer>
                <InformationsContainer>
                  <VacationInformationsTitle>
                    ID urlopu
                  </VacationInformationsTitle>
                  <ProcessValue>{vacationData.id}</ProcessValue>
                </InformationsContainer>
                {renderInformationsContainer(informationsContainerData)}
                <InformationsContainer>
                  <VacationInformationsTitle>
                    Szczegóły
                  </VacationInformationsTitle>
                  <InformationsProcess>Data utworzenia</InformationsProcess>
                  <ProcessValue>{vacationData.createdDate}</ProcessValue>
                  <InformationsProcess>Autor</InformationsProcess>
                  <ProcessValue>{vacationData.employerName}</ProcessValue>
                </InformationsContainer>
              </VacationInformations>
            </WrapperContainer>
          </HeaderContainer>
        ) : (
          <Warrning>
            Wystąpił błąd, urlop o podanym id nie istnieje w bazie danych....
          </Warrning>
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
  position: relative;
`;

const Warrning = styled.p`
  font-size: 40px;
  font-weight: bold;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 15px;
`;
const CustomerInitiated = styled.div`
  box-sizing: border-box;
  width: 90px;
  height: 90px;
  background-color: ${(props) => props.color};
  color: #ffffff;
  font-size: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 35px;
  font-weight: bold;
  top: -7.5px;
  border: 4px solid #afadad;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const VacationContainer = styled.div`
  margin: 100px;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 60%;
  @media (max-width: 800px) {
    margin: 5px;
    margin-top: 100px;
  }
  background-color: white;
  -webkit-box-shadow: 0px 2px 17px -7px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 2px 17px -7px rgba(66, 68, 90, 1);
  box-shadow: 0px 2px 17px -7px rgba(66, 68, 90, 1);
`;

const VacationStep = styled.div`
  display: flex;
  align-items: center;
`;
const StepName = styled.a`
  font-size: 14px;
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
  padding: 8px 5px;
  display: flex;
  align-items: center;
  color: #686666;
`;
const CustomHomeIcon = styled(SlArrowRight)`
  width: 10px;
  height: 10px;
  margin: 5px;
  display: block;
  padding: 8px 5px;
`;
const CustomCircleIcon = styled(FaCircleDot)`
  width: 12px;
  height: 12px;
  margin: 5px;
  display: block;
  padding: 8px 5px;
  color: grey;
`;
const TrashIcon = styled(FaTrashAlt)`
  width: 22px;
  height: 22px;
  margin: 5px;
  display: block;
  color: #80808083;
  margin: 15px 40px;
  cursor: pointer;
`;

const EditIcon = styled(FaEdit)`
  width: 22px;
  height: 22px;
  margin: 5px;
  display: block;
  color: #80808083;
  margin: 15px 2px;
  cursor: pointer;
`;

const VacationInformations = styled.div`
  height: 100%;
  width: 220px;
  flex-direction: column;
  padding-top: 100px;
`;
const InformationsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const VacationInformationsTitle = styled.p`
  color: #449cb3;
  font-size: 16px;
  font-weight: bold;
`;
const InformationsProcess = styled.p`
  color: #adabab;
  font-size: 14px;
  padding: 0px;
  margin: 0px;
  padding-left: 20px;
`;
const ProcessValue = styled.p`
  color: #686666;
  font-size: 15px;
  padding: 0px;
  margin: 0px;
  padding-left: 20px;
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
  background-color: #35d435b7;
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
  background-color: rgb(248, 244, 244);
  position: relative;
`;

const HeaderBottom = styled.div`
  width: 100%;
  height: 50px;
  background-color: #ece1d69e;
  display: flex;
  justify-content: end;
`;

const AuthorInitials = styled.div`
  width: 90px;
  height: 90px;
  background-color: #ca5858;
  position: absolute;
  left: 40px;
  top: -7.5px;
  font-size: 60px;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Initials = styled.div`
  font-size: 60px;
  font-weight: bold;
  color: white;
`;

const HeaderTitle = styled.h1`
  margin: 10px;
  margin-left: 160px;
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
