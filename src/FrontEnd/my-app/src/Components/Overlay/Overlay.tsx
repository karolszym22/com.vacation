import React, { useState } from "react";
import styled from "styled-components";

interface OverlayWrapperProps {
    visible: boolean; 
  }



  const OverlayWrapper = styled.div<OverlayWrapperProps>`
  width: 100%;
  height: 100vh;
  display: flex;
  position: absolute;
  z-index: 500;
  background-color: #00000076;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 300px;
  height: 150px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const ModalTitle = styled.div`
  height: 40px;
  width: 100%;
  background-color: #293744;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const ModalDescription = styled.div`
  height: 55px;
  margin: 20px;
  border-bottom: 1px solid black;
  font-size: 12px;
`;

const ModalButton = styled.button`
  width: 20%;
  margin-left: 70%;
  margin-bottom: 10px;
  background-color: #6b7782;
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: 2.5px;
  font-size: 12px;
`;

const TitleValue = styled.a`
  margin: 0px 10px;
`;

interface Vacation {
  id: number;
  description: string;
  days: number;
  done: boolean;
}

function Overlay() {
  const [visible, setVisible] = useState(true); 

  const closeModal = () => {
    setVisible(false); 
  };

  return (
    <OverlayWrapper visible={visible}>
      <Modal>
        <ModalTitle>
          <TitleValue>Błąd</TitleValue>
        </ModalTitle>
        <ModalDescription>
          Data nowego urlopu koliduje z innymi urlopami. Wybierz inną datę.
        </ModalDescription>
        <ModalButton onClick={closeModal}>ok</ModalButton>
      </Modal>
    </OverlayWrapper>
  );
}

export default Overlay;
