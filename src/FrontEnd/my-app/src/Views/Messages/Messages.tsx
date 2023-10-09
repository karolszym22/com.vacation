import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Menu from "../../Components/SideMenu/SideMenu";
import {useSelector } from "react-redux";
import HeaderTop from "../../Components/Header/HeaderTop";
import Overlay from "../../Components/Overlay/Overlay";
import { OverlayVisibleContext } from "../../Components/Context/OverlayVisibleContext";
import { RootState } from "../../Types/RootState";
import InputEmoji from "react-input-emoji";
import axios from "axios";
import { Message } from "../../Types/Message";
import { ChatElementI } from "../../Types/ChatElementI";
import { ChatElementDescriptionI } from "../../Types/ChatElementDescription";
import { Correspondences } from "../../Types/Correspondences";
import { ChangeBoxMessageStatusI } from "../../Types/ChangeBoxMessageStatusI";
import { ChatElementAuthorI } from "../../Types/ChatElementAuthorI";

interface Overlay {
  overlayVisible: boolean;
  modalVisible: boolean;
  hamburgerVisible: boolean;
  setOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
interface UserState {
  id: number;
  username: string;
  email: string;
  employerType: string;
}

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
  align-items: center;
`;
const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1200px;
  height: 600px;
  margin-top: 20px;
  margin-left: 20px;
  -webkit-box-shadow: 0px 0px 2px 0px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 0px 2px 0px rgba(66, 68, 90, 1);
  box-shadow: 0px 0px 2px 0px rgba(66, 68, 90, 1);
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
`;

const MessagesListContainer = styled.div`
  width: 270px;
  height: 100%;
  border-right: 1px solid #0000003f;
`;
const MessagesListHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  -webkit-box-shadow: 0px 3px 4px -4px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 3px 4px -4px rgba(66, 68, 90, 1);
  box-shadow: 0px 3px 4px -4px rgba(66, 68, 90, 1);
`;
const SearchMessage = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MessagesListElements = styled.div`
  height: 420px;
  width: 100%;
  background: #ffffff;
  overflow-y: scroll;
`;
const MessageElement = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  height: 80px;
  -webkit-box-shadow: 0px 0px 1px 0px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 0px 1px 0px rgba(66, 68, 90, 1);
  box-shadow: 0px 0px 1px 0px rgba(66, 68, 90, 1);
  margin: 12px 10%;
  background-color: white;
  position: relative;
  border: 1px solid #0000002c;
  border-radius: 10px;
`;
const MessageOverlay = styled.div`
  width: 100%;
  height: 80px;
  position: absolute;
  cursor: pointer;
  &:hover {
    background-color: #00000026;
  }
`;

const MessageElementHeader = styled.div`
  width: 100%;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: #63c8c89b;
  color: white;
  font-weight: bold;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const MessageElementTitle = styled.div`
  width: 100%;
  height: 22px;
  font-size: 11px;
  padding: 3px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
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
  font-size: 9px;
  margin-left: 5px;
  font-weight: bold;
`;
const MessageElementData = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 9px;
  margin-right: 5px;
  font-weight: bold;
`;

const ListHeaderButton = styled.div`
  color: orange;
  padding-top: 5px;
  font-weight: bold;
  cursor: pointer;
`;
const MessagesCreatorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
`;

const RecipientArea = styled.div``;
const TitleArea = styled.div``;
const TitleValue = styled.input`
  border: none;
  margin-left: 3px;
  width: 90%;
`;

const TextAreaContainer = styled.div`
  height: 70px;
  background-color: #f9f6f6;
`;
const ChatArea = styled.div`
  width: 100%;

  overflow-y: scroll;
  background-color: #e5f0ef;
  height: 375px;
`;

const ChatElement = styled.div<ChatElementI>`
  max-width: 100%;
  margin: 25px;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.alignItems};
`;
const ChatElementContainer = styled.div`
  max-width: 220px;
  display: flex;
  flex-direction: column;

  position: relative;
`;
const ChatElementDescription = styled.div<ChatElementDescriptionI>`
  background-color: ${(props) => props.color};
  padding: 4px;
  border-radius: 8px;
  font-size: 14px;
  color: #4c4747;
  font-weight: bold;
`;
const ChatElementAuthor = styled.div<ChatElementAuthorI>`
  text-align: ${(props) => props.textAlign};
  font-size: 11px;
  font-weight: bold;
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

