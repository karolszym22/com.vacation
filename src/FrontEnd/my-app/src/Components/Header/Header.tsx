import styled from "styled-components";
import img from "../../resources/pexels-karolina-grabowska-7876708.jpg";
import userIcon from "../../resources/user.png";
import {NavLink, useNavigate} from 'react-router-dom';
import { connect } from "react-redux"
import { useSelector } from "react-redux";
import RootState from "../../Reducers/Store/index"; 
import { Store } from "redux";

interface UserState {
  id: number;
  name: string;
  email: string;
}

interface AuthorizationState {
  user: UserState;
}

interface RootState {
  authorization: AuthorizationState;
}

const UserIcon = styled.div`
  background-image: url(${userIcon});
  color: white;
  height: 24px;
  width: 24px;
  margin: 5px 20px;
  background-color: white;
`;

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
`;

const HeaderTop = styled.div`
  width: 100%;
  height: 40px;
  background-color: white;
  position: absolute;
  top: 0px;
  display: flex;
  justify-content: end;
`;
const HeaderTitle = styled.h1`
  width: 100%;
  color: #928d8d;
  text-align: center;
`;
const HeaderBackground = styled.div`
  width: 70%;
  height: 70%;
  margin-right: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const HeaderElement = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Header = () => {
  const userName = useSelector((state: RootState) => state.authorization.user.name);



  return (
    <HeaderContainer>
      <HeaderTop>
        <UserIcon  as={NavLink} to="/SignIn"></UserIcon>
        <a>{userName}</a> {}
      </HeaderTop>
      <HeaderBackground>
        <HeaderTitle>Dodawaj i obserwuj swoje urlopy! </HeaderTitle>
        <HeaderElementContainer>
          <HeaderElement>
            {" "}
            <HeaderElementValue color="#2cfc03">10</HeaderElementValue>
            <Value>Zaakceptowane</Value>
          </HeaderElement>
          <HeaderElement>
            {" "}
            <HeaderElementValue color="orange">23</HeaderElementValue>
            <Value>W trakcie</Value>
          </HeaderElement>
          <HeaderElement>
            {" "}
            <HeaderElementValue color="brown">0</HeaderElementValue>
            <Value>Odrzucone</Value>
          </HeaderElement>
        </HeaderElementContainer>
      </HeaderBackground>
    </HeaderContainer>
  );
};

export default Header;
