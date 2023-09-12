import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Menu from "../../Components/SideMenu/SideMenu";
import Header from "../../Components/Header/Header";
import MainMenu from "../../Components/Main/Main";
import OverlayWrapper from "../../Components/Overlay/Overlay"

const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface Vacation {
  id: number;
  description: string;
  days: number;
  done: boolean;
}

function Main() {
  const [vacations, setVacations] = useState<Vacation[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/vacations")
      .then((response) => response.json())
      .then((data) => {
        setVacations(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>

      <MainWrapper>
      
        <Menu />
        <Wrapper>
          <Header />
          <MainMenu></MainMenu>
        </Wrapper>
      </MainWrapper>
    </div>
  );
}

export default Main;
