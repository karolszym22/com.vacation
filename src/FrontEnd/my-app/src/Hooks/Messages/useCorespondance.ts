import { useState, useEffect } from "react";
import { Correspondences } from "../../Types/Chat/Correspondences";

const useCoresspondence = () => {
  const [allCoresspondences, setAllCoresspondences] = useState<
    Correspondences[]
  >([]);

  useEffect(() => {
    fetch(`http://localhost:8080/correspondences`)
      .then((response) => response.json())
      .then((data) => {
        setAllCoresspondences(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [allCoresspondences]);
  return {
    allCoresspondences,
  };
};

export default useCoresspondence;
