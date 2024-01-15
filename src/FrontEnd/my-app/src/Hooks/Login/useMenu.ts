import { useState, useEffect } from "react";

export const useMenuData = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLogged(true);
    }
  }, []);

  const LogOut = () => {
    localStorage.clear();
  };

  return { isLogged, LogOut };
};


