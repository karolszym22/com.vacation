import React, { useState, FormEvent } from "react";
import styled from "styled-components";
import background from "../../resources/rm222batch3-mind-10.jpg";
import Overlay from "../../Components/Overlay/Overlay";
import { NavLink } from "react-router-dom";
import useHandleRegister from "../../Hooks/Register/useHandleRegister";

const Register: React.FC = () => {
  const {
    handleSubmit,
    usernameError,
    passwordError,
    confirmPasswordError,
    emailError,
  } = useHandleRegister();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [employerType, setEmployerType] = useState("");
  const [email, setEmail] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [hamburgerVisible,] = useState(false);
  const [errorMessage,] = useState("");

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const closeOverlay = () => {
    setOverlayVisible(false);
    setModalVisible(false)
  };

  return (
    <div>
      <Overlay
        overlayVisible={overlayVisible}
        modalVisible={modalVisible}
        hamburgerVisible={hamburgerVisible}
        onClose={closeOverlay}
        errorMessage={errorMessage}
      />
      <Container>
        <BottomTitle>Zarejestruj się</BottomTitle>
        <Form
          onSubmit={(e: FormEvent) =>
            handleSubmit(e, username, password, confirmPassword, email, employerType)
          }
        >
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
        <h3>
          Masz już konto?{" "}
          <JoinLink as={NavLink} to="/signIn">
            Zaloguj się!
          </JoinLink>
        </h3>
      </Container>
    </div>
  );
};

export default Register;




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
  @media (max-width: 360px) {
    width: 200px;
  }
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
`;
const JoinLink = styled.a`
  color: #31a6e5;
  text-decoration: none;
`;
