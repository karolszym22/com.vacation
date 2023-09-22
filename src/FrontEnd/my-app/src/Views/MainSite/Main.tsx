import React, { useState } from "react";
import styled from "styled-components";
import Menu from "../../Components/SideMenu/SideMenu";
import Header from "../../Components/Header/Header";
import MainMenu from "../../Components/Main/Main";
import { vacationsList } from "../../Components/Actions/actions";
import { useDispatch } from "react-redux";

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
  flex-grow: 1;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function Main() {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/vacations");
      const data = await response.json();
      setVacations(data);
      dispatch(vacationsList(data));
      console.log("AAAAAAAAAAAAa")
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <MainWrapper>
        <Menu />
        <Wrapper>
          <Header />
          <MainMenu />
        </Wrapper>
      </MainWrapper>
    </div>
  );
}

export default Main;