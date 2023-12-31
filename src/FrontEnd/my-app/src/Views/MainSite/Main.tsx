import React, { useState, useContext } from "react";
import styled from "styled-components";
import Menu from "../../Components/SideMenu/SideMenu";
import Header from "../../Components/Header/Header";
import MainMenu from "../../Components/Main/Main";
import { vacationsList } from "../../Components/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import HeaderTop from "../../Components/Header/HeaderTop";
import Overlay from "../../Components/Overlay/Overlay";
import { OverlayVisibleContext } from "../../Components/Context/OverlayVisibleContext"
import { RootState } from "../../Types/RootState";


interface Overlay {
  overlayVisible: boolean;
  modalVisible: boolean;
  hamburgerVisible: boolean
  setOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}


export interface Vacation {
  id?: number;
  description?: string;
  daysNum?: number;
  done?: boolean;
  taskStatus: string;
  startDate?: string;
  endDate?: string;
  employerName: string;
  personId: number;
}

const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function Main() {
  const [, setVacations] = useState<Vacation[]>([]);
  const [, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { overlayVisible } = useContext(OverlayVisibleContext);
  const { modalVisible } = useContext(OverlayVisibleContext);
  const { hamburgerVisible } = useContext(OverlayVisibleContext);
  
  const userName = useSelector(
    (state: RootState) => state.authorization.user.name
  );

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/vacations");
      const data = await response.json();
      setVacations(data);
      dispatch(vacationsList(data));
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

  return (
    <div>
      <MainWrapper>
      <Overlay overlayVisible={overlayVisible} modalVisible = {modalVisible} hamburgerVisible={hamburgerVisible} onClose={closeMenu} errorMessage="" />
        <Menu />
        <Wrapper>
          <HeaderTop userName = {userName} headerText="Strona główna"></HeaderTop>
          <Header />
          <MainMenu />
        </Wrapper>
      </MainWrapper>
      
    </div>
  );
}

export default Main;
