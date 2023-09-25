import React from "react";
import styled from "styled-components";
import { FiHome, FiGitBranch, FiPlusCircle, FiFile } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";

interface HamburgerMenuProps {
  visible: boolean;
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

const MenuLogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
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
  left: 0px;
  background-color: #2e4051;
 display: ${({ visible }) => (visible ? "flex" : "none")};
  flex-direction: column;
  height: 100vh;
`;

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ visible }) => {
  return (
    <SideMenu visible={visible}>
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
