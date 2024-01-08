export const getColorByTaskStatus = (taskStatus: string) => {
    switch (taskStatus) {
      case "Zrealizowano":
        return "green";
      case "Odrzucono":
        return "red";
      default:
        return "orange";
    }
  };
  