import { useState, useEffect } from "react";
import axios from "axios";
import { Message } from "../../Types/Chat/Message";

const useCurrentCoresspondence = () => {
  const [correspondenceId, setCorrespondenceId] = useState<number>();
  const [currentCoresspondence, setCurrentCoresspondence] = useState(false);
  const [corresspondenceMessagesList, setCorrespondenceMessagesList] =
    useState<Message[]>([]);

  useEffect(() => {
    const fetchCorrespondenceMessages = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/coresspondenceMessages",
          {
            corespondenceId: correspondenceId,
          }
        );
        setCorrespondenceMessagesList(response.data);
      } catch (error) {
        console.error("Fetch correspondence messages error:", error);
      }
    };

    if (currentCoresspondence && correspondenceId) {
      fetchCorrespondenceMessages();
    }
  }, [currentCoresspondence, correspondenceId, corresspondenceMessagesList]);

  const openCorrespondence = (corespondenceId: number) => {
    setCurrentCoresspondence(true);
    setCorrespondenceId(corespondenceId);
    alert(corespondenceId);
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
