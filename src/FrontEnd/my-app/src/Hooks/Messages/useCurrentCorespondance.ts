import { useState } from "react";
import axios from "axios";
import { Message } from "../../Types/Chat/Message";
const useCurrentCoresspondence = () => {
  const [correspondenceId, setCorrespondenceId] = useState<number>();
  const [currentCoresspondence, setCurrentCoresspondence] = useState(false);
  const [corresspondenceMessagesList, setCorresspondenceMessagesList] =
    useState<Message[]>([]);

  const openCorrespondence = async (corespondenceId: number) => {
    setCurrentCoresspondence(true);
    alert(corespondenceId);
    setCorrespondenceId(corespondenceId);
    try {
      const response = await axios.post(
        "http://localhost:8080/coresspondenceMessages",
        {
          corespondenceId: corespondenceId,
        }
      );
      setCorresspondenceMessagesList(response.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return {
    correspondenceId,
    currentCoresspondence,
    corresspondenceMessagesList,
    setCurrentCoresspondence,
    openCorrespondence,
  };
};

export default useCurrentCoresspondence;
