import { useState } from 'react';

const useDateValidation = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState('');
 // const [errorMessage, setErrorMessage] = useState('');
 // const [modalVisible, setModalVisible] = useState(false);
 // const [overlayVisible, setOverlayVisible] = useState(false);

  const handleEndDateChange = async (personId: number, startDate: string, newEndDate: string): Promise<boolean> => {
    setEndDate(newEndDate);
    console.log("Sending request with data:", {
      personId,
      startDate,
      endDate,
    });
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(newEndDate);
    console.log(startDate + " = startdata a " + endDate + "enddata");

    try {
      const response = await fetch("http://localhost:8080/dateValidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personId,
          startDate: startDateObj,
          endDate: endDateObj,
        }),
      });

      if (!response.ok) {
        const responseData = await response.text();
        throw new Error(
          `Request failed with status: ${response.status}, Response data: ${responseData}`
        );
      }

      const validationResult = await response.text();
      console.log(validationResult);
      return true;
    } catch (error) {
      console.error("Error validating date:", error);
    //  setErrorMessage(
      ///  "Tworzony przez Ciebie urlop koliduje z innym urlopem dziejącym się w tym samym okresie"
      //);
     // setModalVisible(true);
     // setOverlayVisible(true);
      return false; 
    }
  };

  return {
    startDate,
    endDate,
   // errorMessage,
   // modalVisible,
   // overlayVisible,
    setEndDate,
    setStartDate,
    handleEndDateChange,
  };
};

export default useDateValidation;