
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface OverlayWarningProps {
  show: boolean;
}

const OverlayWarning: React.FC<OverlayWarningProps> = ({ show }) => {



    
    return (
      <OverlayContainter style={{ display: show ? "flex" : "none" }}>
        <WarningTextContainer>Urlop usunięty, trwa przekierowywanie na stronę główną.........</WarningTextContainer>
      </OverlayContainter>
    );
  };

export default OverlayWarning;

const OverlayContainter = styled.div`
  position: absolute;
  background-color: #ffffff;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #686767;
  z-index: 100;
  display: none;
`;

const WarningTextContainer = styled.div`
  font-size: 28px;
  text-align: center;
`;
