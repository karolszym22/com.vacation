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

const SignIn = styled.div`
  color: #928d8d;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 15px;
`;
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

const UserIcon = styled(FiUser)`
  width: 25px;
  height: 25px;
  margin: 5px;
  display: inline-block;
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
  justify-content: space-between;
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
  const [realizedVacations, setRealizedVacations] = useState<Vacation[]>([]);
  const [rejectedVacations, setRejectedVacations] = useState<Vacation[]>([]);
  const userName = useSelector(
    (state: RootState) => state.authorization.user.name
  );
  const vacationsCount = useSelector((state: RootState) => state.vacations.vacationsCount);
  const vacationsContent = useSelector((state: RootState) => state.vacations);
  console.log(vacationsCount)
  console.log(vacationsContent)
  const duringVacationCount = vacationsCount - realizedVacations.length - rejectedVacations.length;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/vacations/status/Zrealizowano"
        );

        if (response.status === 200) {
          const data = response.data;
          setRealizedVacations(data);
          console.log(data);
        } else {
          console.error("Failed to fetch realized vacations.");
        }
      } catch (error) {
        console.error("Error fetching realized vacations:", error);
      }
      try {
        const response = await axios.get(
          "http://localhost:8080/vacations/status/Odrzucono"
        );

        if (response.status === 200) {
          const data = response.data;
          setRejectedVacations(data);
        } else {
          console.error("Failed to fetch realized vacations.");
        }
      } catch (error) {
        console.error("Error fetching realized vacations:", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <HeaderContainer>
      <HeaderTop>
        <HeaderTopInformation>
          <Information />
          <a>Strona główna</a>
        </HeaderTopInformation>
        <SignIn>
          <UserIcon />
          <a>{userName}</a>
        </SignIn>
      </HeaderTop>
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
            <HeaderElementValue color="#f2c121a4">{duringVacationCount}</HeaderElementValue>
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
