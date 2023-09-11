import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { user } from "../../Components/Actions/actions";
import background from "../../resources/rm222batch3-mind-10.jpg"
import styled from "styled-components";

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
  width: 250px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  width: 100%;
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
const BottomTitle =  styled.h4`
   color: black;
   cursor: pointer;
   &:hover {
    color: #777575; 
    
  }
`


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
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
          employerType: response.data.employerType
        })
      );
      navigate("/");
      console.log("Initial State after Login:", response.data.id, response.data.username, response.data.email);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Container>
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
      <BottomTitle>Nie masz konta? Dołącz do nas jeszcze dzis!</BottomTitle>
    </Container>
  );
};

export default Login;
