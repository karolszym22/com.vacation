import { Vacation } from "../Types/Vacations/Vacation";

export const downloadDocument = async (vacationData: Vacation, userId: number) => {
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