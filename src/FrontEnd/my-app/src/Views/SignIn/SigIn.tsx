import React, { useState} from "react";
import background from "../../resources/rm222batch3-mind-10.jpg";
import styled from "styled-components";
import Overlay from "../../Components/Overlay/Overlay";
import useHandleLogin from "../../Hooks/SignIn/useHandleLogin";
import LoginWrapper from "../../Components/SignIn/SignIn";

const Login: React.FC = () => {
  const { errorMessage} =
    useHandleLogin();

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [hamburgerVisible, setHamburgerVisible] = useState(false);

  const closeOverlay = () => {
    setOverlayVisible(false);
  };

  return (
    <Container>
      <Overlay
        overlayVisible={overlayVisible}
        modalVisible={modalVisible}
        hamburgerVisible={hamburgerVisible}
        onClose={closeOverlay}
        errorMessage={errorMessage}
      />
      <LoginWrapper/>
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
