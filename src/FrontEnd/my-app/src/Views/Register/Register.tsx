import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 230px;
`;
const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;
`;

const ErrorText = styled.div`
  color: red;
  padding: 20px;
  box-sizing: border-box;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  width: 100%;
`;

const Select = styled.select`
  padding: 10px;
  margin: 5px 0;
  width: 30%;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [employerType, setEmployerType] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters long.");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
      setEmailError("Invalid email address.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/NewUser", {
        username,
        password,
        employerType,
        email,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Registration error:", error);
    }
    
  };

  return (
    <Container>
    <Title>Register</Title>
    <Form onSubmit={handleSubmit}>
      
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <ErrorText>{usernameError}</ErrorText>
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ErrorText>{usernameError}</ErrorText>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <ErrorText>{usernameError}</ErrorText>
      <Select
        value={employerType}
        onChange={(e) => setEmployerType(e.target.value)}
      >
        <option value="">Select user type</option>
        <option value="HR">HR</option>
        <option value="PRACOWNIK">Pracownik</option>
        <option value="PRACODAWCA">Pracodawca</option>
      </Select>
      <Button type="submit">Register</Button>
    </Form>
  </Container>
  );
};

export default Register;
