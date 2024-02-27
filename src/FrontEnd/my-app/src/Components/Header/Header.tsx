import styled from "styled-components";
import img from "../../resources/pexels-karolina-grabowska-7876708.jpg";
import { useHeaderData } from "../../Hooks/Header/useHeader";

const Header = () => {
  const {
    realizedVacationsCount,
    rejectedVacationsCount,
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
              {realizedVacationsCount}
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
              {rejectedVacationsCount}
            </HeaderElementValue>
            <Value>Odrzucone</Value>
          </HeaderElement>
        </HeaderElementContainer>
      </HeaderBackground>
    </HeaderContainer>
  );
};

export default Header;

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
    opacity: 0.1;
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
