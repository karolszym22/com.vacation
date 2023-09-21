import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Menu from "../../Components/SideMenu/SideMenu";
import Header from "../../Components/Header/Header";
import MainMenu from "../../Components/Main/Main";
import { fetchUserData, AppThunk } from "../../Components/Actions/actions";
import { useDispatch } from "react-redux";
import axios from 'axios';
import Cookies from 'js-cookie';

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
  const [csrfToken, setCsrfToken] = useState("");
  const [tokenFetched, setTokenFetched] = useState(false); 
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      await fetchUserData(csrfToken)(dispatch);
    } catch (error) {
      console.error("Błąd podczas pobierania danych użytkownika:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!tokenFetched) { 
          const response = await axios.get("http://localhost:8080/csrf-token"); 
          const csrfToken = response.data.token;
          setCsrfToken(csrfToken);
          console.log(csrfToken, "Moje ciasteczko");
          Cookies.set('XSRF-TOKEN', csrfToken, { path: '/' });
          setTokenFetched(true);

          if (csrfToken) {
            await fetchUserData(csrfToken)(dispatch);
          }
        }
      } catch (error) {
        console.error("Błąd podczas pobierania tokenu CSRF:", error);
      }
    };

    fetchData();
  }, [dispatch, tokenFetched]); 

  useEffect(() => {
    if (csrfToken) {
      fetchData();
    }
  },);

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
