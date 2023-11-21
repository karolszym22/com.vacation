import { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { user } from "../Components/Actions/actions";

const useHandleLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
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
        })
      );

      navigate("/");
      localStorage.setItem("user", JSON.stringify(response.data));

      console.log(
        "Initial State after Login:",
        response.data.id,
        response.data.username,
        response.data.email
      );

      return { success: true, errorMessage: "" };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        errorMessage: "Logowanie nie udane. Zły email lub hasło",
      };
    }
  };

  return { email, setEmail, password, setPassword, handleSubmit };
};

export default useHandleLogin;
