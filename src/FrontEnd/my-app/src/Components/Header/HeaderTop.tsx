import styled from "styled-components";
import { FiAlignLeft, FiAlignJustify } from "react-icons/fi";
import React, { useState } from "react";
import Overlay from "../Overlay/Overlay";
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
const HamburgerLogo = styled(FiAlignJustify)`
  width: 35px;
  height: 35px;
  margin: 5px 15px;
  display: none;
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
      <Overlay visible={isMenuOpen} onClose={closeMenu} errorMessage="" />
    </Header>
  );
};

export default HeaderTop;
