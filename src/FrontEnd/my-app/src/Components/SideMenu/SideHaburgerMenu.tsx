import React, { useState, useContext } from "react";
import styled from "styled-components";
import {
  FiHome,
  FiGitBranch,
  FiPlusCircle,
  FiFile,
  FiChevronsLeft,
} from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { OverlayVisibleContext } from "../Context/OverlayVisibleContext";

interface HamburgerMenuProps {
  hamburgerVisible: boolean;
}

const CustomHomeIcon = styled(FiHome)`
  width: 15px;
  height: 15px;
  margin: 5px;
`;

const CustomLoginIcon = styled(FiGitBranch)`
  width: 15px;
  height: 15px;
  margin: 5px;
`;
const CustomRegisterIcon = styled(FiPlusCircle)`
  width: 15px;
  height: 15px;
  margin: 5px;
`;

const CustomNewVacationIcon = styled(FiFile)`
  width: 15px;
  height: 15px;
  margin: 5px;
`;
const HideLogoButtonContainer = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: right;
`;
const HideLogoButton = styled(FiChevronsLeft)`
  width: 35px;
  height: 35px;
  margin: 5px 15px;
  color: white;
  cursor: pointer;
`;
const MenuLogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0px;
  box-sizing: border-box;
  background-color: #293744;
`;

const MenuNavLogo = styled.h1`
  color: white;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #b2dbe6;
  }
`;

const NavLinkName = styled.a`
  font-size: 15px;
  margin: 5px;
  color: white;
  font-weight: bold;
  text-decoration: none;
`;
const MenuNavLink = styled.div`
  color: white;
  padding: 8px 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #293744;
  }
`;

const SideMenu = styled.div<HamburgerMenuProps>`
  position: absolute;
  z-index: 500;
  width: 280px;
  left: ${({ hamburgerVisible }) => (hamburgerVisible ? "0" : "-280px")};
  background-color: #2e4051;
  display: ${({ hamburgerVisible }) => (hamburgerVisible ? "flex" : "none")};
  animation: ${({ hamburgerVisible }) => (hamburgerVisible ? "slideIn 0.5s" : "none")}; 
  flex-direction: column;
  height: 100vh;
  @keyframes slideIn {
  from {
    left: -280px;
  }
  to {
    left: 0;
  }
}
`;

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ hamburgerVisible }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setOverlayVisible } = useContext(OverlayVisibleContext);
  const { setModalVisible } = useContext(OverlayVisibleContext);
  const { setHamburgerVisible } = useContext(OverlayVisibleContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOverlayVisible(isMenuOpen);
    setModalVisible(false);
    setHamburgerVisible(true);
  };

  return (
    <SideMenu hamburgerVisible={hamburgerVisible}>
      <HideLogoButtonContainer>
        <HideLogoButton onClick={toggleMenu}></HideLogoButton>
      </HideLogoButtonContainer>
      <MenuLogoContainer>
        <MenuNavLogo>Urlopy</MenuNavLogo>
      </MenuLogoContainer>

      <MenuNavLink>
        <CustomHomeIcon />
        <NavLinkName as={NavLink} to="/">
          Strona główna
        </NavLinkName>
      </MenuNavLink>
      <MenuNavLink>
        <CustomRegisterIcon />
        <NavLinkName as={NavLink} to="/register">
          Rejestracja nowego pracownika
        </NavLinkName>
      </MenuNavLink>
      <MenuNavLink>
        <CustomLoginIcon />
        <NavLinkName as={NavLink} to="/signIn">
          Zaloguj się!
        </NavLinkName>
      </MenuNavLink>
      <MenuNavLink>
        <CustomNewVacationIcon />
        <NavLinkName as={NavLink} to="/newVacation">
          Dodaj nowy urlop
        </NavLinkName>
      </MenuNavLink>
    </SideMenu>
  );
};

export default HamburgerMenu;
