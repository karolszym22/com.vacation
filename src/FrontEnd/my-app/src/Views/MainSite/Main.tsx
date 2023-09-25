import React, { useState } from "react";
import styled from "styled-components";
import Menu from "../../Components/SideMenu/SideMenu";
import HeaderTop from "../../Components/Header/HeaderTop";
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
  display: flex;
  justify-content: space-between;
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
          <HeaderTop />
          <Header />
          <MainMenu />
        </Wrapper>
      </MainWrapper>
    </div>
  );
}

export default Main;