import React, { useState, useContext } from "react";
import styled from "styled-components";
import Menu from "../../Components/SideMenu/SideMenu";
import { useSelector } from "react-redux";
import HeaderTop from "../../Components/Header/HeaderTop";
import Overlay from "../../Components/Overlay/Overlay";
import { OverlayVisibleContext } from "../../Components/Context/OverlayVisibleContext";
import { RootState } from "../../Types/Vacations/RootState";
import InputEmoji from "react-input-emoji";
import { ChatElementI } from "../../Types/Chat/ChatElementI";
import { ChatElementDescriptionI } from "../../Types/Chat/ChatElementDescription";
import { ChangeBoxMessageStatusI } from "../../Types/Chat/ChangeBoxMessageStatusI";
import { ChatElementAuthorI } from "../../Types/Chat/ChatElementAuthorI";
import { getInitials } from "../../Utils/getInitials.";
import useFetchUserList from "../../Hooks/Messages/useFetchUserList";
import useCurrentCoresspondence from "../../Hooks/Messages/useCurrentCorespondance";
import useCoresspondence from "../../Hooks/Messages/useCorespondance";
import useReciepientData from "../../Hooks/Messages/useReciepientData";
import { formatDate } from "../../Utils/formatDate";

interface Overlay {
  overlayVisible: boolean;
  modalVisible: boolean;
  hamburgerVisible: boolean;
  setOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function Messages() {
  const { userList } = useFetchUserList();
  const { allCoresspondences } = useCoresspondence();
  const { recipientId, recipientName, setRecipientData } = useReciepientData();
  const {
    correspondenceId,
    currentCoresspondence,
    corresspondenceMessagesList,
    openCorrespondence,
    setCurrentCoresspondence,
  } = useCurrentCoresspondence();

  const [description, setMessage] = useState("");
  const [, setIsMenuOpen] = useState(false);
  const { overlayVisible } = useContext(OverlayVisibleContext);
  const { modalVisible } = useContext(OverlayVisibleContext);
  const { hamburgerVisible } = useContext(OverlayVisibleContext);
  const [title, setTitle] = useState("");
  const userName = useSelector(
    (state: RootState) => state.authorization.user.name
  );
  const authorId = useSelector(
    (state: RootState) => state.authorization.user.id
  );
  const userInitialsColor = useSelector(
    (state: RootState) => state.authorization.user.employerInitialsColor
  );
  const userType = useSelector(
    (state: RootState) => state.authorization.user.employerType
  );
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const addNewCorrespondence = () => {
    setCurrentCoresspondence(false);
  };

  const handleSubmit = async (description: string, title: string) => {
    const message = {
      title,
      description,
      authorId,
      userName,
      recipientId,
      recipientName,
      correspondenceId,
      date: formatDate(),
      authorName: userName,
      initialsColor: userInitialsColor,
    };
    const correspondence = {
      title,
      personOneId: authorId,
      personTwoId: recipientId,
      authorName: userName,
      date: new Date(),
    };

    const dataToSend = {
      correspondence,
      message,
    };

    try {
      let endpoint = "http://localhost:8080/newMessage";
      let requestBody = JSON.stringify(message);

      if (!currentCoresspondence) {
        endpoint = "http://localhost:8080/newCorrespondenceAndMessage";
        requestBody = JSON.stringify(dataToSend);
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });
    } catch (error) {
      console.error("Error adding vacation:", error);
    }
  };

