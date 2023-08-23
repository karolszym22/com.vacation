type AppAction = { type: "EMPLOYEE_AUTHORIZATION"; payload: object }


  export const userLogin = (employerContent: object) => {
    
    return {
      type: "EMPLOYEE_AUTHORIZATION",
      payload: {
        user: {
          ...employerContent,
        },
      },
    };
  };

export {};