function Messages() {
  const [allCoresspondences, setAllCoresspondences] = useState<
    Correspondences[]
  >([]);
  const [userList, setUsersList] = useState<UserState[]>([]);
  const [description, setMessage] = useState("");
  const [currentCoresspondence, setCurrentCoresspondence] = useState(false);
  const [corresspondenceMessagesList, setCorresspondenceMessagesList] =
    useState<Message[]>([]);
  const [, setIsMenuOpen] = useState(false);
  const [recipientName, setRecipientName] = useState<String>();
  const [recipientId, setRecipientId] = useState<number>();
  const [correspondenceId, setCorrespondenceId] = useState<number>();
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
  const [text, setText] = useState("");

  function handleOnEnter(text: String) {
    console.log("enter", text);
  }
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/NewUser");
      const data = await response.json();
      setUsersList(data);
      console.log("MOJE USERY", userList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openCorrespondence = async (corespondenceId: number) => {
    setCurrentCoresspondence(true);
    setCorrespondenceId(corespondenceId);
    try {
      const response = await axios.post(
        "http://localhost:8080/coresspondenceMessages",
        {
          corespondenceId: corespondenceId,
        }
      );
      console.log(response.data);
      setCorresspondenceMessagesList(response.data);
      
    } catch (error) {
      console.error("Login error:", error);
    }
  };


  const addNewCorrespondence = () =>{
    setCurrentCoresspondence(false);
  }

  useEffect(() => {
    if (correspondenceId) {
      const fetchCorrespondenceMessages = async () => {
        try {
          const response = await axios.post(
            "http://localhost:8080/coresspondenceMessages",
            {
              corespondenceId: correspondenceId,
            }
          );
          console.log(response.data);
          setCorresspondenceMessagesList(response.data);
        } catch (error) {
          console.error("Error fetching correspondence messages:", error);
        }
      };
  
      fetchCorrespondenceMessages();
    }
  }, [corresspondenceMessagesList]);
  
 
  function formatDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

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

    if (!currentCoresspondence) {
      try {
        const response = await fetch(
          "http://localhost:8080/newCorrespondenceAndMessage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );
      } catch (error) {
        console.error("Error adding vacation:", error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:8080/newMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });
      } catch (error) {
        console.error("Error adding vacation:", error);
      }
    }
  };

  const setRecipientData = (recipientName: string, recipientId: number) => {
    setRecipientName(recipientName);
    setRecipientId(recipientId);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/correspondences`)
      .then((response) => response.json())
      .then((data) => {
        setAllCoresspondences(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [allCoresspondences]);

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
            headerText="Skrzynka odbiorcza"
          ></HeaderTop>
          <Header>
            <HeaderTitle>Wiadomości</HeaderTitle>
          </Header>
          <MainContainer>
            <BoxContainer>
              <BoxContainerHeader>
                <BoxContainerTitle>Skrzynka z wiadomośćiami</BoxContainerTitle>
              </BoxContainerHeader>
              <BoxAreaElements>
                <MessagesListContainer>
                  <MessagesListHeader>
                    <ListHeaderButton onClick={addNewCorrespondence}>Dodaj korespondencje

                    </ListHeaderButton>
                  </MessagesListHeader>
                  <SearchMessage>
                  </SearchMessage>
                  <MessagesListElements>
                    {allCoresspondences.map((coresspondences) => (
                      <React.Fragment key={coresspondences.id}>
                        <MessageElement>
                          <MessageOverlay
                            onClick={() =>
                              openCorrespondence(coresspondences.id)
                            }
                          />
                          <MessageElementHeader>Temat</MessageElementHeader>
                          <MessageElementTitle>
                            {coresspondences.title}
                          </MessageElementTitle>
                          <MessageElementFooter>
                            <MessageElementAuthor>
                              Autor: {coresspondences.authorName}
                            </MessageElementAuthor>
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
                          <ChatElementContainer>
                            <ChatElementAuthor
                              textAlign={
                                message.authorId === authorId ? "end" : "start"
                              }
                            >
                              {message.authorName}
                            </ChatElementAuthor>
                            <ChatElementDescription
                              color={
                                message.authorId === authorId
                                  ? "#74a4f29f"
                                  : "#68e89ba4"
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
