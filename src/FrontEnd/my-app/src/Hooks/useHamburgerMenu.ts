import { useState, useContext, useEffect } from "react";
import { OverlayVisibleContext } from "../Components/Context/OverlayVisibleContext";


export const useHamburgerMenuData = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setOverlayVisible } = useContext(OverlayVisibleContext);
  const { setHamburgerVisible } = useContext(OverlayVisibleContext);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLogged(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOverlayVisible(!isMenuOpen);
    setHamburgerVisible(!isMenuOpen);
  };

  const LogOut = () => {
    localStorage.clear();
  };

  return { isMenuOpen, toggleMenu, isLogged, LogOut };
};


