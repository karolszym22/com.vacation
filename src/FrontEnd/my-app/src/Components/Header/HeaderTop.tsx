import styled from "styled-components";
import { FiCopy, FiAlignJustify } from "react-icons/fi";
import React, { useState, useContext } from "react"
import { OverlayVisibleContext } from "../Context/OverlayVisibleContext";

interface Overlay {
  overlayVisible: boolean;
  setOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderTopInformation = styled.div`
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
  height: 40px;
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
const HeaderTop: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setOverlayVisible } = useContext(OverlayVisibleContext);
  const { setModalVisible } = useContext(OverlayVisibleContext);
  const {setHamburgerVisible} = useContext(OverlayVisibleContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOverlayVisible(isMenuOpen);
    setModalVisible(false);
    setHamburgerVisible(true)
  };

  return (
    <Header>
      <HeaderTopInformation>
        <Information />
        <a>Strona główna</a>
      </HeaderTopInformation>
      <SignIn>
        <a>asda</a>
        <HamburgerLogo onClick={toggleMenu}></HamburgerLogo>
      </SignIn>
    </Header>
  );
};

export default HeaderTop;
