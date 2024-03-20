const vacationValidation = (
    startDate: string,
    endDate: string,
    selectedOption: string
  ) => {
    const validateProps = () => {
      if (!startDate || !endDate || !selectedOption) {
        return false;
      } else {
        return true;
      }
    };
  
    return {
      validateProps,
    };
  };
  
  export default vacationValidation;
  