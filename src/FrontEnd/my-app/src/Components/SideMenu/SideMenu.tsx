import { useMenuData } from "../../Hooks/useMenu"
import styled from "styled-components";
import {
  FiHome,
  FiFile,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";


interface SideMenuProps {
  isLogged: boolean
}




const Menu = () => {
  const { isLogged, LogOut } = useMenuData();

  return (
   
    <SideMenu>
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
        <NavLinkName as={NavLink} to="/calendar">
          Kalendarz
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

export default Menu;




const CustomHomeIcon = styled(FiHome)`
  width: 15px;
  height: 15px;
  margin: 5px;
  display: block;
  padding: 8px 5px;
`;

const CustomNewVacationIcon = styled(FiFile)`
  width: 15px;
  height: 15px;
  margin: 5px;
  display: block;
  padding: 8px 5px;
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
  display: flex;;
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
  display: block;
  width: 100%;
  height: 100%;
  padding: 16px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;



const SideMenu = styled.div`
  width: 280px;
  background-color: #2e4051;
  display: flex;
  position: relative;
  flex-direction: column;
  @media (max-width: 976px) {
    display: none;
  }
`;