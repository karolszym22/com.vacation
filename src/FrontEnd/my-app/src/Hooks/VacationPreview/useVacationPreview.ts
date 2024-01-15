import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Types/Vacations/RootState";
import { OverlayVisibleContext } from "../Components/Context/OverlayVisibleContext";
import { Vacation } from "../Types/Vacations/Vacation";

export const useVacationData = () => {
  const { paramValue } = useParams<{ paramValue: string }>();
  const [vacationData, setVacationData] = useState<Vacation | null>(null);
  const [taskEnums, setTaskEnums] = useState<string[]>([]);
  const userId = useSelector((state: RootState) => state.authorization.user.id);
  const userType = useSelector(
    (state: RootState) => state.authorization.user.employerType
  );
  const { overlayVisible, modalVisible, hamburgerVisible, setOverlayVisible, setModalVisible } = useContext(OverlayVisibleContext);
  const [documentExistence, setDocumentExistence] = useState<string>(""); 

  const fetchVacationData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/vacations/${paramValue}`);
      const data: Vacation = response.data;
      setVacationData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const downloadDocument = async () => {
    try {
      if (vacationData) {
        const downloadUrl = `http://localhost:8080/document/word/download`;
        const requestData = {
          personId: userId,
          vacationId: vacationData.id,
        };
        const response = await fetch(downloadUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
        if (response.ok) {
          console.log("Document downloaded successfully");
        } else {
          console.error("Error downloading document:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  const sendTask = async () => {
    try {
      if (vacationData) {
        const taskData = {
          taskStatus: vacationData.taskStatus,
          userType: userType,
        };
        const response = await axios.post(`http://localhost:8080/tasksToDo`, taskData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          console.log("Task sent successfully:", response.data.taskEnums);
          console.log(response.data);
          setTaskEnums(response.data.taskEnums);
        } else {
          console.error("Failed to send task.");
        }
      }
    } catch (error) {
      console.error("Error sending task:", error);
    }
  };

  const checkDocumentExistence = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/document/word/exist?personId=${userId}&vacationId=${vacationData?.id}`);
      const data: string = response.data;
      setDocumentExistence(data);
    } catch (error) {
      console.error("Error checking document existence:", error);
    }
  };

  return {
    vacationData,
    taskEnums,
    fetchVacationData,
    downloadDocument,
    sendTask,
    checkDocumentExistence,
  };
};
