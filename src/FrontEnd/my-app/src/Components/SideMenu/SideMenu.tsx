import React from "react";
import styled from "styled-components";
import { Home, List } from "feather-icons-react";
import {NavLink, useNavigate} from 'react-router-dom';

const CustomHomeIcon = styled(Home)`
  width: 15px;
  height: 15px;
  margin: 5px;
`;
const CustomListIcon = styled(List)`
  width: 15px;
  height: 15px;
  margin: 5px;
`;
const HrTitle = styled.div`
  
  font-size: 15px;
  color: #95c1ec;
  font-weight: bold;
  position: absolute;
  left: 170px;
  top: 60px;

`

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
  font-size: 14px;
  margin: 5px;
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

const SubMenuContainer = styled.div<{ expanded: boolean }>`
  display: ${(props) => (props.expanded ? "flex" : "none")};
  background-color: #293744;
  padding-left: 20px;
  font-size: 10px;
  flex-direction: column;
  color: #d8d3d3;
`;

const SubMenu: React.FC<{ expanded: boolean }> = ({ expanded }) => (
  <SubMenuContainer expanded={expanded}>
    <NavLinkName>Urlopy Wypoczynkowe</NavLinkName>
    <NavLinkName>Urlopy Macierzyńskie</NavLinkName>
    <NavLinkName>Urlopy Tacierzyńskie</NavLinkName>
  </SubMenuContainer>
);

const SideMenu = styled.div`
  width: 280px;
  background-color: #2e4051;
  height: 100vh;
 
  top: 0;
  display: flex;
  flex-direction: column; 
`;

const Menu = () => {
  const [isSubMenuOpen, setSubMenuOpen] = React.useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <SideMenu>
      <MenuLogoContainer>
        <HrTitle>HR</HrTitle>
        <MenuNavLogo>Urlopy</MenuNavLogo>
      </MenuLogoContainer>
      <MenuNavLink>
        <CustomHomeIcon />
        <NavLinkName as={NavLink} to="/Register">Rejestracja nowego pracownika</NavLinkName>
      </MenuNavLink>
      <MenuNavLink>
        <CustomHomeIcon />
        <NavLinkName>Strona główna</NavLinkName>
      </MenuNavLink>
      <MenuNavLink>
        <CustomHomeIcon />
        <NavLinkName as={NavLink} to="/SignIn" >Zaloguj się!</NavLinkName>
      </MenuNavLink>
      <MenuNavLink onClick={toggleSubMenu}>
        <CustomListIcon />
        <NavLinkName>Lista urlopów</NavLinkName>
      </MenuNavLink>
      <SubMenu expanded={isSubMenuOpen} />
      <MenuNavLink>
        <CustomHomeIcon />
        <NavLinkName as={NavLink} to="/NewVacation" >Dodaj nowy urlop</NavLinkName>
      </MenuNavLink>
    </SideMenu>
  );
};

export default Menu;
