import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import background from "../../resources/rm222batch3-mind-10.jpg"
import Overlay from "../../Components/Overlay/Overlay"

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
const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;
`;

const ErrorText = styled.div`
  color: red;
  padding: 10px;
  box-sizing: border-box;
  font-size: 12px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  width: 100%;
`;

const Select = styled.select`
  padding: 5px;
  margin: 5px 0;
  width: 150px;
  border: 1px solid #b1adad;
  border-radius: 5px;
  background-color: #ffffff;
  color: #646262;
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
const BottomTitle = styled.h2`
  color: #646262;
`

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [employerType, setEmployerType] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 

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
    if (password !== confirmPassword) { 
      setConfirmPasswordError("Passwords do not match.");
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
      setOverlayVisible(true);
      setErrorMessage("Użytkownik o takim adresie email istnieje już w bazie danych"); 
    }
    
  };
const closeOverlay = () => {
    setOverlayVisible(false);
  };
  return (
<div>
<Overlay visible={overlayVisible} onClose={closeOverlay} errorMessage={errorMessage} />
    <Container>
    <BottomTitle>Zaarejestruj się</BottomTitle>
    <Form onSubmit={handleSubmit}>
      
      <Input
        type="text"
        placeholder="Nazwa użytkownika"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <ErrorText>{usernameError}</ErrorText>
      <Input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ErrorText>{passwordError}</ErrorText>
      <Input
        type="password"
        placeholder="Potwierdz hasło" 
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <ErrorText>{confirmPasswordError}</ErrorText>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <ErrorText>{emailError}</ErrorText>
      <Select
        value={employerType}
        onChange={(e) => setEmployerType(e.target.value)}
      >
        <option value="">Wybierz rolę</option>
        <option value="HR">HR</option>
        <option value="PRACOWNIK">Pracownik</option>
        <option value="PRACODAWCA">Pracodawca</option>
        <option value="TESTER">Tester</option>
      </Select>
      <Button type="submit">Dołącz</Button>
    </Form>
    <h3>Masz już konto? Zaloguj się!</h3>
  </Container>
  </div>
  );
};

export default Register;
