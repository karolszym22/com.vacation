import React, { useContext } from "react";
import { OverlayVisibleContext } from "../Components/Context/OverlayVisibleContext";
import { FiCopy, FiAlignJustify } from "react-icons/fi";

export const useHeaderTopData = () => {
  const { setOverlayVisible } = useContext(OverlayVisibleContext);
  const { setHamburgerVisible } = useContext(OverlayVisibleContext);

  const toggleMenu = () => {
    setOverlayVisible(true);
    setHamburgerVisible(true);
  };

  return { toggleMenu };
};
