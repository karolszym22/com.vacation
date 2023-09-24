import styled from "styled-components";
import img from "../../resources/pexels-karolina-grabowska-7876708.jpg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiUser, FiAlignLeft } from "react-icons/fi";

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
const HeaderTopInformation = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: #928d8d;
`;
const Information = styled(FiAlignLeft)`
  width: 25px;
  height: 25px;
  margin: 5px;
  display: inline-block;
`;

const Header = styled.div`
  width: 100%;
  height: 40px;
  background-color: white;
  position: absolute;
  top: 0px;
  display: flex;
  justify-content: space-between;
`;
const SignIn = styled.div`
  color: #928d8d;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 15px;
`;
const HeaderTop = () => {
    
    return (
        <Header>
          <HeaderTopInformation>
            <Information />
            <a>Strona główna</a>
          </HeaderTopInformation>
          <SignIn>
            <a>asda</a>
          </SignIn>
        </Header>
    );
  };

