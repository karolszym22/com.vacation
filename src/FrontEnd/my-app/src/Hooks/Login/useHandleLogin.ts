import { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { user } from "../../Components/Actions/actions";
const useHandleLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      dispatch(
        user({
          id: response.data.id,
          name: response.data.username,
          email: response.data.email,
          employerType: response.data.employerType,
          employerInitialsColor: response.data.initialsColor,
        })
      );

      navigate("/");
      localStorage.setItem("user", JSON.stringify(response.data));
      setLoggedIn(true);

      console.log(
        "Initial State after Login:",
        response.data.id,
        response.data.username,
        response.data.email
      );
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Logowanie nie udane. Zły email lub hasło");
    }
  };

  return {
    email,
    password,
    errorMessage,
    loggedIn,
    setEmail,
    setPassword,
    handleSubmit
  };
};

export default useHandleLogin;
