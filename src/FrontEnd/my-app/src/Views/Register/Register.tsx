import React, { useState } from "react";
import axios from "axios";


const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [employerType, setEmployerType] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
      setError("Invalid email address.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/NewUser", {
        username,
        password,
        employerType,
        email,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ color: "red" }}>{error}</div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          value={employerType}
          onChange={(e) => setEmployerType(e.target.value)}
        >
          <option value="">Select user type</option>
          <option value="HR">HR</option>
          <option value="Pracownik">Pracownik</option>
          <option value="Pracodawca">Pracodawca</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
