import styled from "styled-components";
import { useHeaderTopData } from "../../Hooks/Header/useHeaderTop";
import { FiCopy, FiAlignJustify } from "react-icons/fi";
import { HeaderTopProps } from "../../Types/Header/headerTop";

const HeaderTop: React.FC<HeaderTopProps> = ({ userName, userType, headerText }) => {
  const { toggleMenu } = useHeaderTopData();
  return (
    <Header>
      <HeaderTopInformation>
        <Information />
        <a>{headerText}</a>
      </HeaderTopInformation>
      <SignInContainer>
      <SignIn>
        <a>{userName}</a>
        <HamburgerLogo onClick={toggleMenu} />
      </SignIn>
      </SignInContainer>
    </Header>
  );
};

export default HeaderTop;

const AccountType = styled.div`
  font-size: 11px;
  font-weight: bold;
`

const HeaderTopInformation = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: #928d8d;
`;
const SignInContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: #928d8d;
`;
const Information = styled(FiCopy)`
  width: 20px;
  height: 20px;
  margin: 5px 10px;
  display: inline-block;
`;
const HamburgerLogo = styled(FiAlignJustify)`
  width: 35px;
  height: 35px;
  margin: 5px 15px;
  display: none;
  cursor: pointer;
  @media (max-width: 976px) {
    display: block;
  }
`;
const Header = styled.div`
  width: 100%;
  min-height: 40px;
  background-color: white;
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