  return (
    <div>
      <MainWrapper>
        <Overlay
          overlayVisible={overlayVisible}
          modalVisible={modalVisible}
          hamburgerVisible={hamburgerVisible}
          onClose={closeMenu}
          errorMessage=""
        />
        <Menu />
        <Wrapper>
          <HeaderTop
            userName={userName}
            userType={userType}
            headerText="Skrzynka odbiorcza"
          ></HeaderTop>
          <Header>
            <HeaderTitle>Wiadomości</HeaderTitle>
          </Header>
          <MainContainer>
            <BoxContainer>
              <BoxContainerHeader>
                <BoxContainerTitle>Skrzynka z wiadomościami</BoxContainerTitle>
              </BoxContainerHeader>
              <BoxAreaElements>
                <MessagesListContainer>
                  <MessagesListHeader>
                    <ListHeaderButton onClick={addNewCorrespondence}>
                      Dodaj korespondencje
                    </ListHeaderButton>
                  </MessagesListHeader>
                  <SearchMessage></SearchMessage>
                  <MessagesListElements>
                    {allCoresspondences.map((coresspondences) => (
                      <React.Fragment key={coresspondences.id}>
                        <MessageElement>
                          <MessageOverlay
                            onClick={() =>
                              openCorrespondence(coresspondences.id)
                            }
                          />
                          
                          <MessageElementAuthor>
                            <Author>Autor: </Author> {coresspondences.authorName}
                          </MessageElementAuthor>
                          <MessageElementFooter>
                            <MessageElementTitle>
                              {coresspondences.title}
                            </MessageElementTitle>
                            <MessageElementData>
                              Data: {coresspondences.date.split("T")[0]}
                            </MessageElementData>
                          </MessageElementFooter>
                        </MessageElement>
                      </React.Fragment>
                    ))}
                  </MessagesListElements>
                </MessagesListContainer>
                <MessagesCreatorContainer>
                  <CreatorPanel>
                    <EmployeesListContainer visible={currentCoresspondence}>
                      <EmployeesListTitle>Pracownicy:</EmployeesListTitle>
                      <EmployeesListElements>
                        {userList.map((user, index) => (
                          <React.Fragment key={user.id}>
                            <EmployeeElement
                              onClick={() =>
                                setRecipientData(user.username, user.id)
                              }
                            >
                              <EmployeeElementOverlay></EmployeeElementOverlay>
                              <EmployeeNameContainer>
                                <EmployeeName>{user.username}</EmployeeName>
                              </EmployeeNameContainer>
                            </EmployeeElement>
                            {index !== userList.length - 1 && ", "}
                          </React.Fragment>
                        ))}
                      </EmployeesListElements>
                    </EmployeesListContainer>
                    <CreatorPanelHeader visible={currentCoresspondence}>
                      <RecipientArea>
                        Do: <a>{recipientName}</a>
                      </RecipientArea>
                      <TitleArea>
                        Tytuł:
                        <TitleValue
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Wpisz tytuł wiadomości..."
                        />
                      </TitleArea>
                    </CreatorPanelHeader>
                  </CreatorPanel>
                  <ChatArea>
                    {corresspondenceMessagesList.map((message) => (
                      <React.Fragment key={message.id}>
                        <ChatElement
                          alignItems={
                            message.authorId === authorId ? "end" : "start"
                          }
                        >
                          <ChatElementContainer
                            alignItems={
                              message.authorId === authorId ? "end" : "start"
                            }
                          >
                            <ChatAuthorContainer
                              alignItems={
                                message.authorId === authorId ? "none" : "flex"
                              }
                            >
                              <CustomerInitiated color={message.initialsColor}>
                                {getInitials(message.authorName)}
                              </CustomerInitiated>
                              <ChatElementAuthor
                                textAlign={
                                  message.authorId === authorId
                                    ? "end"
                                    : "start"
                                }
                              >
                                {message.authorName}
                              </ChatElementAuthor>
                            </ChatAuthorContainer>
                            <ChatElementDescription
                              color={
                                message.authorId === authorId
                                  ? "#74a4f27f"
                                  : "#68e89b75"
                              }
                            >
                              {message.description}
                            </ChatElementDescription>
                          </ChatElementContainer>
                        </ChatElement>
                      </React.Fragment>
                    ))}
                  </ChatArea>
                  <TextAreaContainer>
                    <InputEmoji
                      value={description}
                      onChange={setMessage}
                      cleanOnEnter
                      onEnter={() => handleSubmit(description, title)}
                      placeholder="..."
                    />
                  </TextAreaContainer>
                </MessagesCreatorContainer>
              </BoxAreaElements>
            </BoxContainer>
          </MainContainer>
        </Wrapper>
      </MainWrapper>
    </div>
  );
}

export default Messages;

const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  width: 100%;
  height: 70px;
  background-color: rgb(248, 244, 244);
`;
const HeaderTitle = styled.h1`
  margin: 10px;
  color: #696666;
`;
const MainContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
`;
const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 50px;
  -webkit-box-shadow: 0px 0px 2px 0px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 0px 2px 0px rgba(66, 68, 90, 1);
  box-shadow: 0px 0px 2px 0px rgba(66, 68, 90, 1);
  -webkit-box-shadow: 0px 2px 17px -7px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 2px 17px -7px rgba(66, 68, 90, 1);
  box-shadow: 0px 2px 17px -7px rgba(66, 68, 90, 1);
`;

const BoxContainerHeader = styled.div`
  width: 100%;
  height: 60px;
  background-color: #46596b;
`;
const BoxContainerTitle = styled.h3`
  color: white;
  margin-left: 12.5px;
