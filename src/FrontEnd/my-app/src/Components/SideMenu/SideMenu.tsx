import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import { NavLink } from "react-router-dom";

const MenuNav = styled.p`
color: #00cdd1;
font-size: 24px;
text-decoration: none; 
cursor: pointer;
&:hover {
  color: #b2dbe6;
}
`;

const SideMenu = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    @media (max-width: 568px) {
    display: none ;
  }
`;
const MenuContainer = styled.div`
    width: 60%;
    height: 50px;
    display: flex ;
    justify-content: space-around;
    align-items: center;
    
`;

const Menu = () =>
{

  
    return(
     <SideMenu >
       <MenuContainer>
           
          <MenuNav as={NavLink} to="/">Interfejs</MenuNav>
          <MenuNav as={NavLink} to="/szukaj">Wikipedia</MenuNav>
          <MenuNav as={NavLink} to="/notes">Notatki</MenuNav>
          <MenuNav as={NavLink} to="/help">Pomoc</MenuNav>
          
      </MenuContainer>
    </SideMenu >)


}
    