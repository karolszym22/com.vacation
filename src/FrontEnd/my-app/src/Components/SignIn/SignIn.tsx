import background from "../../resources/rm222batch3-mind-10.jpg";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import useHandleLogin from "../../Hooks/SignIn/useHandleLogin";

const LoginWrapper = () => {
  const { email, password, setEmail, setPassword, handleSubmit } =
    useHandleLogin();

  return (
    <LoginContainer>
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
      <BottomTitle>
        Nie masz konta?{" "}
        <JoinLink as={NavLink} to="/register">
          Dołącz do nas jeszcze dzis!
        </JoinLink>
      </BottomTitle>
    </LoginContainer>
  );
};

export default LoginWrapper;

const LoginContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
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
    width: 80%;
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
`;
