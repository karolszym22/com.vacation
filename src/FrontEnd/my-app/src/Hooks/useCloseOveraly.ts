import { useContext } from "react";
import { OverlayVisibleContext } from "../Components/Context/OverlayVisibleContext";

export const useCloseOverlay = () => {
    const { setOverlayVisible, setModalVisible } = useContext(OverlayVisibleContext);
  
    const closeOverlay = () => {
      setOverlayVisible(false);
      setModalVisible(false);
    };
  
    return {
      closeOverlay,
      setOverlayVisible,
      setModalVisible,
    };
  };
  

