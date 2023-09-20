import React, { useEffect } from "react";
import styled from "styled-components";
import Menu from "../../Components/SideMenu/SideMenu";
import Header from "../../Components/Header/Header";
import MainMenu from "../../Components/Main/Main";
import { fetchUserData, AppThunk } from "../../Components/Actions/actions";
import { useDispatch } from "react-redux";

const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function Main() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("userToken");

  const fetchData = async () => {
    try {
      if (token) {
        const userData = await fetchUserData(token)(dispatch);
        console.log("Pobrane dane:", userData);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, token]);

  return (
    <div>
      <MainWrapper>
        <Menu />
        <Wrapper>
          <Header />
          <MainMenu></MainMenu>
        </Wrapper>
      </MainWrapper>
    </div>
  );
}

export default Main;