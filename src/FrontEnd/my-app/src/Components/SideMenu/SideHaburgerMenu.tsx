import React, { useState, useContext, useEffect } from "react";
import {useHamburgerMenuData} from "../../Hooks/useHamburgerMenu"
import styled from "styled-components";
import {
  FiHome,
  FiGitBranch,
  FiPlusCircle,
  FiFile,
  FiChevronsLeft,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { OverlayVisibleContext } from "../Context/OverlayVisibleContext";

interface HamburgerMenuProps {
  hamburgerVisible: boolean;
}

interface SideMenuProps {
  isLogged: boolean
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
  font-size: 14px;
  color: white;
  font-weight: bold;
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
  padding: 8px 5px;
  display: flex;
  align-items: center;
`;
const MenuNavLink = styled.div`
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #293744;
  }
`;
const MenuNavLinkSpecial = styled.div<SideMenuProps>`
  color: white;
  display: ${({ isLogged }) => (isLogged ? "flex" : "none")};
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #293744;
  }
  position: absolute;
  bottom: 0;
`;
const NavLinkNameSpecial = styled.a`
  font-size: 18px;
  color: white;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 16px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SideMenu = styled.div<HamburgerMenuProps>`
  position: absolute;
  z-index: 500;
  max-width: 280px;
  left: ${({ hamburgerVisible }) => (hamburgerVisible ? "0" : "-280px")};
  background-color: #2e4051;
  display: ${({ hamburgerVisible }) => (hamburgerVisible ? "flex" : "none")};
  animation: ${({ hamburgerVisible }) => (hamburgerVisible ? "slideIn 0.5s" : "none")}; 
  flex-direction: column;
  height: 100vh;
  top: 0;
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
  const { isMenuOpen, toggleMenu, isLogged, LogOut } = useHamburgerMenuData();

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
        <CustomHomeIcon />
        <NavLinkName as={NavLink} to="/">
          Kalendarz
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
        <CustomHomeIcon />
        <NavLinkName as={NavLink} to="/messages">
          Wiadomości
        </NavLinkName>
      </MenuNavLink>
      <MenuNavLink>
        <CustomNewVacationIcon />
        <NavLinkName as={NavLink} to="/newVacation">
          Dodaj nowy urlop
        </NavLinkName>
      </MenuNavLink>
      <MenuNavLinkSpecial isLogged={isLogged}>
        <NavLinkNameSpecial onClick={LogOut} as={NavLink} to="/signIn">
          Wyloguj się
        </NavLinkNameSpecial>
      </MenuNavLinkSpecial>
    </SideMenu>
  );
};

export default HamburgerMenu;
