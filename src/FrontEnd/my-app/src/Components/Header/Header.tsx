import styled from "styled-components";
import img from "../../resources/pexels-karolina-grabowska-7876708.jpg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiUser, FiAlignLeft } from "react-icons/fi";
import { useHeaderData } from "../../Hooks/useHeader";

interface UserState {
  id: number;
  name: string;
  email: string;
}

interface Vacation {
  id: number;
  daysNum: number;
  done: boolean;
  taskStatus: string;
  startDate: string;
  endDate: string;
  employerName: string;
  personId: number;
  descritpion: string;
}

interface AuthorizationState {
  user: UserState;
}

interface RootState {
  authorization: AuthorizationState;
  vacations: {
    list: Vacation[];
    vacationsCount: number;
  };
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${img});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center 60%;
    opacity: 0.2;
    z-index: -1;
  }
  @media (max-width: 530px) {
    height: 750px;
  }
`;

const HeaderTitle = styled.h1`
  width: 100%;
  color: #928d8d;
  text-align: center;
`;
const HeaderBackground = styled.div`
  width: 70%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 976px) {
    width: 90%;
  }
  @media (max-width: 530px) {
    height: 100%;
  }
`;
const HeaderElement = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 530px) {
    justify-content: space-evenly;
  }
`;
const Value = styled.div`
  font-size: 20px;
  color: #565454;
  font-weight: bold;
`;
const HeaderElementValue = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 150px;
  font-size: 34px;
  font-weight: bold;
  border: 15px solid ${({ color }) => color};
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 50;
`;

const HeaderElementContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 530px) {
    flex-direction: column;
  }
`;

const Header = () => {
  const {
    userName,
    realizedVacations,
    rejectedVacations,
    duringVacationCount,
  } = useHeaderData();

  return (
    <HeaderContainer>
      <HeaderBackground>
        <HeaderTitle>Dodawaj i obserwuj swoje urlopy! </HeaderTitle>
        <HeaderElementContainer>
          <HeaderElement>
            {" "}
            <HeaderElementValue color="#2dfc0394">
              {realizedVacations.length}
            </HeaderElementValue>
            <Value>Zaakceptowane</Value>
          </HeaderElement>
          <HeaderElement>
            {" "}
            <HeaderElementValue color="#f2c121a4">
              {duringVacationCount}
            </HeaderElementValue>
            <Value>W trakcie</Value>
          </HeaderElement>
          <HeaderElement>
            {" "}
            <HeaderElementValue color="#f3211d93">
              {rejectedVacations.length}
            </HeaderElementValue>
            <Value>Odrzucone</Value>
          </HeaderElement>
        </HeaderElementContainer>
      </HeaderBackground>
    </HeaderContainer>
  );
};

export default Header;