`;

const BoxAreaElements = styled.div`
  display: flex;
  height: 100%;
  background-color: #f2f3f0;
  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const MessagesListContainer = styled.div`
  width: 370px;

  height: 100%;
  border-right: 1px solid #0000003f;
  @media (max-width: 850px) {
    height: 150px;
    width: 100%;
    max-width: 100%;
  }
`;
const MessagesListHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  -webkit-box-shadow: 0px 3px 4px -4px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 3px 4px -4px rgba(66, 68, 90, 1);
  box-shadow: 0px 3px 4px -4px rgba(66, 68, 90, 1);
  background-color: #f2f3f0;
`;
const SearchMessage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MessagesListElements = styled.div`
  height: 80%;
  width: 100%;
  background: #ffffff;
  overflow-y: scroll;
`;
const MessageElement = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 120px;
  -webkit-box-shadow: 0px 4px 3px -5px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 4px 3px -5px rgba(66, 68, 90, 1);
  box-shadow: 0px 4px 3px -5px rgba(66, 68, 90, 1);
  background-color: white;
  position: relative;
  margin-bottom: 3px;
`;
const MessageOverlay = styled.div`
  width: 100%;
  height: 120px;
  position: absolute;
  cursor: pointer;
  &:hover {
    background-color: #00000026;
  }
`;

const MessageElementTitle = styled.div`
  width: 40%;
  height: 22px;
  font-size: 13px;
  margin-left: 15px;
  font-weight: bold;
  display: flex;
  color: #46596b;
`;
const MessageElementFooter = styled.div`
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;
const MessageElementAuthor = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-left: 15px;
  margin-top: 15px;
  font-weight: bold;
  color: black;
`;
const Author = styled.a`
  font-size: 12px;
  color: #46596b;
`
const MessageElementData = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 10px;
  margin-right: 5px;
  font-weight: bold;
  color: #46596b;
  font-weight: bold;
  width: 100px;
`;

const ListHeaderButton = styled.div`
  color: #0000008d;
  padding-top: 5px;
  font-weight: bold;
  cursor: pointer;
`;
const MessagesCreatorContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 800px;
`;
const CreatorPanel = styled.div`
  width: 95%;
  margin-left: 10px;
  font-size: 12px;

  display: flex;
  flex-direction: column;
`;
const CreatorPanelHeader = styled.div<ChangeBoxMessageStatusI>`
  display: ${({ visible }) => (visible ? "none" : "flex")};
  flex-direction: column;
  justify-content: space-evenly;
  background-color: rgb(249, 247, 247);
  height: 50px;
  color: #0000008d;
`;

const RecipientArea = styled.div``;
const TitleArea = styled.div``;
const TitleValue = styled.input`
  border: none;
  margin-left: 3px;
  width: 90%;
  padding: 7px;
`;

const TextAreaContainer = styled.div`
  background-color: #f9f6f6;
`;
const ChatArea = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: white;

  @media (max-width: 850px) {
    margin-top: 30px;
  }
`;

const ChatElement = styled.div<ChatElementI>`
  max-width: 100%;
  margin: 25px;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.alignItems};
`;
const ChatElementContainer = styled.div<ChatElementI>`
  max-width: 220px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  align-items: ${(props) => props.alignItems};
`;

const ChatAuthorContainer = styled.div<ChatElementI>`
  display: flex;
  justify-content: center;
  align-items: center;
  display: ${(props) => props.alignItems};
`;
const ChatElementDescription = styled.div<ChatElementDescriptionI>`
  background-color: ${(props) => props.color};
  padding: 6px;
  border-radius: 8px;
  font-size: 14px;
  color: #4c4747;
  margin: 2px 35px;
  max-width: 200px;
  word-wrap: break-word;
`;
const ChatElementAuthor = styled.div<ChatElementAuthorI>`
  text-align: ${(props) => props.textAlign};
  font-size: 12px;
  margin: 0px 5px;
`;

const EmployeesListContainer = styled.div<ChangeBoxMessageStatusI>`
  width: 100%;
  display: ${({ visible }) => (visible ? "none" : "flex")};
`;
const EmployeesListTitle = styled.div`
  width: 100px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  color: #0000008d;
  font-size: 15px;
`;
const EmployeesListElements = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 2.5px;
`;
const EmployeeElement = styled.div`
  height: 25px;
  display: flex;
  justify-content: space-between;
  position: relative;
`;
const EmployeeElementOverlay = styled.div`
  position: absolute;
  width: 140px;
  height: 25px;
  cursor: pointer;
  color: black;
`;

const EmployeeNameContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const EmployeeName = styled.div`
  font-size: 10px;
  font-weight: bold;
  color: black;
  margin-left: 7px;
`;

const CustomerInitiated = styled.div`
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
  color: #ffffff;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
