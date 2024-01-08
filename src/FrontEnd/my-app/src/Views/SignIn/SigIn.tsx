import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { user } from "../../Components/Actions/actions";
import background from "../../resources/rm222batch3-mind-10.jpg";
import styled from "styled-components";
import Overlay from "../../Components/Overlay/Overlay";
import { NavLink } from "react-router-dom";



const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [hamburgerVisible, setHamburgerVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:8080/login", {
            email,
            password,
        });
        dispatch(
          user({
            id: response.data.id,
            name: response.data.username,
            email: response.data.email,
            employerType: response.data.employerType,
            employerInitialsColor: response.data.initialsColor
          })
        );

        navigate("/");
        localStorage.setItem("user", JSON.stringify(response.data));
        setLoggedIn(true);

        console.log(
            "Initial State after Login:",
            response.data.id,
            response.data.username,
            response.data.email
        );
    } catch (error) {
        console.error("Login error:", error);
        setOverlayVisible(true);
        setModalVisible(true);
        setHamburgerVisible(false);
        setErrorMessage("Logowanie nie udane. Zły email lub hasło"); 
    }
};

  const closeOverlay = () => {
    setOverlayVisible(false);
  };

  return (
    <Container>
      <Overlay overlayVisible={overlayVisible} modalVisible = {modalVisible} hamburgerVisible={hamburgerVisible}  onClose={closeOverlay} errorMessage={errorMessage} />
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </Form>
      <BottomTitle>Nie masz konta? <JoinLink as={NavLink} to="/register">Dołącz do nas jeszcze dzis!</JoinLink></BottomTitle>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 250px;
 justify-content: center;
 align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  width: 100%;
  @media (max-width: 360px) {
    width: 80%
  }
`;

const Button = styled.button`
  padding: 10px 25px;
  margin: 15px 80px;
  width: 100px;
  background-color: orange;
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #646262;
`;

const BottomTitle = styled.h3`
  color: black;
  cursor: pointer;
`;

const JoinLink = styled.a`
  color: #31a6e5;
  text-decoration: none;
`