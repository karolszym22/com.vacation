import React, { useState, useContext } from "react";
import styled from "styled-components";
import Menu from "../../Components/SideMenu/SideMenu";
import MainMenu from "../../Components/Main/Main";
import { vacationsList } from "../../Components/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import HeaderTop from "../../Components/Header/HeaderTop";
import Overlay from "../../Components/Overlay/Overlay";
import { OverlayVisibleContext } from "../../Components/Context/OverlayVisibleContext";
import { RootState } from "../../Types/RootState";
import InputEmoji from "react-input-emoji";

interface Overlay {
  overlayVisible: boolean;
  modalVisible: boolean;
  hamburgerVisible: boolean;
  setOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface UserState {
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
  background: #f5f5f5;
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
`;
const MessageOverlay = styled.div`
  width: 100%;
  height: 80px;
  position: absolute;
  cursor: pointer;
  &:hover{
    background-color: #00000026;
  }
`;

const MessageElementHeader = styled.div`
  width: 100%;
  height: 15px;
  border-bottom: 1px solid #00000031;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
`
const MessageElementTitle = styled.div`
  width: 100%;
  height: 22px;
  font-size: 11px;
  padding: 3px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`
const MessageElementFooter = styled.div`
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: end;
`
const MessageElementAuthor = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 10px;
  margin-left: 5px;
`
const MessageElementData = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 10px;
  margin-right: 5px;
`

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
const CreatorPanelHeader = styled.div`
  display: flex;
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
const SearchMessageValue = styled.input`
  border: 1px solid #4c49496f;
  margin-left: 3px;
  width: 80%;
  background-color: #f9f6f6;
  padding: 3px;
  border-radius: 10px;
  color: #0707076e;
`;
const TextAreaContainer = styled.div`
  height: 70px;
  background-color: #f9f6f6;
`;
const ChatArea =  styled.div`
  width: 100%;
  height: 350px;
  background-color: #ffffff;
`
const EmployeesListContainer = styled.div`
  width: 100%;
  display: flex;
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
const EmployeeInitialsContainer = styled.div`
  width: 30px;
  background-color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EmployeeInitials = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: white;
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
  const [userList, setUsersList] = useState<UserState[]>([]);
  const [message, setMessage] = useState<String>();
  const [, setIsMenuOpen] = useState(false);
  const [recipient, setRecipient] = useState<String>();
  const { overlayVisible } = useContext(OverlayVisibleContext);
  const { modalVisible } = useContext(OverlayVisibleContext);
  const { hamburgerVisible } = useContext(OverlayVisibleContext);
  const [title, setTitle] = useState("");
  const userName = useSelector(
    (state: RootState) => state.authorization.user.name
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

  const initialsColorGenerator = () => {
    const minColorValue = 100;

    const randomColorComponent = () => {
      return Math.floor(Math.random() * (256 - minColorValue)) + minColorValue;
    };

    const red = randomColorComponent().toString(16);
    const green = randomColorComponent().toString(16);
    const blue = randomColorComponent().toString(16);

    return `#${red}${green}${blue}`;
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
                    <ListHeaderButton>Wszystkie</ListHeaderButton>
                    <ListHeaderButton>Od Ciebie</ListHeaderButton>
                  </MessagesListHeader>
                  <SearchMessage>
                    <SearchMessageValue
                      type="text"
                      value={title}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Szukaj wiadomośći"
                    />
                  </SearchMessage>
                  <MessagesListElements>
                    <MessageElement>
                      <MessageOverlay/>
                      <MessageElementHeader>Temat</MessageElementHeader>
                      <MessageElementTitle>Pytanie o Jave</MessageElementTitle>
                      <MessageElementFooter>
                        <MessageElementAuthor>Autor: <a>Karol Szymański</a></MessageElementAuthor>
                        <MessageElementData>Data: <a>20.09.2023</a></MessageElementData>
                      </MessageElementFooter>
                    </MessageElement>
                    <MessageElement>   <MessageElementHeader>Temat</MessageElementHeader>
                      <MessageElementTitle>Co z klientami z Włoch?</MessageElementTitle>
                      <MessageElementFooter>
                        <MessageElementAuthor>Autor: <a>Karol Szymański</a></MessageElementAuthor>
                        <MessageElementData>Data: <a>20.09.2023</a></MessageElementData>
                      </MessageElementFooter></MessageElement>
                    <MessageElement> <MessageElementHeader>Temat</MessageElementHeader>
                      <MessageElementTitle>Będę jechał po kebaba, chcesz coś?</MessageElementTitle>
                      <MessageElementFooter>
                        <MessageElementAuthor>Autor: <a>Karol Szymański</a></MessageElementAuthor>
                        <MessageElementData>Data: <a>20.09.2023</a></MessageElementData>
                      </MessageElementFooter></MessageElement>
                    <MessageElement> <MessageElementHeader>Temat</MessageElementHeader>
                      <MessageElementTitle>Co z klientami z Włoch?</MessageElementTitle>
                      <MessageElementFooter>
                        <MessageElementAuthor>Autor: <a>Karol Szymański</a></MessageElementAuthor>
                        <MessageElementData>Data: <a>20.09.2023</a></MessageElementData>
                      </MessageElementFooter></MessageElement>
                      <MessageElement> <MessageElementHeader>Temat</MessageElementHeader>
                      <MessageElementTitle>Co z klientami z Włoch?</MessageElementTitle>
                      <MessageElementFooter>
                        <MessageElementAuthor>Autor: <a>Karol Szymański</a></MessageElementAuthor>
                        <MessageElementData>Data: <a>20.09.2023</a></MessageElementData>
                      </MessageElementFooter></MessageElement>
                  </MessagesListElements>
                </MessagesListContainer>
                <MessagesCreatorContainer>
                  <CreatorPanel>
                  <EmployeesListContainer>
                    <EmployeesListTitle>Pracownicy:</EmployeesListTitle>
                    <EmployeesListElements>
                      {userList.map((user, index) => (
                        <React.Fragment key={user.id}>
                          <EmployeeElement
                            onClick={() => setRecipient(user.username)}
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
                    <CreatorPanelHeader>
                      <RecipientArea>
                        Do: <a>{recipient}</a>
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

                  </ChatArea>
                  <TextAreaContainer>
                  <InputEmoji
                      value={text}
                      onChange={setText}
                      cleanOnEnter
                      onEnter={handleOnEnter}
                      placeholder="Type a message"
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
