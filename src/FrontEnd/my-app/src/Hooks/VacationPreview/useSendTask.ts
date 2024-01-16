import { useEffect, useState } from "react";
import axios from "axios";
import { Vacation } from "../../Types/Vacations/Vacation";

const useSendTask = (vacationData: Vacation | null, userType: string) => {
    const [taskEnums, setTaskEnums] = useState([]);
  
    useEffect(() => {
      const sendTask = async () => {
        try {
          if (vacationData) {
            const taskData = {
              taskStatus: vacationData.taskStatus,
              userType: userType,
            };
  
            const response = await axios.post(
              `http://localhost:8080/tasksToDo`,
              taskData,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
  
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
  
      // Check if vacationData is truthy before making the API call
      if (vacationData) {
        sendTask();
      }
    }, [vacationData, userType]);
  
    return taskEnums;
  };

export default useSendTask;
