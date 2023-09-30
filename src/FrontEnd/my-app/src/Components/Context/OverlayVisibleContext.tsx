import React, { useState, ReactNode, createContext } from "react";

export const OverlayVisibleContext = createContext<any | undefined>(undefined);

export interface Vacation {
  id?: number;
  description?: string;
  daysNum?: number;
  done?: boolean;
  taskStatus: string;
  startDate?: string;
  endDate?: string;
  employerName: string;
  personId: number;
}
interface OverlayVisibleProviderProps {
    children: ReactNode;
  }

const OverlayVisibleProvider: React.FC<OverlayVisibleProviderProps> = ({ children }) => {
    const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [hamburgerVisible, setHamburgerVisible] = useState<boolean>(false);

    return (
      <OverlayVisibleContext.Provider
        value={{ overlayVisible, setOverlayVisible, modalVisible, setModalVisible, hamburgerVisible, setHamburgerVisible }}
      >
        {children}
      </OverlayVisibleContext.Provider>
    );
  };

export default OverlayVisibleProvider;
